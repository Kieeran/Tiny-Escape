import * as CANNON from 'cannon-es';

export function Furniture_body() {

    let objectsFurniture_body = [];
    //bed
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

    var PC_table_body = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(1.3, 3, 0.1)),
    });
    PC_table_body.position.set(-6.5, 2.9, -8.2);
    PC_table_body.quaternion.setFromEuler(Math.PI / 2, 0, 0);
    objectsFurniture_body.push(PC_table_body);

    var PC_keyboard_body = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.4, 1, 0.03)),
    });
    PC_keyboard_body.position.set(-6.2, 3.1, -8.4);
    PC_keyboard_body.quaternion.setFromEuler(Math.PI / 2, 168 * Math.PI / 180, 0);
    objectsFurniture_body.push(PC_keyboard_body);

    var PC_screen_body = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.85, 0.69, 0.06)),
    });
    PC_screen_body.position.set(-7.2, 4.05, -8.45);
    PC_screen_body.quaternion.setFromEuler(0, Math.PI / 2, 0);
    objectsFurniture_body.push(PC_screen_body);

    var PC_leg_body = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.35, 0.3, 0.07)),
    });
    PC_leg_body.position.set(-7.41, 3.43, -8.45);
    PC_leg_body.quaternion.setFromEuler(0, Math.PI / 2, 0);
    objectsFurniture_body.push(PC_leg_body);

    var PC_leg_body1 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.3, 0.95, 0.03)),
    });
    PC_leg_body1.position.set(-7.4, 3, -8.45);
    PC_leg_body1.quaternion.setFromEuler(Math.PI / 2, 0, 0);
    objectsFurniture_body.push(PC_leg_body1);

    var PC_chair_body1 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(1, 1.2, 0.1)),
    });
    PC_chair_body1.position.set(-4.1, 3.3, -8.45);
    PC_chair_body1.quaternion.setFromEuler(0, Math.PI / 2, 0);
    objectsFurniture_body.push(PC_chair_body1);

    var window_seat = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(5.25, 0.1, 0.5)),
    });
    window_seat.position.set(0, 3.2, -12.1);
    window_seat.quaternion.setFromEuler(0, 0, 0);
    objectsFurniture_body.push(window_seat);

    var magic_bottle_body = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.2, 0.55, 0.2)),
    });
    magic_bottle_body.position.set(-7, 3.6, -6);
    magic_bottle_body.quaternion.setFromEuler(0, 0, 0);
    objectsFurniture_body.push(magic_bottle_body);

    //chair at desk
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

    //tea table
    var table_surface = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Cylinder(1.6, 1.6, 0.1, 20),
    });
    table_surface.position.set(-4, 1.6, 7);
    objectsFurniture_body.push(table_surface);

    var table_body = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.15, 0.8, 0.15)),
    });
    table_body.position.set(-4, 0.8, 7);
    objectsFurniture_body.push(table_body);

    var table_leg1 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(1.12, 0.05, 0.24)),
    });
    table_leg1.position.set(-4, 0.06, 7);
    objectsFurniture_body.push(table_leg1);

    var table_leg2 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.24, 0.05, 1.12)),
    });
    table_leg2.position.set(-4, 0.06, 7);
    objectsFurniture_body.push(table_leg2);

    var table_leg3 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.05, 0.1)),
    });
    table_leg3.position.set(-3.5, 0.52, 7);
    table_leg3.quaternion.setFromEuler(0, 0, -1);

    objectsFurniture_body.push(table_leg3);

    var table_leg4 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.05, 0.1)),
    });
    table_leg4.position.set(-4.5, 0.52, 7);
    table_leg4.quaternion.setFromEuler(0, 0, 1);

    objectsFurniture_body.push(table_leg4);

    var table_leg5 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.05, 0.5, 0.05)),
    });
    table_leg5.position.set(-4, 0.5, 6.56);
    table_leg5.quaternion.setFromEuler(0.7, 0, 0);

    objectsFurniture_body.push(table_leg5);

    var table_leg5 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.05, 0.5, 0.05)),
    });
    table_leg5.position.set(-4, 0.5, 7.5);
    table_leg5.quaternion.setFromEuler(-0.7, 0, 0);
    objectsFurniture_body.push(table_leg5);

    //chair
    var chair_leg1 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.05, 0.3, 0.05)),
    });
    chair_leg1.position.set(-6.68, 0.35, 9.9);
    chair_leg1.quaternion.setFromEuler(0, 0, 160);
    objectsFurniture_body.push(chair_leg1);

    var chair_leg2 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.05, 0.3, 0.05)),
    });
    chair_leg2.position.set(-5.9, 0.49, 8.899);
    chair_leg2.quaternion.setFromEuler(144.9, 0, 0);
    objectsFurniture_body.push(chair_leg2);

    var chair_leg3 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.05, 0.3, 0.05)),
    });
    chair_leg3.position.set(-4.899, 0.5, 9.91);
    chair_leg3.quaternion.setFromEuler(0, 0, 23 * Math.PI / 180);
    objectsFurniture_body.push(chair_leg3);

    var chair_leg4 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.05, 0.3, 0.05)),
    });
    chair_leg4.position.set(-5.89, 0.4, 10.69);
    chair_leg4.quaternion.setFromEuler(162 * Math.PI / 180, 0, 0);
    objectsFurniture_body.push(chair_leg4);

    var chair_leg5 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.05, 0.3, 0.05)),
    });
    chair_leg5.position.set(-1.28, 0.5, 9.17);
    chair_leg5.quaternion.setFromEuler(201 * Math.PI / 180, 0, 168 * Math.PI / 180);
    objectsFurniture_body.push(chair_leg5);

    var chair_leg6 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.05, 0.3, 0.05)),
    });
    chair_leg6.position.set(-1.45, 0.38, 10.4);
    chair_leg6.quaternion.setFromEuler(174 * Math.PI / 180, 0, 166 * Math.PI / 180);
    objectsFurniture_body.push(chair_leg6);

    var chair_leg7 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.05, 0.3, 0.05)),
    });
    chair_leg7.position.set(-2.54, 0.38, 10.4);
    chair_leg7.quaternion.setFromEuler(0, 0, 164 * Math.PI / 180);
    objectsFurniture_body.push(chair_leg7);

    var chair_leg8 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.05, 0.3, 0.05)),
    });
    chair_leg8.position.set(-2.72, 0.5, 9.12);
    chair_leg8.quaternion.setFromEuler(14 * Math.PI / 180, 0, 162 * Math.PI / 180);
    objectsFurniture_body.push(chair_leg8);

    var chair_surface1 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(1.25, 0.6, 0.1)),
    });
    chair_surface1.position.set(-1.94, 1, 9.4);
    chair_surface1.quaternion.setFromEuler(Math.PI / 2, 0, 0);
    objectsFurniture_body.push(chair_surface1);

    var chair_surface2 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.8, 0.7, 0.1)),
    });
    chair_surface2.position.set(-1.94, 1.5, 10.4);
    chair_surface2.quaternion.setFromEuler(38 * Math.PI / 180, 0, 0);
    objectsFurniture_body.push(chair_surface2);

    var chair_surface3 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(1.25, 0.6, 0.1)),
    });
    chair_surface3.position.set(-5.5, 1, 9.6);
    chair_surface3.quaternion.setFromEuler(Math.PI / 2, 0, Math.PI / 4);
    objectsFurniture_body.push(chair_surface3);

    var chair_surface4 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.8, 0.7, 0.1)),
    });
    chair_surface4.position.set(-6.5, 1.5, 10.4);
    chair_surface4.quaternion.setFromEuler(256 * Math.PI / 180, 197 * Math.PI / 180, 139 * Math.PI / 180);
    objectsFurniture_body.push(chair_surface4);

    var chair_leg_horizontal1 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.09, 0.6, 0.01)),
    });
    chair_leg_horizontal1.position.set(-6.7, 0.1, 9.8);
    chair_leg_horizontal1.quaternion.setFromEuler(83 * Math.PI / 180, 0, 35 * Math.PI / 180);
    objectsFurniture_body.push(chair_leg_horizontal1);

    var chair_leg_horizontal2 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.09, 0.47, 0.01)),
    });
    chair_leg_horizontal2.position.set(-6.05, 0.15, 9.05);
    chair_leg_horizontal2.quaternion.setFromEuler(103 * Math.PI / 180, 185 * Math.PI / 180, 142 * Math.PI / 180);
    objectsFurniture_body.push(chair_leg_horizontal2);

    var chair_leg_horizontal3 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.09, 0.47, 0.01)),
    });
    chair_leg_horizontal3.position.set(-5, 0.15, 10.1);
    chair_leg_horizontal3.quaternion.setFromEuler(104 * Math.PI / 180, 186 * Math.PI / 180, 127 * Math.PI / 180);
    objectsFurniture_body.push(chair_leg_horizontal3);

    var chair_leg_horizontal4 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.09, 0.6, 0.01)),
    });
    chair_leg_horizontal4.position.set(-5.85, 0.15, 10.7);
    chair_leg_horizontal4.quaternion.setFromEuler(77 * Math.PI / 180, 0, 49 * Math.PI / 180);
    objectsFurniture_body.push(chair_leg_horizontal4);

    var chair_leg_horizontal5 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.09, 0.6, 0.01)),
    });
    chair_leg_horizontal5.position.set(-2.6, 0.1, 10.4);
    chair_leg_horizontal5.quaternion.setFromEuler(75 * Math.PI / 180, 0, 169 * Math.PI / 180);
    objectsFurniture_body.push(chair_leg_horizontal5);

    var chair_leg_horizontal6 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.09, 0.6, 0.01)),
    });
    chair_leg_horizontal6.position.set(-2.75, 0.1, 9.4);
    chair_leg_horizontal6.quaternion.setFromEuler(101 * Math.PI / 180, 0, 171 * Math.PI / 180);
    objectsFurniture_body.push(chair_leg_horizontal6);

    var chair_leg_horizontal7 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.09, 0.6, 0.01)),
    });
    chair_leg_horizontal7.position.set(-1.2, 0.1, 9.4);
    chair_leg_horizontal7.quaternion.setFromEuler(97 * Math.PI / 180, 0, 187 * Math.PI / 180);
    objectsFurniture_body.push(chair_leg_horizontal7);

    var chair_leg_horizontal8 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.09, 0.6, 0.01)),
    });
    chair_leg_horizontal8.position.set(-1.45, 0.1, 10.4);
    chair_leg_horizontal8.quaternion.setFromEuler(78 * Math.PI / 180, 0, 0);
    objectsFurniture_body.push(chair_leg_horizontal8);

    var black_bottle = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.2, 0.3, 0.2)),
    });
    black_bottle.position.set(-4, 2, 6.75);
    objectsFurniture_body.push(black_bottle);

    //shelf
    var shelf_back = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(4.5, 2.2, 0.01)),
    });
    shelf_back.position.set(-7.78, 6.2, 0);
    shelf_back.quaternion.setFromEuler(0, Math.PI / 2, 0);
    objectsFurniture_body.push(shelf_back);

    var shelf_under = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.8, 4.5, 0.01)),
    });
    shelf_under.position.set(-7, 4, 0);
    shelf_under.quaternion.setFromEuler(Math.PI / 2, 0, 0);
    objectsFurniture_body.push(shelf_under);

    var shelf_top = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.8, 4.5, 0.01)),
    });
    shelf_top.position.set(-7, 8.25, 0);
    shelf_top.quaternion.setFromEuler(Math.PI / 2, 0, 0);
    objectsFurniture_body.push(shelf_top);

    var shelf_middle = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.8, 4.5, 0.01)),
    });
    shelf_middle.position.set(-7, 5.6, 0);
    shelf_middle.quaternion.setFromEuler(Math.PI / 2, 0, 0);
    objectsFurniture_body.push(shelf_middle);

    var shelf_middle1 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.8, 4.5, 0.01)),
    });
    shelf_middle1.position.set(-7, 7, 0);
    shelf_middle1.quaternion.setFromEuler(Math.PI / 2, 0, 0);
    objectsFurniture_body.push(shelf_middle1);

    var shelf_middle2 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.8, 0.6, 0.06)),
    });
    shelf_middle2.position.set(-7.1, 7.6, 1.67);
    objectsFurniture_body.push(shelf_middle2);

    var shelf_middle3 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.8, 0.6, 0.06)),
    });
    shelf_middle3.position.set(-7.1, 7.6, -1.67);
    objectsFurniture_body.push(shelf_middle3);

    var shelf_middle4 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.8, 0.6, 0.06)),
    });
    shelf_middle4.position.set(-7.1, 6.3, 0);
    objectsFurniture_body.push(shelf_middle4);

    var shelf_middle5 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.8, 0.6, 0.06)),
    });
    shelf_middle5.position.set(-7.1, 5, 1.67);
    objectsFurniture_body.push(shelf_middle5);

    var shelf_middle6 = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.8, 0.6, 0.06)),
    });
    shelf_middle6.position.set(-7.1, 5, -1.67);
    objectsFurniture_body.push(shelf_middle6);

    var shelf_right = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.8, 2.2, 0.01)),
    });
    shelf_right.position.set(-7, 6.2, -4.5);
    objectsFurniture_body.push(shelf_right);

    var shelf_left = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(0.8, 2.2, 0.01)),
    });
    shelf_left.position.set(-7, 6.2, 4.5);
    objectsFurniture_body.push(shelf_left);

    return objectsFurniture_body;

}