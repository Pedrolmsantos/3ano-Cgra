import { MyQuad } from "./MyQuad.js";
import { Mycircle} from "./Mycircle.js";
import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFobject } from "../lib/CGF.js";

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.earth = new Mycircle(this.scene);
        this.initMaterials(scene);
    }

    initMaterials(scene){
        this.mineSide = new CGFappearance(scene);
        this.mineSide.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineSide.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mineSide.setSpecular(0.1, 0.1, 0.1, 1);
        this.mineSide.setShininess(10.0);
        this.mineSide.loadTexture('images/mineSide.png');
        this.mineSide.setTextureWrap('REPEAT', 'REPEAT');

        this.mineTop = new CGFappearance(scene);
        this.mineTop.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineTop.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mineTop.setSpecular(0.1, 0.1, 0.1, 1);
        this.mineTop.setShininess(10.0);
        this.mineTop.loadTexture('images/mineTop.png');
        this.mineTop.setTextureWrap('REPEAT', 'REPEAT');

        this.mineBottom = new CGFappearance(scene);
        this.mineBottom.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineBottom.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mineBottom.setSpecular(0.1, 0.1, 0.1, 1);
        this.mineBottom.setShininess(10.0);
        this.mineBottom.loadTexture('images/mineBottom.png');
        this.mineBottom.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {

    }
}