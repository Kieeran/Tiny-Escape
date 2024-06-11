import * as CANNON from 'cannon-es';

export function Furniture_body() {

    let objectsFurniture_body = [];

    var bed_body = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(4, 4, 0.6)),
    });
    bed_body.position.set(0, 5.5, 12);
    // bed_body.rotation.set(0, Math.PI / 2, 0);
    objectsFurniture_body.push(bed_body);


    return objectsFurniture_body;
}