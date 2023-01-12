import {CGFscene, CGFcamera, CGFaxis, CGFobject, CGFappearance} from "../lib/CGF.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { Mycircle } from "./Mycircle.js";
import { MyCylinder } from "./MyCylinder.js";
import {MyWheel} from "./MyWheel.js";
import {Sphere} from "./Sphere.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCrane extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cylinderTrain = new MyCylinder(this.scene,12);
      //  this.cylinderSecond = new MyCylinder(this.scene,12);
        this.cylinderSecond = new MyWheel(this.scene,35);
        this.cylinderPick = new MyCylinder(this.scene,12);
        this.connection = new Sphere(this.scene,60,60);
        this.initMaterials();
        this.angle = 0;
        this.angle2 = 0;
    }
    initMaterials(){
        this.body=new CGFappearance(this.scene);
        this.body.setAmbient(0.7,0.7,0.7,1);
        this.body.setDiffuse(0.9,0.9,0.9,1);
        this.body.setDiffuse(0.2,0.2,0.2,1);
        this.body.setShininess(10);
        this.body.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

        this.cockpit=new CGFappearance(this.scene);
        this.cockpit.setAmbient(0.7,0.7,0.7,1);
        this.cockpit.setDiffuse(0.9,0.9,0.9,1);
        this.cockpit.setDiffuse(0.2,0.2,0.2,1);
        this.cockpit.setShininess(10);

        this.helixes=new CGFappearance(this.scene);
        this.helixes.setAmbient(0.7,0.7,0.7,1);
        this.helixes.setDiffuse(0.9,0.9,0.9,1);
        this.helixes.setDiffuse(0.2,0.2,0.2,1);
        this.helixes.setShininess(10);

        this.oge = new CGFappearance(this.scene);
        this.oge.setAmbient(0.0,0.0,0.0,1);
        this.oge.setDiffuse(0.65,0.47,0,1.0);
        this.oge.setSpecular(1.0,0.65,0,1.0);

    }
        updatecrane(number){
            if(number===1){

                if(this.angle2>-Math.PI/8-0.2){
                    this.angle2 -= 0.01;}
            }else if(number===-1){
                if(this.angle2<Math.PI/16){
                    this.angle2 += 0.01;
                }
            }else if(number===2){
                if(this.angle<Math.PI/4){
                this.angle += 0.01;}
            }else if(number===-2){
                if(this.angle>-Math.PI-Math.PI/4){
                this.angle -= 0.01;}
            }
        }

    display(){

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(0,0.75,0);
        this.scene.translate(0,0,2.5);
        this.scene.scale(0.4,1,0.4);
        this.scene.translate(-2,3.8,-3);
        this.cylinderTrain.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.3,0,0.8);
        this.scene.rotate(this.angle,0,1,0);
        this.scene.translate(-1.3,0,-0.8);
        this.scene.translate(1.3,5.8,0.8);
        this.scene.rotate(this.angle2,0,0,1);
        this.scene.translate(-1.3,-5.8,-0.8);
       /* this.scene.translate(0,0.75,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.translate(0.8,-1,-5);
        this.scene.scale(0.2,3,0.2);*/
        this.scene.translate(1,5.8,0.8);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.scale(0.2,0.2,13.2);
        this.cylinderSecond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.3,0,0.8);
        this.scene.rotate(this.angle,0,1,0);
        this.scene.translate(-1.3,0,-0.8);
        this.scene.translate(0,-Math.sin(this.angle2)*2.95,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(0,0.75,0);
        this.scene.translate(0,0,2.5);
        this.scene.translate(-5.2,0,0);
        this.scene.translate(4.4,1,-3.6);
        this.scene.scale(0.05,4,0.05);
        this.oge.apply();
        this.cylinderPick.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(0,0.75,0);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.translate(5.2,0,0);
        this.scene.translate(-4.4,5,-1.3);
        this.scene.scale(0.5,0.5,0.5);

        this.connection.display();
        this.scene.popMatrix();

    }



}