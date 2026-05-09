export let keyPressed = {};

export function initInput(characterBody, characterControls) {
    document.addEventListener('keydown', (event) => {
        if (['1', '2', '3', '4', '5', '6'].some(key => event.key === key) &&
            !['a', 'd', 'w', 's'].some(key => keyPressed[key])) {
            if (!characterControls.getIsEmoteAction()) {
                keyPressed[event.key] = true;
                characterControls.setIsEmoteAction(true);
            }
        }
        else if (!['1', '2', '3', '4', '5', '6'].some(key => keyPressed[key]) &&
            !['1', '2', '3', '4', '5', '6'].some(key => event.key === key)) {
            if (event.shiftKey && characterControls) {
                characterControls.switchRunToggle();
            }
            else {
                keyPressed[event.key.toLowerCase()] = true;
            }
        }

        if (keyPressed['q']) {
            console.log(characterBody.position);
        }

        if (keyPressed[' '] && Math.abs(characterBody.velocity.y) < 0.1)
            characterBody.velocity.y = 7
    });

    document.addEventListener('keyup', (event) => {
        if (!['1', '2', '3', '4', '5', '6'].some(key => event.key === key)) {
            keyPressed[event.key.toLowerCase()] = false;
        }

        if (!keyPressed['w'] && !keyPressed['s']) characterBody.velocity.z = 0
        if (!keyPressed['a'] && !keyPressed['d']) characterBody.velocity.x = 0
    });
}