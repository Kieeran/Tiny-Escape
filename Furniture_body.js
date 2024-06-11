import * as CANNON from 'cannon-es';

export function Furniture_body() {

    let objectsFurniture_body = [];

    var bed_surface_body = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(3, 3.4, 0.6)),
    });
    bed_surface_body.position.set(4.5, 0.65, -8.5);
    bed_surface_body.quaternion.setFromEuler(Math.PI / 2, 0, 0);
    objectsFurniture_body.push(bed_surface_body);

    var bed_body = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(3, 1.4, 0.15)),
    });
    bed_body.position.set(4.5, 1.4, -11.65);
    objectsFurniture_body.push(bed_body);

    var bed_pillow_left = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(1, 0.6, 0.3)),
    });
    bed_pillow_left.position.set(3.2, 1.75, -11.2);
    bed_pillow_left.quaternion.setFromEuler(-Math.PI / 6, 0, 0);
    objectsFurniture_body.push(bed_pillow_left);

    var bed_pillow_right = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(1, 0.6, 0.3)),
    });

    bed_pillow_right.position.set(5.5, 1.75, -11.2);
    bed_pillow_right.quaternion.setFromEuler(-Math.PI / 6, 0, 0);
    objectsFurniture_body.push(bed_pillow_right);

    var mini_pillow_right = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.32, 0.08)),
    });

    mini_pillow_right.position.set(5.4, 1.75, -10.5);
    mini_pillow_right.quaternion.setFromEuler(-Math.PI / 8, 0, 0);
    objectsFurniture_body.push(mini_pillow_right);

    var mini_pillow_left = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.32, 0.08)),
    });
    mini_pillow_left.position.set(3.3, 1.75, -10.5);
    mini_pillow_left.quaternion.setFromEuler(-Math.PI / 8, 0, 0);
    objectsFurniture_body.push(mini_pillow_left);

    var babyboo = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Sphere(0.9),
    });
    babyboo.position.set(3.3, 2, -8.5);
    objectsFurniture_body.push(babyboo);

    var potions_bottle = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Cylinder(0.3, 0.2, 0.9, 20),
    });
    potions_bottle.position.set(6, 1.7, -9);
    potions_bottle.quaternion.setFromEuler(3 * Math.PI / 4, 0, Math.PI / 2);
    objectsFurniture_body.push(potions_bottle);

    var PC_Case_body = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.96, 1.18, 0.665)),
    });
    PC_Case_body.position.set(-6.47, 1.2, -6.25);
    objectsFurniture_body.push(PC_Case_body);

    var chair = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Cylinder(0.1, 0.1, 1.5, 20),
    });
    chair.position.set(-4.98, 1, -8.42);

    objectsFurniture_body.push(chair);

    var chair1 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.073, 0.64, 0.06)),
    });
    chair1.position.set(-5, 0.21, -7.855);
    chair1.quaternion.setFromEuler(Math.PI / 2 + 0.2, 0, 0);
    objectsFurniture_body.push(chair1);

    var chair2 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.073, 0.64, 0.06)),
    });
    chair2.position.set(-5, 0.21, -8.97);
    chair2.quaternion.setFromEuler(77.3 * Math.PI / 180, 0, 0);
    objectsFurniture_body.push(chair2);

    var chair3 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.073, 0.64, 0.06)),
    });
    chair3.position.set(-4.46, 0.2, -8.42);
    chair3.quaternion.setFromEuler(0, 0, 79 * Math.PI / 180);
    objectsFurniture_body.push(chair3);

    var chair4 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.073, 0.64, 0.06)),
    });
    chair4.position.set(-5.55, 0.2, -8.42);
    chair4.quaternion.setFromEuler(0, 0, 101 * Math.PI / 180);
    objectsFurniture_body.push(chair4);

    var chair5 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.073, 0.64, 0.06)),
    });
    chair5.position.set(-4.6, 0.2, -8);
    chair5.quaternion.setFromEuler(0, 136 * Math.PI / 180, 105 * Math.PI / 180);
    objectsFurniture_body.push(chair5);

    var chair6 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.073, 0.64, 0.06)),
    });
    chair6.position.set(-5.4, 0.21, -8.08);
    chair6.quaternion.setFromEuler(0, 39 * Math.PI / 180, 101 * Math.PI / 180);
    objectsFurniture_body.push(chair6);

    var chair7 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.073, 0.64, 0.06)),
    });
    chair7.position.set(-4.6, 0.21, -8.78);
    chair7.quaternion.setFromEuler(0, 220 * Math.PI / 180, 102 * Math.PI / 180);
    objectsFurniture_body.push(chair7);

    var chair8 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.073, 0.64, 0.06)),
    });
    chair8.position.set(-5.4, 0.21, -8.82);
    chair8.quaternion.setFromEuler(0, 136 * Math.PI / 180, 80 * Math.PI / 180);
    objectsFurniture_body.push(chair8);

    var chair9 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Cylinder(1, 1, 0.2, 20),
    });
    chair9.position.set(-4.9, 1.9, -8.4);
    chair9.quaternion.setFromEuler(0, 0, 0);
    objectsFurniture_body.push(chair9);

    var chair10 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Cylinder(1, 1, 0.2, 20),
    });
    chair10.position.set(-4.9, 1.9, -8.4);
    chair10.quaternion.setFromEuler(0, 0, 0);
    objectsFurniture_body.push(chair10);

    var chair11 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Cylinder(1, 1, 0.2, 20),
    });
    chair11.position.set(-4.9, 1.9, -8.4);
    chair11.quaternion.setFromEuler(0, 0, 0);
    objectsFurniture_body.push(chair11);

    var chair12 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Cylinder(1, 1, 0.2, 20),
    });
    chair12.position.set(-4.9, 1.9, -8.4);
    chair12.quaternion.setFromEuler(0, 0, 0);
    objectsFurniture_body.push(chair12);


    return objectsFurniture_body;

}