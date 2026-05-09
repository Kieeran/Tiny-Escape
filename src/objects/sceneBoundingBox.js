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

    var body3_1 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(1.5, 5.5, 0.6)),
    });
    body3_1.position.set(6.55, 5.5, -12.6);
    objectsBoundingBox.push(body3_1);

    var body3_2 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(1.5, 5.5, 0.6)),
    });
    body3_2.position.set(-6.55, 5.5, -12.6);
    objectsBoundingBox.push(body3_2);

    var body3_3 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(8, 1.5, 0.6)),
    });
    body3_3.position.set(0, 1.6, -12.6);
    objectsBoundingBox.push(body3_3);

    var body3_4 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(8, 0.6, 0.6)),
    });
    body3_4.position.set(0, 10.2, -12.6);
    objectsBoundingBox.push(body3_4);

    var body3_5 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(5.1, 3.12, 0.6)),
    });
    body3_5.position.set(0, 6.4, -13.2);
    objectsBoundingBox.push(body3_5);

    var body4 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.1, 5.5, 12)),
    });
    body4.position.set(8, 5.5, 0);
    objectsBoundingBox.push(body4);

    return objectsBoundingBox;
}