import * as CANNON from 'cannon-es';
import { physicsWorld } from './physics.js';
import { sceneBoundingBox } from '../objects/sceneBoundingBox.js';
import { Furniture_body } from '../objects/Furniture_body.js';

export let characterBody, toy_chair, spinner, toy_car, toy_truck, toy_rubikcube, baby_boo;
export let debugBody = null;
export let models = [];

export function addObjectBody() {
    var groundBody = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Plane(),
    });
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
    physicsWorld.addBody(groundBody);

    characterBody = new CANNON.Body({
        mass: 100,
        shape: new CANNON.Cylinder(0.15, 0.15, 0.44, 20),
        angularDamping: 0.95,
    });
    characterBody.position.set(0, 0.2, 0);
    physicsWorld.addBody(characterBody);

    const material = new CANNON.Material("defaultMaterial");
    material.friction = 0;
    material.restitution = 0;

    groundBody.material = material;
    characterBody.material = material;

    var objectsBoundingBox = sceneBoundingBox(physicsWorld);
    objectsBoundingBox.forEach(function (item, index) {
        physicsWorld.addBody(item);
    })

    var objectsFurniture_body = Furniture_body(physicsWorld);
    objectsFurniture_body.forEach(function (item, index) {
        physicsWorld.addBody(item);
    })

    var shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
    debugBody = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: shape,
    });
    debugBody.position.set(-4, 4, -12);
    //physicsWorld.addBody(debugBody);

    toy_chair = new CANNON.Body({
        mass: 5,
        shape: new CANNON.Box(new CANNON.Vec3(0.25, 0.025, 0.25)),
    });
    toy_chair.quaternion.setFromEuler(0, 7 * Math.PI / 180, 0)
    toy_chair.addShape(
        new CANNON.Box(new CANNON.Vec3(0.05, 0.2, 0.05)),
        new CANNON.Vec3(0.175, -0.23, 0.179),
    )

    toy_chair.addShape(
        new CANNON.Box(new CANNON.Vec3(0.05, 0.2, 0.05)),
        new CANNON.Vec3(-0.175, -0.23, 0.179),
    )

    toy_chair.addShape(
        new CANNON.Box(new CANNON.Vec3(0.05, 0.2, 0.05)),
        new CANNON.Vec3(0.175, -0.23, -0.179),
    )

    toy_chair.addShape(
        new CANNON.Box(new CANNON.Vec3(0.05, 0.2, 0.05)),
        new CANNON.Vec3(-0.175, -0.23, -0.179),
    )

    toy_chair.addShape(
        new CANNON.Box(new CANNON.Vec3(0.25, 0.25, 0.01)),
        new CANNON.Vec3(0, 0.4, -0.2),
        new CANNON.Quaternion(0, 0, 0)
    )

    physicsWorld.addBody(toy_chair);
    toy_chair.position.set(2, 5, 0);

    spinner = new CANNON.Body({
        mass: 5,
        shape: new CANNON.Cylinder(0.06, 0.06, 0.06, 14)
    })

    spinner.addShape(
        new CANNON.Cylinder(0.06, 0.06, 0.02, 14),
        new CANNON.Vec3(0, 0, 0.15),
    )

    spinner.addShape(
        new CANNON.Cylinder(0.06, 0.06, 0.02, 14),
        new CANNON.Vec3(0.13, 0, -0.07),
    )

    spinner.addShape(
        new CANNON.Cylinder(0.06, 0.06, 0.02, 14),
        new CANNON.Vec3(-0.13, 0, -0.07),
    )

    spinner.position.set(-2, 3, 0)
    physicsWorld.addBody(spinner);

    toy_car = new CANNON.Body({
        mass: 5,
        shape: new CANNON.Box(new CANNON.Vec3(0.3, 0.1, 0.95))
    })

    toy_car.addShape(
        new CANNON.Sphere(0.095),
        new CANNON.Vec3(0.3, -0.12, 0.64),
    )

    toy_car.addShape(
        new CANNON.Sphere(0.095),
        new CANNON.Vec3(-0.3, -0.12, 0.64),
    )

    toy_car.addShape(
        new CANNON.Sphere(0.095),
        new CANNON.Vec3(0.3, -0.12, -0.64),
    )

    toy_car.addShape(
        new CANNON.Sphere(0.095),
        new CANNON.Vec3(-0.3, -0.12, -0.64),
    )

    toy_car.addShape(
        new CANNON.Box(new CANNON.Vec3(0.31, 0.13, 0.22)),
        new CANNON.Vec3(0, 0.22, -0.06),
    )

    toy_car.position.set(1, 3, 2);
    physicsWorld.addBody(toy_car);

    toy_truck = new CANNON.Body({
        mass: 5,
        shape: new CANNON.Box(new CANNON.Vec3(0.2, 0.1, 0.8))
    })

    toy_truck.addShape(
        new CANNON.Box(new CANNON.Vec3(0.2, 0.14, 0.43)),
        new CANNON.Vec3(0, 0.24, -0.34),
    )

    toy_truck.addShape(
        new CANNON.Box(new CANNON.Vec3(0.15, 0.1, 0.123)),
        new CANNON.Vec3(0, 0.2, 0.23),
    )

    toy_truck.addShape(
        new CANNON.Sphere(0.1),
        new CANNON.Vec3(0.18, -0.08, 0.53),
    )

    toy_truck.addShape(
        new CANNON.Sphere(0.1),
        new CANNON.Vec3(-0.18, -0.08, 0.53),
    )

    toy_truck.addShape(
        new CANNON.Sphere(0.1),
        new CANNON.Vec3(0.18, -0.08, -0.58),
    )

    toy_truck.addShape(
        new CANNON.Sphere(0.1),
        new CANNON.Vec3(-0.18, -0.08, -0.58),
    )

    toy_truck.addShape(
        new CANNON.Sphere(0.1),
        new CANNON.Vec3(0.18, -0.08, -0.35),
    )

    toy_truck.addShape(
        new CANNON.Sphere(0.1),
        new CANNON.Vec3(-0.18, -0.08, -0.35),
    )

    toy_truck.position.set(0, 3, 5);
    physicsWorld.addBody(toy_truck)

    toy_rubikcube = new CANNON.Body({
        mass: 5,
        shape: new CANNON.Box(new CANNON.Vec3(0.095, 0.095, 0.095))
    })
    toy_rubikcube.position.set(-3, 2, 6);
    physicsWorld.addBody(toy_rubikcube);

    baby_boo = new CANNON.Body({
        mass: 5,
        shape: new CANNON.Sphere(0.9)
    })
    baby_boo.position.set(3.3, 4, -8.5);
    baby_boo.quaternion.setFromEuler(Math.PI / 2, 0.2, 0.5)
    physicsWorld.addBody(baby_boo);
}