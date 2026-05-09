import * as THREE from 'three';

export function addLight(scene) {
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