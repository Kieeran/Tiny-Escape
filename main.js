import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const _geometry = new THREE.PlaneGeometry(5, 5);
const _material = new THREE.MeshBasicMaterial({
	color: 0xffffff,
	side: THREE.DoubleSide
});
const plane = new THREE.Mesh(_geometry, _material);
plane.rotateX(-Math.PI / 2);
scene.add(plane);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

camera.position.z = 5;

function animate() {
	requestAnimationFrame(animate);

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render(scene, camera);
}

animate();