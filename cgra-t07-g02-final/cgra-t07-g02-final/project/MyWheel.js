import {CGFscene, CGFcamera, CGFaxis, CGFobject, CGFappearance} from "../lib/CGF.js";
import { Mycircle } from "./Mycircle.js";
import { MyCylinder } from "./MyCylinder.js";
import {MyCircle2} from "./MyCircle2.js";
/**
 * MyWheel
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWheel extends CGFobject {
    constructor(scene,slices) {
        super(scene);
        this.initMaterials(scene);
        this.circle = new MyCircle2(this.scene,slices);
        this.cylinder = new MyCylinder(this.scene,slices);

    }
    initMaterials(scene) {
        this.oge = new CGFappearance(scene);
        this.oge.setAmbient(0.0,0.0,0.0,1);
        this.oge.setDiffuse(0.65,0.47,0,1.0);
        this.oge.setSpecular(1.0,0.65,0,1.0);
    }
    display() {
        this.scene.pushMatrix();
        //this.scene.translate()
        //this.scene.scale()
        //this.scene.rotate()
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.75,0.2,0.75);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,0.2);
        this.scene.scale(0.75,0.75,1);
        this.circle.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

    }
}
