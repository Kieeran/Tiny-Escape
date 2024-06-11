import { GUI } from 'dat.gui';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CharacterControls } from './characterControl';
import { Furniture_body } from './Furniture_body.js';
import { sceneBoundingBox } from './sceneBoundingBox.js';

let scene, camera, renderer, controls;
let loader;
let actions, animations, mixer, clock;
let mixerUpdateDelta;
let keyPressed = {};
let characterControls;
let physicsWorld, cannonDebugger;
let characterBody;

let models = [];
let toy_chair, spinner, toy_car;

let gui;

let body;
let shape;

let scaleBody = ({
	x: 0.5,
	y: 0.5,
	z: 0.5
})

let rotateBody = ({
	x: 0,
	y: 0,
	z: 0
})

init();

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);

	camera.position.set(0, 0.2, 1);

	renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	renderer.shadowMap.enabled = true;

	controls = new OrbitControls(camera, renderer.domElement);
	controls.update();

	initPhysics();
	initGui();

	loader = new GLTFLoader();
	loadRoom();
	loadFurniture();
	loadBottles();
	loadToys();

	addObjectBody();

	actions = new Map();
	loadCharacter();

	addControlKey();
	datGui();

	clock = new THREE.Clock();
	addLight();
	animate();
}

function initPhysics() {
	physicsWorld = new CANNON.World({
		gravity: new CANNON.Vec3(0, -9.82, 0), // m/s²
	})
	cannonDebugger = new CannonDebugger(scene, physicsWorld, {});
}

function initGui() {
	gui = new GUI();
}

function datGui() {
	gui.add(body.position, 'x', -20, 20).name('Position x')
	gui.add(body.position, 'y', -20, 20).name('Position y')
	gui.add(body.position, 'z', -20, 20).name('Position z')

	gui.add(scaleBody, 'x', -20, 20).name('Scale x')
	gui.add(scaleBody, 'y', -20, 20).name('Scale y')
	gui.add(scaleBody, 'z', -20, 20).name('Scale z')

	gui.add(rotateBody, 'x', 0, 360).name('Rotate x')
	gui.add(rotateBody, 'y', 0, 360).name('Rotate y')
	gui.add(rotateBody, 'z', 0, 360).name('Rotate z')
}

function updateGui() {
	body.quaternion.setFromEuler(
		angleToRad(rotateBody.x),
		angleToRad(rotateBody.y),
		angleToRad(rotateBody.z),
	)
	body.removeShape(shape);
	shape = new CANNON.Box(new CANNON.Vec3(
		scaleBody.x,
		scaleBody.y,
		scaleBody.z
	))
	body.addShape(shape);
}

function angleToRad(angle) {
	return angle * Math.PI / 180;
}

// function loadCharacter() {
// 	loader.load('3D_Models/Character/Soldier.glb', function (gltf) {

// 		const model = gltf.scene;
// 		model.traverse(function (part) {
// 			if (part.isMesh)
// 				part.castShadow = true;
// 		});

// 		animations = gltf.animations;
// 		mixer = new THREE.AnimationMixer(model);

// 		animations.filter(a => a.name != 'TPose').forEach((a) => {
// 			actions.set(a.name, mixer.clipAction(a));
// 		});

// 		actions.get('Idle').play();

// 		scene.add(model);

// 		characterControls = new CharacterControls(model, mixer, controls, camera, actions, 'Idle');

// 	});
// }

function loadCharacter() {
	loader.load('3D_Models/Character/RobotExpressive.glb', function (gltf) {

		const model = gltf.scene;
		model.traverse(function (part) {
			if (part.isMesh)
				part.castShadow = true;
		});

		model.scale.set(0.1, 0.1, 0.1);

		animations = gltf.animations;
		mixer = new THREE.AnimationMixer(model);

		animations.forEach((a) => {
			var action = mixer.clipAction(a);
			if (!['Idle', 'Walking', 'Running', 'Jump'].some(name => name === a.name)) {
				action.setLoop(THREE.LoopOnce);
				action.clampWhenFinished = true;
			}

			actions.set(a.name, action);
		});
		actions.get('Idle').play();
		scene.add(model);

		mixer.addEventListener('finished', function (e) {
			var play = characterControls.getEmotion(keyPressed);
			if (e.action === actions.get(play) && characterControls.getIsEmoteAction()) {
				setTimeout(() => {
					actions.get(play).fadeOut(0.5);  // Fade out action2 trong 0.5 giây
					actions.get('Idle').reset().fadeIn(0.5).play();  // Reset, fade in và play action1
					characterControls.setIsEmoteAction(false);
				},);
				keyPressed[characterControls.getKey(play)] = false;
				console.log(keyPressed);
			}
		});

		characterControls = new CharacterControls(model, mixer, controls, camera, actions, characterBody, 'Idle');
	});
}

function loadRoom() {
	loader.load(
		'3D_Models/room/Bedroom.glb', function (gltf) {
			var model = gltf.scene;
			scene.add(model);
			model.traverse(function (object) {
				switch (object.name) {
					case 'Window_Seat':
						object.castShadow = true;
						break;
					case 'Wall':
					case 'Top_Wall':
					case 'Bottom_Wall':
					case 'Floor':
					case 'Door':
					case 'Windows':
					case 'Light_Switch':
					case 'Sockets':
					case 'Ceiling':
						object.traverse(function (part) {
							part.receiveShadow = true
						});
						break;
					case 'Door_Frame':
					case 'Handles':
					case 'Lights':
						object.traverse(function (part) {
							part.castShadow = true
						});
						break
				}
			});
		}, undefined, function (error) {
			console.error(error);
		});
}

function loadFurniture() {
	//bed
	loader.load(
		'3D_Models/Furniture/bed/scene.gltf', function (gltf) {
			var model = gltf.scene;
			scene.add(model);
			model.position.set(4.5, -0.1, -8.5);
			model.scale.set(0.3, 0.3, 0.3);
			model.traverse(function (part) {
				if (part.isMesh) {
					// part.receiveShadow = true;
					part.castShadow = true;
				}
			});
		}, undefined, function (error) {
			console.error(error);
		});

	//desk
	loader.load(
		'3D_Models/Furniture/desk/scene.gltf', function (gltf) {
			var model = gltf.scene;
			scene.add(model);
			model.position.set(-21.75, -2, 38);
			model.rotation.set(0, Math.PI / 2, 0);
			model.traverse(function (part) {
				if (part.isMesh) {
					// part.receiveShadow = true;
					part.castShadow = true;
				}
			});
		}, undefined, function (error) {
			console.error(error);
		});

	//bookshelf
	loader.load(
		'3D_Models/Furniture/bookshelf.glb', function (gltf) {
			var model = gltf.scene;
			scene.add(model);
			model.scale.set(2, 2, 3);
			model.position.set(-7, 4, 0);
			model.traverse(function (part) {
				if (part.isMesh) {
					// part.receiveShadow = true;
					part.castShadow = true;
				}
			});
		}, undefined, function (error) {
			console.error(error);
		});
	//books
	loader.load(
		'3D_Models/Furniture/books.glb', function (gltf) {
			var model = gltf.scene;
			scene.add(model);
			model.scale.set(0.7, 0.5, 1);
			model.position.set(-7, 5.65, 2.25);
			model.traverse(function (part) {
				if (part.isMesh) {
					part.castShadow = true;
				}
			});
		}, undefined, function (error) {
			console.error(error);
		});

	//chair
	loader.load(
		'3D_Models/Furniture/kolton_rocking_chair_marl_grey.glb', function (gltf) {
			var model = gltf.scene;
			scene.add(model);

			model.position.set(-6, 0, 10);
			model.rotation.set(0, 3 * Math.PI / 4, 0);
			model.traverse(function (part) {
				if (part.isMesh) {
					// part.receiveShadow = true;
					part.castShadow = true;
				}
			});

			var cloneModel = model.clone();
			scene.add(cloneModel);

			cloneModel.position.set(-2, 0, 10);
			cloneModel.rotation.set(0, Math.PI, 0);

		}, undefined, function (error) {
			console.error(error);
		});

	//table
	loader.load(
		'3D_Models/Furniture/tea_table.glb', function (gltf) {
			var model = gltf.scene;
			scene.add(model);
			model.position.set(-4, 0, 7);
			model.scale.set(0.12, 0.1, 0.12);
			model.traverse(function (part) {
				if (part.isMesh) {
					// part.receiveShadow = true;
					part.castShadow = true;
				}
			});
		}, undefined, function (error) {
			console.error(error);
		});
}

function loadToys() {
	//baby_boo
	loader.load(
		'3D_Models/Toys/baby_boo/scene.gltf', function (gltf) {
			var model = gltf.scene;
			scene.add(model);
			model.position.set(3.5, 2, -8.5);
			model.rotation.set(0, -Math.PI / 4, -Math.PI / 4);
			model.traverse(function (part) {
				if (part.isMesh) {
					part.castShadow = true;
				}
			});
		}, undefined, function (error) {
			console.error(error);
		});
	//motorbike
	loader.load(
		'3D_Models/Toys/motorcycle/scene.gltf', function (gltf) {
			var model = gltf.scene;
			scene.add(model);
			model.scale.set(0.8, 0.8, 0.8)
			model.position.set(-7, 4.3, 0);
			model.traverse(function (part) {
				if (part.isMesh) {
					part.castShadow = true;
				}
			});
		}, undefined, function (error) {
			console.error(error);
		});

	//spinner
	loader.load(
		'3D_Models/Toys/spinner/scene.gltf', function (gltf) {
			var model = gltf.scene;
			scene.add(model);
			model.position.set(0, 2, 0);
			model.scale.set(0.05, 0.05, 0.05);
			model.rotation.set(-Math.PI / 2, 0, 0);
			model.traverse(function (part) {
				if (part.isMesh) {
					part.castShadow = true;
				}
			});
			models.push(model);
		}, undefined, function (error) {
			console.error(error);
		});

	//the_toy_truck
	loader.load(
		'3D_Models/Toys/the_toy_truck/scene.gltf', function (gltf) {
			var model = gltf.scene;
			scene.add(model);
			model.position.set(1, 1, 0);
			model.scale.set(0.1, 0.1, 0.1);
			model.traverse(function (part) {
				if (part.isMesh) {
					part.castShadow = true;
				}
			});
		}, undefined, function (error) {
			console.error(error);
		});
	//the_toy_chair
	loader.load(
		'3D_Models/Toys/toy_chair.glb', function (gltf) {
			var model = gltf.scene;
			scene.add(model);
			model.position.set(-1, 1, 0);
			model.traverse(function (part) {
				if (part.isMesh) {
					part.castShadow = true;
				}
			});
			models.push(model);
		}, undefined, function (error) {
			console.error(error);
		});

	//toy_cars
	loader.load(
		'3D_Models/Toys/the_toy_car.glb', function (gltf) {
			var model = gltf.scene;
			scene.add(model);
			model.position.set(0, 3, 0);
			model.traverse(function (part) {
				if (part.isMesh) {
					part.castShadow = true;
				}
			});
			models.push(model);
		}, undefined, function (error) {
			console.error(error);
		});

	//dinosaur
	loader.load(
		'3D_Models/Toys/toy_dinosaur.glb', function (gltf) {
			var model = gltf.scene;
			scene.add(model);
			model.position.set(-7, 8.3, -3);
			model.scale.set(0.3, 0.3, 0.3);
			model.traverse(function (part) {
				if (part.isMesh) {
					part.castShadow = true;
				}
			});
		}, undefined, function (error) {
			console.error(error);
		});

	//mario statue
	loader.load(
		'3D_Models/Toys/super_mario_toys.glb', function (gltf) {
			var model = gltf.scene;
			scene.add(model);
			model.position.set(-7, 5.65, -3);
			model.scale.set(0.1, 0.1, 0.1);
			model.rotation.set(0, Math.PI / 2, 0);
			model.traverse(function (part) {
				if (part.isMesh) {
					part.castShadow = true;
				}
			});
		}, undefined, function (error) {
			console.error(error);
		});

	//frame_decor
	loader.load(
		'3D_Models/Toys/frames_decor.glb', function (gltf) {
			var model = gltf.scene;
			scene.add(model);
			model.position.set(-5, 4, 12.5);
			model.scale.set(0.1, 0.1, 0.1);
			model.rotation.set(0, 0, 0);
			model.traverse(function (part) {
				if (part.isMesh) {
					part.castShadow = true;
				}
			});
		}, undefined, function (error) {
			console.error(error);
		});
}

function loadBottles() {
	//magic bottles
	loader.load(
		'3D_Models/Furniture/bottles/bottle_magic/scene.gltf', function (gltf) {
			var model = gltf.scene;
			scene.add(model);
			model.position.set(-7, 3, -6);
			model.scale.set(0.3, 0.3, 0.3);
			model.traverse(function (part) {
				if (part.isMesh) {
					// part.receiveShadow = true;
					part.castShadow = true;
				}
			});
		}, undefined, function (error) {
			console.error(error);
		});

	//black bottles
	loader.load(
		'3D_Models/Furniture/bottles/small_bottle.glb', function (gltf) {
			var model = gltf.scene;
			scene.add(model);
			model.position.set(-4, 1.65, 6.75);
			model.scale.set(0.4, 0.4, 0.4);
			model.traverse(function (part) {
				if (part.isMesh) {
					// part.receiveShadow = true;
					part.castShadow = true;
				}
			});
		}, undefined, function (error) {
			console.error(error);
		});

	//potions_bottle
	loader.load(
		'3D_Models/Furniture/bottles/potions_bottle.glb', function (gltf) {
			var model = gltf.scene;
			scene.add(model);
			model.position.set(6.5, 1.7, -9);
			model.scale.set(0.02, 0.02, 0.02);
			model.rotation.set(3 * Math.PI / 4, 0, Math.PI / 2);
			model.traverse(function (part) {
				if (part.isMesh) {
					// part.receiveShadow = true;
					part.castShadow = true;
				}
			});
		}, undefined, function (error) {
			console.error(error);
		});
}

function addControlKey() {

	document.addEventListener('keydown', (event) => {

		if (['1', '2', '3', '4', '5', '6'].some(key => event.key === key) &&
			!['a', 'd', 'w', 's'].some(key => keyPressed[key])) {
			if (!characterControls.getIsEmoteAction()) {
				keyPressed[event.key] = true;
				characterControls.setIsEmoteAction(true);
			}
		}
		else if (!['1', '2', '3', '4', '5', '6'].some(key => keyPressed[key]) &&
			!['1', '2', '3', '4', '5', '6'].some(key => event.key === key)) {
			if (event.shiftKey && characterControls) {
				characterControls.switchRunToggle();
			}
			else {
				keyPressed[event.key.toLowerCase()] = true;
			}
		}

		if (keyPressed['q']) {
			console.log(characterBody.position);
		}

		if (keyPressed[' '] && Math.abs(characterBody.velocity.y) < 0.1)
			characterBody.velocity.y = 7

		//console.log(keyPressed);
	});

	document.addEventListener('keyup', (event) => {

		if (!['1', '2', '3', '4', '5', '6'].some(key => event.key === key)) {
			keyPressed[event.key.toLowerCase()] = false;
		}

		if (!keyPressed['w'] && !keyPressed['s']) characterBody.velocity.z = 0
		if (!keyPressed['a'] && !keyPressed['d']) characterBody.velocity.x = 0
		//console.log(keyPressed);
	});

}

function addObjectBody() {
	var groundBody = new CANNON.Body({
		type: CANNON.Body.STATIC,
		shape: new CANNON.Plane(),
	});
	groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
	physicsWorld.addBody(groundBody);

	characterBody = new CANNON.Body({
		mass: 100,
		shape: new CANNON.Cylinder(0.15, 0.15, 0.44, 20),
		angularDamping: 0.95,
	});
	characterBody.position.set(0, 0.2, 0);
	physicsWorld.addBody(characterBody);

	const material = new CANNON.Material("defaultMaterial");
	material.friction = 0;
	material.restitution = 0;

	groundBody.material = material;
	characterBody.material = material;

	var objectsBoundingBox = sceneBoundingBox(physicsWorld);
	objectsBoundingBox.forEach(function (item, index) {
		physicsWorld.addBody(item);
	})

	var objectsFurniture_body = Furniture_body(physicsWorld);
	objectsFurniture_body.forEach(function (item, index) {
		physicsWorld.addBody(item);
	})

	shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
	body = new CANNON.Body({
		type: CANNON.Body.STATIC,
		shape: shape,
	});
	body.position.set(0, 1, 0);
	physicsWorld.addBody(body);

	toy_chair = new CANNON.Body({
		mass: 5,
		shape: new CANNON.Box(new CANNON.Vec3(0.25, 0.025, 0.25)),
	});
	toy_chair.quaternion.setFromEuler(0, 7 * Math.PI / 180, 0)
	toy_chair.addShape(
		new CANNON.Box(new CANNON.Vec3(0.05, 0.2, 0.05)),
		new CANNON.Vec3(0.175, -0.23, 0.179),
	)

	toy_chair.addShape(
		new CANNON.Box(new CANNON.Vec3(0.05, 0.2, 0.05)),
		new CANNON.Vec3(-0.175, -0.23, 0.179),
	)

	toy_chair.addShape(
		new CANNON.Box(new CANNON.Vec3(0.05, 0.2, 0.05)),
		new CANNON.Vec3(0.175, -0.23, -0.179),
	)

	toy_chair.addShape(
		new CANNON.Box(new CANNON.Vec3(0.05, 0.2, 0.05)),
		new CANNON.Vec3(-0.175, -0.23, -0.179),
	)

	toy_chair.addShape(
		new CANNON.Box(new CANNON.Vec3(0.25, 0.25, 0.01)),
		new CANNON.Vec3(0, 0.4, -0.2),
		new CANNON.Quaternion(0, 0, 0)
	)

	physicsWorld.addBody(toy_chair);
	toy_chair.position.set(2, 5, 0);

	spinner = new CANNON.Body({
		mass: 5,
		shape: new CANNON.Cylinder(0.06, 0.06, 0.06, 14)
	})

	spinner.addShape(
		new CANNON.Cylinder(0.06, 0.06, 0.02, 14),
		new CANNON.Vec3(0, 0, 0.15),
	)

	spinner.addShape(
		new CANNON.Cylinder(0.06, 0.06, 0.02, 14),
		new CANNON.Vec3(0.13, 0, -0.07),
	)

	spinner.addShape(
		new CANNON.Cylinder(0.06, 0.06, 0.02, 14),
		new CANNON.Vec3(-0.13, 0, -0.07),
	)

	spinner.position.set(-2, 3, 0)
	physicsWorld.addBody(spinner);

	toy_car = new CANNON.Body({
		mass: 5,
		shape: new CANNON.Box(new CANNON.Vec3(0.3, 0.1, 0.95))
	})

	toy_car.addShape(
		new CANNON.Sphere(0.095),
		new CANNON.Vec3(0.3, -0.12, 0.64),
	)

	toy_car.addShape(
		new CANNON.Sphere(0.095),
		new CANNON.Vec3(-0.3, -0.12, 0.64),
	)

	toy_car.addShape(
		new CANNON.Sphere(0.095),
		new CANNON.Vec3(0.3, -0.12, -0.64),
	)

	toy_car.addShape(
		new CANNON.Sphere(0.095),
		new CANNON.Vec3(-0.3, -0.12, -0.64),
	)

	toy_car.addShape(
		new CANNON.Box(new CANNON.Vec3(0.31, 0.13, 0.22)),
		new CANNON.Vec3(0, 0.22, -0.06),
	)

	toy_car.position.set(1, 3, 2);
	physicsWorld.addBody(toy_car);
}

function addLight() {
	// const light = new THREE.DirectionalLight(0xffffff, 1);
	// light.castShadow = true;
	// light.position.y = 10;
	// scene.add(light);

	// light.shadow.camera.top = 7;
	// light.shadow.camera.left = -7;
	// light.shadow.camera.right = 7;
	// light.shadow.camera.bottom = -7;

	// light.shadow.mapSize.width = 2048;
	// light.shadow.mapSize.height = 2048;
	// light.shadow.camera.far = 11;

	// const helper = new THREE.CameraHelper(light.shadow.camera);
	// scene.add(helper);

	const pointLight = new THREE.PointLight(0xFFFFFF);
	pointLight.position.set(0, 10, -6);
	scene.add(pointLight);
	pointLight.power = 1000
	pointLight.shadow.mapSize.width = 1024;
	pointLight.shadow.mapSize.height = 1024;
	pointLight.castShadow = true

	const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
	scene.add(pointLightHelper);

	scene.add(new THREE.AmbientLight(0xffffff, 0.09));
}

function animate() {
	requestAnimationFrame(animate);

	mixerUpdateDelta = clock.getDelta();

	controls.update();
	cannonDebugger.update();
	physicsWorld.fixedStep();

	models[0].position.copy(spinner.position);
	models[0].quaternion.copy(spinner.quaternion);

	models[1].position.copy(toy_chair.position);
	models[1].quaternion.copy(toy_chair.quaternion);

	models[2].position.copy(toy_car.position);
	models[2].quaternion.copy(toy_car.quaternion);

	updateGui();

	if (characterControls) {
		characterControls.update(mixerUpdateDelta, keyPressed);
	}

	renderer.render(scene, camera);
}