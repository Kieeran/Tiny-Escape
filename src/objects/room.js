import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function loadRoom(scene) {
    const loader = new GLTFLoader();
    loader.load(
        '3D_Models/room/Bedroom.glb', function (gltf) {
            var model = gltf.scene;
            scene.add(model);
            model.traverse(function (object) {
                switch (object.name) {
                    case 'Window_Seat':
                        object.castShadow = true;
                        break;
                    case 'Wall':
                    case 'Top_Wall':
                    case 'Bottom_Wall':
                    case 'Floor':
                    case 'Door':
                    case 'Windows':
                    case 'Light_Switch':
                    case 'Sockets':
                    case 'Ceiling':
                        object.traverse(function (part) {
                            part.receiveShadow = true
                        });
                        break;
                    case 'Door_Frame':
                    case 'Handles':
                    case 'Lights':
                        object.traverse(function (part) {
                            part.castShadow = true
                        });
                        break
                }
            });
        }, undefined, function (error) {
            console.error(error);
        });
}