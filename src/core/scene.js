import * as THREE from 'three';

export function createScene() {
    const scene = new THREE.Scene();

    // Load cube map for background
    scene.background = new THREE.CubeTextureLoader()
        .setPath('textures/cubeMaps/')
        .load([
            'px.png',
            'nx.png',
            'py.png',
            'ny.png',
            'pz.png',
            'nz.png'
        ]);

    return scene;
}