import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer;
let loader;

init();

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);

	renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	renderer.shadowMap.enabled = true;

	loader = new GLTFLoader();
	loadModel();
	loadCharacter();

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.update();

	camera.position.z = 5;

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

		scene.add(gltf.scene);

	}, function (xhr) {
		console.log((xhr.loaded / xhr.total * 100) + '% loaded');
	}, function (error) {
		console.log('An error happened');
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
	renderer.render(scene, camera);
}