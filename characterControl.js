import * as THREE from 'three';

export class CharacterControls {
    constructor(model, mixer, orbitControl, camera, actions, currentAction) {
        this.model = model;
        this.mixer = mixer;
        this.controls = orbitControl;
        this.camera = camera;
        this.actions = actions;
        this.currentAction = currentAction;

        this.actions.forEach((key, value) => {
            if (key == currentAction) {
                value.play();
            }
        });
    }
}