import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function createCamera(renderer) {
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera.position.set(0, 0.2, 1);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    return { camera, controls };
}