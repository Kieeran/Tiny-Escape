import * as CANNON from 'cannon-es';

export function Furniture_body() {

    let objectsFurniture_body = [];

    var bed_body = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(3, 3.4, 0.6)),
    });
    bed_body.position.set(4.5, 0.65, -8.5);
    bed_body.quaternion.setFromEuler(Math.PI / 2, 0, 0);
    objectsFurniture_body.push(bed_body);


    return objectsFurniture_body;
}