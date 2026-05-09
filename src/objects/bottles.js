import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function loadBottles(scene) {
    const loader = new GLTFLoader();

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