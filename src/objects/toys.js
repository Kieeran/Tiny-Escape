import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function loadToys(scene, models) {
    const loader = new GLTFLoader();

    //baby_boo
    loader.load(
        '3D_Models/Toys/baby_boo/scene.gltf', function (gltf) {
            var model = gltf.scene;
            scene.add(model);
            model.position.set(0, 3, 0);
            model.rotation.set(0, -Math.PI / 4, -Math.PI / 4);
            model.traverse(function (part) {
                if (part.isMesh) {
                    part.castShadow = true;
                }
            });
            models.push(model);
        }, undefined, function (error) {
            console.error(error);
        });

    //motorbike
    loader.load(
        '3D_Models/Toys/motorcycle/scene.gltf', function (gltf) {
            var model = gltf.scene;
            scene.add(model);
            model.scale.set(0.8, 0.8, 0.8)
            model.position.set(-7, 4.3, 0);
            model.traverse(function (part) {
                if (part.isMesh) {
                    part.castShadow = true;
                }
            });
        }, undefined, function (error) {
            console.error(error);
        });

    //spinner
    loader.load(
        '3D_Models/Toys/spinner/scene.gltf', function (gltf) {
            var model = gltf.scene;
            scene.add(model);
            model.position.set(0, 2, 0);
            model.scale.set(0.05, 0.05, 0.05);
            model.rotation.set(-Math.PI / 2, 0, 0);
            model.traverse(function (part) {
                if (part.isMesh) {
                    part.castShadow = true;
                }
            });
            models.push(model);
        }, undefined, function (error) {
            console.error(error);
        });

    //the_toy_truck
    loader.load(
        '3D_Models/Toys/the_toy_truck/scene.gltf', function (gltf) {
            var model = gltf.scene;
            scene.add(model);
            model.position.set(1, 1, 0);
            model.scale.set(0.1, 0.1, 0.1);
            model.traverse(function (part) {
                if (part.isMesh) {
                    part.castShadow = true;
                }
            });
            models.push(model);
        }, undefined, function (error) {
            console.error(error);
        });

    //the_toy_chair
    loader.load(
        '3D_Models/Toys/toy_chair.glb', function (gltf) {
            var model = gltf.scene;
            scene.add(model);
            model.position.set(-1, 1, 0);
            model.traverse(function (part) {
                if (part.isMesh) {
                    part.castShadow = true;
                }
            });
            models.push(model);
        }, undefined, function (error) {
            console.error(error);
        });

    //toy_cars
    loader.load(
        '3D_Models/Toys/the_toy_car.glb', function (gltf) {
            var model = gltf.scene;
            scene.add(model);
            model.position.set(0, 3, 0);
            model.traverse(function (part) {
                if (part.isMesh) {
                    part.castShadow = true;
                }
            });
            models.push(model);
        }, undefined, function (error) {
            console.error(error);
        });

    //dinosaur
    loader.load(
        '3D_Models/Toys/toy_dinosaur.glb', function (gltf) {
            var model = gltf.scene;
            scene.add(model);
            model.position.set(-7, 8.3, -3);
            model.scale.set(0.3, 0.3, 0.3);
            model.traverse(function (part) {
                if (part.isMesh) {
                    part.castShadow = true;
                }
            });
        }, undefined, function (error) {
            console.error(error);
        });

    //mario statue
    loader.load(
        '3D_Models/Toys/super_mario_toys.glb', function (gltf) {
            var model = gltf.scene;
            scene.add(model);
            model.position.set(-7, 5.65, -3);
            model.scale.set(0.1, 0.1, 0.1);
            model.rotation.set(0, Math.PI / 2, 0);
            model.traverse(function (part) {
                if (part.isMesh) {
                    part.castShadow = true;
                }
            });
        }, undefined, function (error) {
            console.error(error);
        });

    //rubik cube
    loader.load(
        '3D_Models/Toys/rubiks_cube.glb', function (gltf) {
            var model = gltf.scene;
            scene.add(model);
            model.scale.set(0.2, 0.2, 0.2);
            model.traverse(function (part) {
                if (part.isMesh) {
                    part.castShadow = true;
                }
            });
            models.push(model)
        }, undefined, function (error) {
            console.error(error);
        });

    //frame_decor
    loader.load(
        '3D_Models/Toys/frames_decor.glb', function (gltf) {
            var model = gltf.scene;
            scene.add(model);
            model.position.set(-5, 4, 12.5);
            model.scale.set(0.1, 0.1, 0.1);
            model.rotation.set(0, 0, 0);
            model.traverse(function (part) {
                if (part.isMesh) {
                    part.castShadow = true;
                }
            });
        }, undefined, function (error) {
            console.error(error);
        });
}