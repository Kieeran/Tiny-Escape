import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer;

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

	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
	cube.position.y = 3;
	cube.castShadow = true;

	const _geometry = new THREE.PlaneGeometry(5, 5);
	const _material = new THREE.MeshStandardMaterial({
		color: 0xffffff,
		side: THREE.DoubleSide
	});
	const plane = new THREE.Mesh(_geometry, _material);
	plane.rotateX(-Math.PI / 2);
	scene.add(plane);
	plane.receiveShadow = true;

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.update();

	camera.position.z = 5;

	addLight();
	animate();
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