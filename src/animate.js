import * as THREE from 'three';
import { physicsWorld, cannonDebugger } from './core/physics.js';
import { mixer, characterControls } from './objects/character.js';
import { keyPressed } from './core/input.js';
import { updateGui } from './gui.js';
import { models, toy_chair, spinner, toy_car, toy_truck, toy_rubikcube, baby_boo } from './core/physicsBodies.js';

export let clock = new THREE.Clock();
export let mixerUpdateDelta;

export function animate(renderer, scene, camera, controls) {
    requestAnimationFrame(() => animate(renderer, scene, camera, controls));

    mixerUpdateDelta = clock.getDelta();

    controls.update();
    //cannonDebugger.update();
    physicsWorld.fixedStep();

    if (models.length >= 6) {
        if (models[0]) {
            models[0].position.copy(spinner.position);
            models[0].quaternion.copy(spinner.quaternion);
        }
        if (models[1]) {
            models[1].position.copy(toy_truck.position);
            models[1].quaternion.copy(toy_truck.quaternion);
        }
        if (models[2]) {
            models[2].position.copy(toy_chair.position);
            models[2].quaternion.copy(toy_chair.quaternion);
        }
        if (models[3]) {
            models[3].position.copy(toy_rubikcube.position);
            models[3].quaternion.copy(toy_rubikcube.quaternion);
        }
        if (models[4]) {
            models[4].position.copy(baby_boo.position);
            models[4].quaternion.copy(baby_boo.quaternion);
        }
        if (models[5]) {
            models[5].position.copy(toy_car.position);
            models[5].quaternion.copy(toy_car.quaternion);
        }
    }

    updateGui();

    if (characterControls) {
        characterControls.update(mixerUpdateDelta, keyPressed);
    }

    if (mixer) {
        mixer.update(mixerUpdateDelta);
    }

    renderer.render(scene, camera);
}