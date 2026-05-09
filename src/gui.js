import { GUI } from 'dat.gui';
import * as CANNON from 'cannon-es';
import { angleToRad } from './core/helpers.js';

export let gui;
export let body = null;
export let shape = null;
export let scaleBody = ({
    x: 0.5,
    y: 0.5,
    z: 0.5
})

export let rotateBody = ({
    x: 0,
    y: 0,
    z: 0
})

export function initGui() {
    gui = new GUI();
}

export function setGuiBody(targetBody) {
    body = targetBody;
}

export function datGui() {
    gui.add(body.position, 'x', -20, 20).name('Position x')
    gui.add(body.position, 'y', -20, 20).name('Position y')
    gui.add(body.position, 'z', -20, 20).name('Position z')

    gui.add(scaleBody, 'x', -20, 20).name('Scale x')
    gui.add(scaleBody, 'y', -20, 20).name('Scale y')
    gui.add(scaleBody, 'z', -20, 20).name('Scale z')

    gui.add(rotateBody, 'x', 0, 360).name('Rotate x')
    gui.add(rotateBody, 'y', 0, 360).name('Rotate y')
    gui.add(rotateBody, 'z', 0, 360).name('Rotate z')
    gui.close()
}

export function updateGui() {
    if (!body) {
        return;
    }

    body.quaternion.setFromEuler(
        angleToRad(rotateBody.x),
        angleToRad(rotateBody.y),
        angleToRad(rotateBody.z),
    );

    const newShape = new CANNON.Box(new CANNON.Vec3(
        scaleBody.x,
        scaleBody.y,
        scaleBody.z
    ));

    if (shape) {
        body.removeShape(shape);
    }
    shape = newShape;
    body.addShape(shape);
}
