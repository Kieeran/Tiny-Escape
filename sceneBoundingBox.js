import * as CANNON from 'cannon-es';

export function sceneBoundingBox() {

    let objectsBoundingBox = [];

    var body1 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(8, 5.5, 0.1)),
    });
    body1.position.set(0, 5.5, 12);
    objectsBoundingBox.push(body1);

    var body2 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.1, 5.5, 12)),
    });
    body2.position.set(-8, 5.5, 0);
    objectsBoundingBox.push(body2);

    var body3 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(8, 5.5, 0.1)),
    });
    body3.position.set(0, 5.5, -12);
    objectsBoundingBox.push(body3);

    var body4 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.1, 5.5, 12)),
    });
    body4.position.set(8, 5.5, 0);
    objectsBoundingBox.push(body4);

    return objectsBoundingBox;
}