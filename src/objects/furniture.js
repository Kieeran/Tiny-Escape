import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function loadFurniture(scene) {
    const loader = new GLTFLoader();

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