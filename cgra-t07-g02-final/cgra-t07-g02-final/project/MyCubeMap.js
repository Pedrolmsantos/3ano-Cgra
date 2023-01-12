import { Myquadscene } from "./Myquadscene.js";
import {CGFobject, CGFappearance} from '../lib/CGF.js';

/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCubeMap extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new Myquadscene(this.scene);
        this.initMaterials(scene);
    }

    initMaterials(scene){
        this.mineLeft = new CGFappearance(scene);
        this.mineLeft.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineLeft.setDiffuse(0, 0, 0, 1);
        this.mineLeft.setSpecular(0, 0, 0, 1);
        this.mineLeft.setShininess(10.0);
        this.mineLeft.setEmission(1,1,1,1);
        this.mineLeft.loadTexture('images/demo_cubemap/left.png');
        this.mineLeft.setTextureWrap('LINEAR', 'LINEAR');

        this.mineTop = new CGFappearance(scene);
        this.mineTop.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineTop.setDiffuse(0, 0, 0, 1);
        this.mineTop.setSpecular(0, 0, 0, 1);
        this.mineTop.setShininess(10.0);
        this.mineTop.setEmission(1,1,1,1);
        this.mineTop.loadTexture('images/demo_cubemap/top.png');
        this.mineTop.setTextureWrap('LINEAR', 'LINEAR');

        this.mineBottom = new CGFappearance(scene);
        this.mineBottom.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineBottom.setDiffuse(0, 0, 0, 1);
        this.mineBottom.setSpecular(0, 0, 0, 1);
        this.mineBottom.setShininess(10.0);
        this.mineBottom.setEmission(1,1,1,1);
        this.mineBottom.loadTexture('images/demo_cubemap/bottom.png');
        this.mineBottom.setTextureWrap('LINEAR', 'LINEAR');

        this.mineRight = new CGFappearance(scene);
        this.mineRight.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineRight.setDiffuse(0, 0, 0, 1);
        this.mineRight.setSpecular(0, 0, 0, 1);
        this.mineRight.setShininess(10.0);
        this.mineRight.setEmission(1,1,1,1);
        this.mineRight.loadTexture('images/demo_cubemap/right.png');
        this.mineRight.setTextureWrap('LINEAR', 'LINEAR');

        this.mineFront = new CGFappearance(scene);
        this.mineFront.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineFront.setDiffuse(0, 0, 0, 1);
        this.mineFront.setSpecular(0, 0, 0, 1);
        this.mineFront.setShininess(10.0);
        this.mineFront.setEmission(1,1,1,1);
        this.mineFront.loadTexture('images/demo_cubemap/front.png');
        this.mineFront.setTextureWrap('LINEAR', 'LINEAR');

        this.mineBack = new CGFappearance(scene);
        this.mineBack.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineBack.setDiffuse(0, 0, 0, 1);
        this.mineBack.setSpecular(0, 0, 0, 1);
        this.mineBack.setShininess(10.0);
        this.mineBack.setEmission(1,1,1,1);
        this.mineBack.loadTexture('images/demo_cubemap/back.png');
        this.mineBack.setTextureWrap('LINEAR', 'LINEAR');
    }

    display() {

        this.mineTop.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();

        this.mineRight.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        this.mineLeft.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.mineBottom.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(-Math.PI -Math.PI/2, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();

        this.mineFront.apply();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.mineBack.apply();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

    }
}