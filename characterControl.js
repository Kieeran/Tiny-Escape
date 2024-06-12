import * as CANNON from 'cannon-es';
import * as THREE from 'three';

export class CharacterControls {

    moveDirection = new THREE.Vector3();
    rotateAngle = new THREE.Vector3(0, 1, 0);
    rotateQuaternion = new THREE.Quaternion();
    cameraTarget = new THREE.Vector3();

    fadeDuration = 0.2;
    runVelocity = 2;
    walkVelocity = 1;

    constructor(model, mixer, orbitControl, camera, actions, characterBody, currentAction) {
        this.model = model;
        this.mixer = mixer;
        this.controls = orbitControl;
        this.camera = camera;
        this.actions = actions;
        this.characterBody = characterBody;
        this.currentAction = currentAction;

        this.toggleRun = false;
        this.isEmoteAction = false;

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

    getIsEmoteAction() {
        return this.isEmoteAction;
    }

    setIsEmoteAction(emotion) {
        this.isEmoteAction = emotion;
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

        return play;
    }

    getKey(play) {
        var key = ''

        if (play === 'Dance')
            key = '1';
        else if (play === 'Death')
            key = '2';
        else if (play === 'No')
            key = '3';
        else if (play === 'Yes')
            key = '4';
        else if (play === 'Wave')
            key = '5';
        else if (play === 'ThumbsUp')
            key = '6';

        return key;
    }

    update(delta, keyPressed) {
        const directionPressed = ['a', 'd', 'w', 's', ' '].some(key => keyPressed[key]);
        const otherPressed = ['1', '2', '3', '4', '5', '6'].some(key => keyPressed[key]);
        var play = '';

        if (directionPressed) {
            if (!keyPressed[' ']) {
                play = 'Walking';
                if (this.toggleRun)
                    play = 'Running';
            }
            else
                play = 'Jump';
        }

        else if (otherPressed) {
            play = this.getEmotion(keyPressed);
        }

        else play = 'Idle';
        //console.log(play);

        // Simple FSM
        if (this.currentAction != play) {
            if (this.currentAction !== 'Idle' && otherPressed) {
                this.isEmoteAction = false;
                keyPressed[this.getKey(play)] = false;
            }

            const toPlay = this.actions.get(play);
            const current = this.actions.get(this.currentAction);

            current.fadeOut(this.fadeDuration);
            toPlay.reset().fadeIn(this.fadeDuration).play();

            this.currentAction = play;
        }

        if (this.currentAction == 'Running' ||
            this.currentAction == 'Walking' ||
            this.currentAction == 'Jump') {
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

            this.characterBody.velocity.x = -this.moveDirection.x * velocity
            this.characterBody.velocity.z = -this.moveDirection.z * velocity

            this.updateCameraTarget();
        }
        this.characterBody.quaternion.x = 0
        this.characterBody.quaternion.z = 0

        var origin = new CANNON.Vec3(
            this.characterBody.position.x,
            this.characterBody.position.y - 0.218,
            this.characterBody.position.z
        );
        this.model.position.copy(origin);

        this.mixer.update(delta);
    }

    updateCameraTarget() {
        this.camera.getWorldDirection(this.moveDirection);
        this.moveDirection.normalize();

        var distance = 1;

        this.camera.position.x = this.characterBody.position.x - distance * this.moveDirection.x;
        this.camera.position.y = this.characterBody.position.y - distance * this.moveDirection.y;
        this.camera.position.z = this.characterBody.position.z - distance * this.moveDirection.z;

        this.cameraTarget.x = this.characterBody.position.x;
        this.cameraTarget.y = this.characterBody.position.y;
        this.cameraTarget.z = this.characterBody.position.z;
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