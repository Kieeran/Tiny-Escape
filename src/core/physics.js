import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger';

export let physicsWorld;
export let cannonDebugger;

export function initPhysics(scene) {
    physicsWorld = new CANNON.World({
        gravity: new CANNON.Vec3(0, -9.82, 0), // m/s²
    })
    cannonDebugger = new CannonDebugger(scene, physicsWorld, {});
}