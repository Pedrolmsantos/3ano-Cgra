import {CGFscene, CGFcamera, CGFaxis, CGFobject, CGFappearance} from "../lib/CGF.js";
import { MyUnitCube } from "./MyUnitCube.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyStation extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initMaterials(scene);
        this.cube= new MyUnitCube(this.scene);
        this.casap= new MyUnitCube(this.scene);
        this.roof= new MyUnitCube(this.scene);
        /*this.circle = new Mycircle(this.scene,12);
        this.cylinder = new MyCylinder(this.scene,12);
        this.wheel = new MyWheel(this.scene);
        this.wheel1 = new MyWheel(this.scene);
        this.wheel2 = new MyWheel(this.scene);
        this.wheel3 = new MyWheel(this.scene);
        this.body = new MyUnitCube(this.scene);
        this.cabine = new MyUnitCube(this.scene);
        this.frente = new Sphere(this.scene,60,60);
        this.cylinder1 = new MyCylinder(this.scene,12);
        this.angle_y=0;
        this.angleY = 0;
        this.speed=0;
        this.x_pos=0;this.y_pos=0;this.z_pos=0;*/
    }
    initMaterials(scene) {

        this.oge = new CGFappearance(scene);
        this.oge.setAmbient(0.0,0.0,0.0,1);
        this.oge.setDiffuse(0.65,0.47,0,1.0);
        this.oge.setSpecular(1.0,0.65,0,1.0);

        this.b = new CGFappearance(scene);
        this.b.setAmbient(0.0,0.0,0.0,1);
        this.b.setDiffuse(0,0.5,0.65,1.0);
        this.b.setSpecular(0,0.76,1,1.0);

        this.y = new CGFappearance(scene);
        this.y.setAmbient(0.0,0.0,0.0,1);
        this.y.setDiffuse(0.7,0.7,0,1.0);
        this.y.setSpecular(1,1,0,1.0);

        this.p = new CGFappearance(scene);
        this.p.setAmbient(0.0,0.0,0.0,1);
        this.p.setDiffuse(1,1,1,1.0);
        this.p.setSpecular(1,1,1,1.0);

        this.pk = new CGFappearance(scene);
        this.pk.setAmbient(0.0,0.0,0.0,1);
        this.pk.setDiffuse(0.1,0.1,0.1,1.0);
        this.pk.setSpecular(1,0.7,0.8,1.0);

        this.r = new CGFappearance(scene);
        this.r.setAmbient(0.0,0.0,0.0,1);
        this.r.setDiffuse(0.7,0,0,1.0);
        this.r.setSpecular(1,0,0,1.0,1.0);
    }

    display() {
        this.scene.pushMatrix();

        this.scene.pushMatrix();
        this.scene.scale(35, 2, 22);
        this.p.apply();
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 4);
        this.scene.translate(0, 8, 0);
        this.scene.scale(30, 18, 12);
        this.pk.apply();
        this.casap.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        //this.scene.rotate(Math.PI/2, 0, 0, 1);
        //this.scene.translate(0, 0, 4);
        this.scene.translate(0, 17,4);
        this.scene.scale(29.9, 8.5, 8.5);

        this.scene.rotate(Math.PI/4, 1, 0, 0);
        this.oge.apply();
        this.roof.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}