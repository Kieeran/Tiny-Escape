import * as THREE from 'three';

export class CharacterControls {
    constructor(model, mixer, orbitControl, camera, actions, currentAction) {
        this.model = model;
        this.mixer = mixer;
        this.controls = orbitControl;
        this.camera = camera;
        this.actions = actions;
        this.currentAction = currentAction;

        this.toggleRun = false;

        this.actions.forEach((key, value) => {
            if (key == currentAction) {
                value.play();
            }
        });
    }

    switchRunToggle() {
        this.toggleRun = !this.toggleRun;
        //console.log(this.toggleRun);
    }

    _update(delta, keyPressed) {
        const directionPressed = ['a', 'd', 'w', 's'].some(key => keyPressed[key]);
        var play = '';

        if (directionPressed) {
            play = 'Walk';
            if (this.toggleRun) play = 'Run';
        }
        else play = 'Idle'
        //console.log(play);

        // Simple FSM
        if (this.currentAction != play) {
            const toPlay = this.actions.get(play);
            const current = this.actions.get(this.currentAction);

            current.fadeOut(this.fadeDuration);
            toPlay.reset().fadeIn(this.fadeDuration).play();

            this.currentAction = play;
        }

        this.mixer.update(delta);
    }
}