import * as THREE from 'three';

export class CharacterControls {

    moveDirection = new THREE.Vector3();
    rotateAngle = new THREE.Vector3(0, 1, 0);
    rotateQuaternion = new THREE.Quaternion();
    cameraTarget = new THREE.Vector3();

    fadeDuration = 0.2;
    runVelocity = 6;
    walkVelocity = 3;

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

    getEmotion(keyPressed) {
        var play = ''

        if (keyPressed['1'])
            play = 'Dance';
        else if (keyPressed['2'])
            play = 'Death';
        else if (keyPressed['3'])
            play = 'No';
        else if (keyPressed['4'])
            play = 'Yes';
        else if (keyPressed['5'])
            play = 'Wave';
        else if (keyPressed['6'])
            play = 'ThumbsUp';
        else if (keyPressed[' '])
            play = 'Jump';

        return play;
    }

    update(delta, keyPressed) {
        const directionPressed = ['a', 'd', 'w', 's'].some(key => keyPressed[key]);
        var play = '';

        if (directionPressed) {
            play = 'Walking';
            if (this.toggleRun) play = 'Running';
        }

        else if (['1', '2', '3', '4', '5', '6', ' '].some(key => keyPressed[key]))
            play = this.getEmotion(keyPressed);

        else play = 'Idle';
        //console.log(play);

        // Simple FSM
        if (this.currentAction != play) {
            const toPlay = this.actions.get(play);
            const current = this.actions.get(this.currentAction);

            current.fadeOut(this.fadeDuration);
            toPlay.reset().fadeIn(this.fadeDuration).play();

            this.currentAction = play;
        }

        if (this.currentAction == 'Running' || this.currentAction == 'Walking') {
            var angleYCameraDirection = Math.atan2(
                this.camera.position.x - this.model.position.x,
                this.camera.position.z - this.model.position.z
            );

            var directionOffset = this.directionOffset(keyPressed);

            this.rotateQuaternion.setFromAxisAngle(this.rotateAngle, angleYCameraDirection + directionOffset);
            this.model.quaternion.rotateTowards(this.rotateQuaternion, 0.15);

            this.camera.getWorldDirection(this.moveDirection);
            this.moveDirection.y = 0;
            this.moveDirection.normalize();
            this.moveDirection.applyAxisAngle(this.rotateAngle, directionOffset);

            const velocity = this.currentAction == 'Running' ? this.runVelocity : this.walkVelocity;

            const moveX = -this.moveDirection.x * velocity * delta;
            const moveZ = -this.moveDirection.z * velocity * delta;

            this.model.position.x += moveX;
            this.model.position.z += moveZ;

            this.updateCameraTarget(moveX, moveZ);
        }

        this.mixer.update(delta);
    }

    updateCameraTarget(moveX, moveZ) {
        this.camera.position.x += moveX;
        this.camera.position.z += moveZ;

        this.cameraTarget.x = this.model.position.x;
        this.cameraTarget.y = this.model.position.y;
        this.cameraTarget.z = this.model.position.z;
        this.controls.target = this.cameraTarget;
    }

    directionOffset(keyPressed) {
        var directionOffset = Math.PI;

        if (keyPressed['w']) {
            if (keyPressed['a']) {
                directionOffset = -3 * Math.PI / 4;
            }
            else if (keyPressed['d']) {
                directionOffset = 3 * Math.PI / 4;
            }
        }
        else if (keyPressed['s']) {
            if (keyPressed['a']) {
                directionOffset = -Math.PI / 4;
            }
            else if (keyPressed['d']) {
                directionOffset = Math.PI / 4;
            }
            else
                directionOffset = 0;
        } else if (keyPressed['a']) {
            directionOffset = -Math.PI / 2;
        } else if (keyPressed['d']) {
            directionOffset = Math.PI / 2;
        }

        return directionOffset;
    }
}