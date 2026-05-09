import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CharacterControls } from './characterControl.js';
import { keyPressed } from '../core/input.js';

export let actions = new Map();
export let mixer, characterControls;

export function loadCharacter(scene, characterBody, controls, camera, callback) {
    const loader = new GLTFLoader();

    loader.load('3D_Models/Character/RobotExpressive.glb', function (gltf) {
        const model = gltf.scene;
        model.traverse(function (part) {
            if (part.isMesh)
                part.castShadow = true;
        });

        model.scale.set(0.1, 0.1, 0.1);

        const animations = gltf.animations;
        mixer = new THREE.AnimationMixer(model);
        mixer.timeScale = 0.5;

        animations.forEach((a) => {
            var action = mixer.clipAction(a);
            if (!['Idle', 'Walking', 'Running', 'Jump'].some(name => name === a.name)) {
                action.setLoop(THREE.LoopOnce);
                action.clampWhenFinished = true;
            }

            actions.set(a.name, action);
        });
        actions.get('Idle').play();
        scene.add(model);

        mixer.addEventListener('finished', function (e) {
            var play = characterControls.getEmotion(keyPressed);
            if (e.action === actions.get(play) && characterControls.getIsEmoteAction()) {
                setTimeout(() => {
                    actions.get(play).fadeOut(0.5);
                    actions.get('Idle').reset().fadeIn(0.5).play();
                    characterControls.setIsEmoteAction(false);
                },);
                keyPressed[characterControls.getKey(play)] = false;
                console.log(keyPressed);
            }
        });

        characterControls = new CharacterControls(model, mixer, controls, camera, actions, characterBody, 'Idle');
        if (callback) callback(characterControls);
    });
}