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

    return objectsFurniture_body;

}