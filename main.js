import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CharacterControls } from './characterControl';

let scene, camera, renderer, controls;
let loader;
let actions, animations, mixer, clock;
let mixerUpdateDelta;
let keyPressed = {};
let characterControls;

init();

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);

	camera.position.set(0, 2, 5);

	renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	renderer.shadowMap.enabled = true;

	controls = new OrbitControls(camera, renderer.domElement);
	controls.update();

	loader = new GLTFLoader();
	loadRoom();
	loadFurniture();
	loadBottles();

	actions = new Map();
	loadCharacter();

	addControlKey();

	clock = new THREE.Clock();
	addLight();
	animate();
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

		model.scale.set(0.55, 0.55, 0.55);

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

		characterControls = new CharacterControls(model, mixer, controls, camera, actions, 'Idle');

	});
}

function loadRoom() {
	loader.load(
		'3D_Models/room/Bedroom.glb', function (gltf) {
			var model = gltf.scene;
			scene.add(model);
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
		}, undefined, function (error) {
			console.error(error);
		});
}

function addControlKey() {

	document.addEventListener('keydown', (event) => {

		if (['1', '2', '3', '4', '5', '6'].some(key => event.key === key) &&
			!['a', 'd', 'w', 's', ' '].some(key => keyPressed[key])) {
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

		console.log(keyPressed);
	});

	document.addEventListener('keyup', (event) => {

		if (!['1', '2', '3', '4', '5', '6'].some(key => event.key === key)) {
			keyPressed[event.key.toLowerCase()] = false;
		}
		console.log(keyPressed);
	});

}

function addLight() {
	const light = new THREE.DirectionalLight(0xffffff, 1);
	light.castShadow = true;
	light.position.y = 10;
	scene.add(light);

	light.shadow.camera.top = 7;
	light.shadow.camera.left = -7;
	light.shadow.camera.right = 7;
	light.shadow.camera.bottom = -7;

	light.shadow.mapSize.width = 2048;
	light.shadow.mapSize.height = 2048;
	light.shadow.camera.far = 11;

	const helper = new THREE.CameraHelper(light.shadow.camera);
	scene.add(helper);

	scene.add(new THREE.AmbientLight(0xffffff, 0.2));
}

function animate() {
	requestAnimationFrame(animate);

	mixerUpdateDelta = clock.getDelta();

	controls.update();

	if (characterControls) {
		characterControls.update(mixerUpdateDelta, keyPressed);
	}

	renderer.render(scene, camera);
}