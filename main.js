import { createScene } from './src/core/scene.js';
import { createCamera } from './src/core/camera.js';
import { createRenderer } from './src/core/renderer.js';
import * as HELPERS from './src/core/helpers.js';
import { initInput } from './src/core/input.js';
import { initPhysics } from './src/core/physics.js';
import { addObjectBody, characterBody, debugBody } from './src/core/physicsBodies.js';

import { loadRoom } from './src/objects/room.js';
import { loadFurniture } from './src/objects/furniture.js';
import { loadBottles } from './src/objects/bottles.js';
import { loadToys } from './src/objects/toys.js';
import { loadCharacter } from './src/objects/character.js';
import { models } from './src/core/physicsBodies.js';
import { setGuiBody } from './src/gui.js';

import { addLight } from './src/lights/lights.js';

import { initGui, datGui } from './src/gui.js';

import { animate } from './src/animate.js';

const scene = createScene();
const rendererInstance = createRenderer();
const { camera, controls } = createCamera(rendererInstance);

HELPERS.setupResize(camera, rendererInstance);

initPhysics(scene);
initGui();

loadRoom(scene);
loadFurniture(scene);
loadBottles(scene);
loadToys(scene, models);

addObjectBody();
setGuiBody(debugBody);

loadCharacter(scene, characterBody, controls, camera, (characterControls) => {
    initInput(characterBody, characterControls);
    datGui();
    addLight(scene);
    animate(rendererInstance, scene, camera, controls);
});