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
export class MyVehicle extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.cylinder = new MyCylinder(this.scene,12);
        this.wheel = new MyWheel(this.scene);
        this.wheel1 = new MyWheel(this.scene);
        this.wheel2 = new MyWheel(this.scene);
        this.wheel3 = new MyWheel(this.scene);
        this.body = new MyUnitCube(this.scene);
        this.cabine = new MyUnitCube(this.scene);
        this.frente = new Sphere(this.scene,60,60);
        this.cylinder1 = new MyCylinder(this.scene,12);

        this.initMaterials();

        this.angle_y=0;
        this.speed=0;
        this.x_pos=0;this.y_pos=0;this.z_pos=0;

        this.automatic=false;
        this.time=0;
        this.slope=0;
        this.center_x=0;this.center_z=0;

        this.accel = 0;

    }
    initNormalVizBuffers(){
        this.cylinder.initNormalVizBuffers();
        this.propeller1.initNormalVizBuffers();
        this.propeller2.initNormalVizBuffers();
        this.finhor.initNormalVizBuffers();
        this.finvert.initNormalVizBuffers();
        this.flag.initNormalVizBuffers();

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


    }
    updatecrane(){

    }
    update(t){
        if (this.time == 0)
            this.time = t / 1000 % 1000;

        this.elapsedTime = (t / 1000 % 1000) - this.time;
        this.time = t / 1000 % 1000;
        this.pop = "";
        if(this.automatic){
            this.autopilotTime += this.elapsedTime;
            this.angle_mov=this.autopilotTime*this.speed;
            this.angle_y = this.angle_y + this.elapsedTime*360/5;
            if (this.angle_y > 360) {
                this.angle_y = this.angle_y % 360;
            }
            this.x_pos = -this.radius * Math.cos(this.angle_mov) + this.center_x;
            this.z_pos = this.radius * Math.sin(this.angle_mov) + this.center_z;
        }
        else{
            this.x_pos += this.speed * Math.sin(this.angle_y*Math.PI/180);
            this.z_pos += this.speed * Math.cos(this.angle_y*Math.PI/180);
        }


    }
    turn(v) {
        this.angle_y += v;

    }

    accelerate(v) {
        this.accel = v;
        this.speed += v;
        //this.wheel.rotateHelix(v);
       // this.wheel1.rotateHelix(v);
       // this.wheel2.rotateHelix(v);
       // this.wheel3.rotateHelix(v);
        if(this.speed<0){
            this.speed=0;
        }
    }

    reset() {
        this.x_pos = 0;
        this.y_pos = 0;
        this.z_pos = 0;
        this.speed = 0;
        this.angle_y = 0;
        this.automatic=false;

    }

    setAutomatic(){
        if (!this.automatic) {
            this.automatic=true;
            this.radius=5;
            this.autopilotTime = 0;
            this.speed=2*Math.PI/5;

            if(Math.cos(this.angle_y*Math.PI/180)==1){
                this.center_x=this.x_pos+5;
                this.center_z=this.z_pos;
                this.autopilotTime=0;
            }
            else if(Math.cos(this.angle_y*Math.PI/180)==-1){
                this.center_x=this.x_pos-5;
                this.center_z=this.z_pos;
                this.autopilotTime=2.5;
            }
            else if(Math.sin(this.angle_y*Math.PI/180)==1){
                this.center_z=this.z_pos-5;
                this.center_x=this.x_pos;
                this.autopilotTime=1.25;
            }
            else if(Math.sin(this.angle_y*Math.PI/180)==-1){
                this.center_z=this.z_pos+5;
                this.center_x=this.x_pos;
                this.autopilotTime=3.75;
            }
            else{
                this.slope=(Math.sin(this.angle_y*Math.PI/180.0))/(Math.cos(this.angle_y*Math.PI/180.0));

                if(Math.sin(this.angle_y*Math.PI/180.0)>0)
                    this.center_z=this.z_pos-Math.sqrt(25.0/(1.0+1.0/Math.pow(this.slope,2)));
                else
                    this.center_z=this.z_pos+Math.sqrt(25.0/(1.0+1.0/Math.pow(this.slope,2)));

                this.center_x=-1.0/(this.slope)*(this.center_z-this.z_pos)+this.x_pos;


                if(this.z_pos>this.center_z)
                    this.autopilotTime=(Math.asin((this.x_pos-this.center_x)/this.radius)+Math.PI/2.0)/this.speed;
                else if(this.z_pos<this.center_z)
                    this.autopilotTime=5-(Math.asin((this.x_pos-this.center_x)/this.radius)+Math.PI/2.0)/this.speed;

            }

        }
        else{
            this.automatic=false;
            this.speed=this.speed/4;
        }
    }

    display(){
        this.scene.pushMatrix();
        //this.scene.translate()
        //this.scene.scale()
        //this.scene.rotate()
        //this.scene.pushMatrix();
        //this.scene.popMatrix();
        // this..display();
        // this.scene.translate(0,-0.5,0);
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(0,0.75,0);
        this.scene.translate(0,0,2.5);
        this.wheel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(0,0.75,0);
        // this.scene.translate(0,0,2.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.wheel1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(0,0.75,0);

        this.scene.translate(0,0,2.5);
        this.scene.translate(-5.2,0,0);
        this.wheel2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(0,0.75,0);

        // this.scene.translate(0,0,2.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.translate(5.2,0,0);
        this.wheel3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix()
        this.scene.scale(2.5,1,7.5);
        this.scene.translate(0.5,1.5,0.35);
        this.body.display();
        this.scene.popMatrix();

        this.scene.pushMatrix()
        this.scene.scale(2,2.5,1.8);
        this.scene.translate(0.62,1.31,0.35);
        this.cabine.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.9,0.9,3.5);
        this.scene.rotate(Math.PI/2,1,0,0);

        this.scene.translate(1.35,0.4,-3.25);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.2,2.9,5.35);
        this.scene.scale(0.9,0.9,0.3);
        this.scene.scale(1,1,0.3);
        this.scene.translate(0,0,-5);
        this.frente.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.2,1,0.2);
        this.scene.translate(4,3.5,19);

        this.cylinder1.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

    }



}

