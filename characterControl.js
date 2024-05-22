import * as THREE from 'three';

export class CharacterControls {

    rotateAngle = new THREE.Vector3(0, 1, 0);
    rotateQuaternion = new THREE.Quaternion();

    fadeDuration = 0.2;

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

    update(delta, keyPressed) {
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

        if (this.currentAction == 'Run' || this.currentAction == 'Walk') {
            var angleYCameraDirection = Math.atan2(
                this.camera.position.x - this.model.position.x,
                this.camera.position.z - this.model.position.z
            );

            var directionOffset = this.directionOffset(keyPressed);

            this.rotateQuaternion.setFromAxisAngle(this.rotateAngle, angleYCameraDirection + directionOffset);
            this.model.quaternion.rotateTowards(this.rotateQuaternion, 0.2);
        }

        this.mixer.update(delta);
    }

    directionOffset(keyPressed) {
        var directionOffset = 0;

        if (keyPressed['w']) {
            if (keyPressed['a']) {
                directionOffset = Math.PI / 4;
            }
            else if (keyPressed['d']) {
                directionOffset = -Math.PI / 4;
            }
        }
        else if (keyPressed['s']) {
            if (keyPressed['a']) {
                directionOffset = 3 * Math.PI / 4;
            }
            else if (keyPressed['d']) {
                directionOffset = -3 * Math.PI / 4;
            }
            else
                directionOffset = Math.PI
        } else if (keyPressed['a']) {
            directionOffset = Math.PI / 2;
        } else if (keyPressed['d']) {
            directionOffset = -Math.PI / 2;
        }

        return directionOffset;
    }
}