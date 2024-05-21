import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer;
let loader;
let actions, animations, mixer, clock;
let mixerUpdateDelta;
let keyPressed = {};

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

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.update();

	loader = new GLTFLoader();
	loadModel();

	actions = new Map();
	loadCharacter();

	addControlKey();

	clock = new THREE.Clock();
	addLight();
	animate();
}

function loadModel() {
	loader.load('3D_Models/Floor/floor.gltf', function (gltf) {

		var model = gltf.scene;

		for (let i = -3; i < 4; i++) {
			for (let j = -3; j < 4; j++) {

				var cloneModel = model.clone();
				cloneModel.position.set(i * 2, 0, j * 2);

				cloneModel.traverse(function (part) {
					if (part.isMesh)
						part.receiveShadow = true;
				});

				scene.add(cloneModel);
			}
		}

	}, function (xhr) {
		console.log((xhr.loaded / xhr.total * 100) + '% loaded');
	}, function (error) {
		console.log('An error happened');
	});
}

function loadCharacter() {
	loader.load('3D_Models/Character/Soldier.glb', function (gltf) {

		const model = gltf.scene;
		model.traverse(function (part) {
			if (part.isMesh)
				part.castShadow = true;
		});

		animations = gltf.animations;
		mixer = new THREE.AnimationMixer(model);

		animations.filter(a => a.name != 'TPose').forEach((a) => {
			actions.set(a.name, mixer.clipAction(a));
		});

		actions.get('Idle').play();

		scene.add(model);

	}, function (xhr) {
		console.log((xhr.loaded / xhr.total * 100) + '% loaded');
	}, function (error) {
		console.log('An error happened');
	});
}

function addControlKey() {

	document.addEventListener('keydown', (event) => {
		keyPressed[event.key.toLowerCase()] = true;

		console.log(event.key);
	});

	document.addEventListener('keyup', (event) => {
		keyPressed[event.key.toLowerCase()] = false;

		console.log(event.key);
	});

}

function addLight() {
	const light = new THREE.DirectionalLight(0xffffff, 1);
	light.castShadow = true;
	light.position.y = 10;

	scene.add(light);
	scene.add(new THREE.AmbientLight(0xffffff, 0.2));

	const helper = new THREE.CameraHelper(light.shadow.camera);
	scene.add(helper);
}

function animate() {
	requestAnimationFrame(animate);

	mixerUpdateDelta = clock.getDelta();
	mixer.update(mixerUpdateDelta);

	renderer.render(scene, camera);
}