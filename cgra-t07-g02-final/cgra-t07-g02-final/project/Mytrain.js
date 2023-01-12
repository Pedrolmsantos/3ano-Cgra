import {CGFscene, CGFcamera, CGFaxis, CGFobject, CGFappearance} from "../lib/CGF.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { Mycircle } from "./Mycircle.js";
import { MyCylinder } from "./MyCylinder.js";
import {MyWheel} from "./MyWheel.js";
import {Sphere} from "./Sphere.js";
import {MyTrackSegment} from "./MyTrackSegment.js";
import {MyCrane} from "./MyCrane.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class Mytrain extends CGFobject {
    constructor(scene,Pontos) {
        super(scene);
        this.initMaterials(scene);
        this.Pontos = Pontos;
        this.cube= new MyUnitCube(this.scene);
        this.circle = new Mycircle(this.scene,12);
        this.cylinder = new MyCylinder(this.scene,12);
        this.wheel = new MyWheel(this.scene,12);
        this.wheel1 = new MyWheel(this.scene,12);
        this.wheel2 = new MyWheel(this.scene,12);
        this.wheel3 = new MyWheel(this.scene,12);
        this.body = new MyUnitCube(this.scene);
        this.cabine = new MyUnitCube(this.scene);
        this.frente = new Sphere(this.scene,60,60);
        this.cylinder1 = new MyCylinder(this.scene,12);
        this.crane = new MyCrane(this.scene);
        this.angle_y=0;
        this.v = 0;
        this.f = 1;
        this.s=2;
            this.speed=0;
        this.x=0;this.y=0;this.z=0;
        this.flag = true;
        this.dist = 0;
        this.stop = false;
        this.ratio = 0.001;
        //this.turn(Math.PI/4);
        this.turn(this.C_alpha(this.Pontos[this.v],this.Pontos[this.f],this.Pontos[this.s]));
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


        this.p = new CGFappearance(scene);
        this.p.setAmbient(0.0,0.0,0.0,1);
        this.p.setDiffuse(0.4,0,0.6,1.0);
        this.p.setSpecular(0.6,0,0.85,1.0);

        this.pk = new CGFappearance(scene);
        this.pk.setAmbient(0.0,0.0,0.0,1);
        this.pk.setDiffuse(0.7,0.5,0.52,1.0);
        this.pk.setSpecular(1,0.7,0.8,1.0);

        this.r = new CGFappearance(scene);
        this.r.setAmbient(0.0,0.0,0.0,1);
        this.r.setDiffuse(0.7,0,0,1.0);
        this.r.setSpecular(1,0,0,1.0,1.0);
    }


    C_alpha(Pi,Pf,Pg){
        let vec1 = {z: Pf.x -Pi.x,x: Pf.z -Pi.z};
        let vec2 = {z: Pg.x -Pf.x,x: Pg.z -Pf.z};
        let denom = (vec1.x*vec2.x+vec1.z*vec2.z);
        let parte_baixo = (Math.sqrt(Math.pow(vec1.x, 2)+Math.pow(vec1.z, 2))*Math.sqrt(Math.pow(vec2.x, 2)+Math.pow(vec2.z, 2)));
        return Math.acos(denom/parte_baixo);
    }
    C_dist(Pi,Pf){
        return Math.hypot((Pi.x - Pf.x), (Pi.z - Pf.z));
    }
    turn(v) {
        this.angle_y += v;

    }

    updatecrane(number){
        if(number==1){
            this.crane.updatecrane(1);
        }else if(number==-1){
            this.crane.updatecrane(-1);
        }else if(number==2){
            this.crane.updatecrane(2);
        }else if(number==-2){
            this.crane.updatecrane(-2);
        }
    }
    updatestate(){
        this.stop= false;
        this.ratio = 0.001;
    }
    update(t,speedFactor){
        if(this.stop===false) {

            this.timeelapsed = t - this.time;
            this.timeelapsed = this.timeelapsed / 1000;
            if (this.time == null) {
                this.time = t;
                return;
            }
            // this.z += (1  * this.timeelapsed);
            // this.z += (1);
            if (this.s > 3) return;

            //    console.log(this.dist);
            //  console.log("calc : " + Math.atan((this.Pontos[this.f].z - this.Pontos[this.s].z)/(this.Pontos[this.f].x - this.Pontos[this.s].x)));
            //  if(this.dist>=4*Math.hypot((this.Pontos[f].x - this.Pontos[s].x), (this.Pontos[f].z - this.Pontos[s].z))-4.5){
            console.log("train ang : " + this.angle_y);
            console.log("ang : " + this.C_alpha(this.Pontos[this.v], this.Pontos[this.f], this.Pontos[this.s]));
            // console.log("comprimento do carril" + Math.hypot((this.Pontos[this.s].x - this.Pontos[this.f].x), (this.Pontos[this.s].z - this.Pontos[this.f].z)));
            if (this.v < 0) this.v = this.Pontos.length - 1;
            if (this.s > this.Pontos.length - 1) this.s = 0;
            if (this.f > this.Pontos.length - 1) this.f = 0;
            if (this.v > this.Pontos.length - 1) this.v = 0;
            let cm = 4 * this.C_dist(this.Pontos[this.v], this.Pontos[this.f]) -1;

            if (this.angle_y < 0 && this.angle_y > -2) {
                cm -= 2.5;
            }
            if(this.Pontos[this.f].type === "station" && this.dist >= 4*this.C_dist(this.Pontos[this.v], this.Pontos[this.f])*0.50){

                if(this.ratio>0.05) this.ratio-= 0.030;
            }else{
                if(this.ratio<1){
                    this.ratio+=0.005;
                }
            }
            if (this.dist >= cm) {
                // this.turn(this.C_alpha(this.Pontos[this.f-1],this.Pontos[this.f],this.Pontos[this.s]));

                if (this.v < 0) this.v = this.Pontos.length - 1;
                if (this.f > this.Pontos.length - 1) this.f = 0;
                if (this.s > this.Pontos.length - 1) this.s = 0;
                if (this.v > this.Pontos.length - 1) this.v = 0;
                let ang = this.C_alpha(this.Pontos[this.v], this.Pontos[this.f], this.Pontos[this.s]);
                if (ang < 0) {
                    this.turn(ang);

                } else {
                    this.turn(-ang);
                }

                this.flag = true;
                if (this.angle_y === -Math.PI) {
                    this.angle_y = Math.PI;
                    this.flag = false;
                }


                this.f++;
                this.s++;
                this.v++;
                if (this.v < 0) this.v = this.Pontos.length - 1;
                if (this.f > this.Pontos.length - 1) this.f = 0;
                if (this.s > this.Pontos.length - 1) this.s = 0;
                if (this.v > this.Pontos.length - 1) this.v = 0;
                if(this.Pontos[this.v].type === "station"){
                    this.stop = true;
                }
                if (this.v < 0) this.v = this.Pontos.length - 1;
                if (this.f > this.Pontos.length - 1) this.f = 0;
                if (this.s > this.Pontos.length - 1) this.s = 0;
                if (this.v > this.Pontos.length - 1) this.v = 0;
                this.dist = 0;
            }
            //  this.angle_y += 20;
            /* this.dist=0;
             this.f++;
             this.s++;
             if(this.s>this.Pontos.length-1){
                 this.s = 0;
            //     this.angle_y=-Math.PI*2 - this.angle_y;
             }
             if(this.f>this.Pontos.length-1){
                 this.angle_y = Math.PI*2 + this.angle_y;
                 this.f = 0;
                 this.turn(-Math.PI+ Math.atan((this.Pontos[0].z - this.Pontos[1].z)/(this.Pontos[0].x - this.Pontos[1].x)));
                 this.flag = true;
                 return;
             }
             console.log("ang : " + Math.atan((this.Pontos[this.f].z - this.Pontos[this.s].z)/(this.Pontos[this.f].x - this.Pontos[this.s].x)));

             if(Math.atan(this.Pontos[this.f].z - this.Pontos[this.s].z)/(this.Pontos[this.f].x - this.Pontos[this.s].x)===0){
                  if(this.angle_y<0){
                     this.turn(-Math.PI-this.angle_y);
                    // this.turn(Math.PI+this.angle_y);
                     this.flag = false;
                 }else{
                  //   this.turn(this.angle_y);
                     this.turn(-Math.atan((this.Pontos[0].z - this.Pontos[1].z)/(this.Pontos[0].x - this.Pontos[1].x)));
                   //  this.turn(Math.PI+this.angle_y);
                     this.flag = true;
                 }
                 //this.turn(-Math.atan((this.Pontos[this.f-1].z - this.Pontos[this.s-1].z)/(this.Pontos[this.f-1].x - this.Pontos[this.s-1].x)));
             }else {
                 this.turn(Math.atan((this.Pontos[this.f].z - this.Pontos[this.s].z) / (this.Pontos[this.f].x - this.Pontos[this.s].x)));
                // this.turn(Math.PI -Math.atan((this.Pontos[this.f].z - this.Pontos[this.s].z) / (this.Pontos[this.f].x - this.Pontos[this.s].x))+Math.atan((this.Pontos[this.f+1].z - this.Pontos[this.s+1].z) / (this.Pontos[this.f+1].x - this.Pontos[this.s+1].x)));
                 this.flag = true;
             }

         }else{
           //  this.x += 0.5;
            // this.z += 0.35;
             if(this.flag){
                 this.x += this.timeelapsed* Math.sin(Math.atan((this.Pontos[this.f].z - this.Pontos[this.s].z)/(this.Pontos[this.f].x - this.Pontos[this.s].x)));
               this.z += this.timeelapsed*  Math.cos(Math.atan((this.Pontos[this.f].z - this.Pontos[this.s].z)/(this.Pontos[this.f].x - this.Pontos[this.s].x)));
             }else{
                 this.x -= this.timeelapsed*  Math.sin(Math.atan((this.Pontos[this.f].z - this.Pontos[this.s].z)/(this.Pontos[this.f].x - this.Pontos[this.s].x)));
             this.z -= this.timeelapsed* Math.cos(Math.atan((this.Pontos[this.f].z - this.Pontos[this.s].z)/(this.Pontos[this.f].x - this.Pontos[this.s].x)));
             }
         }
 */
            if (this.flag) {
                if (this.v < 0) this.v = this.Pontos.length - 1;
                if (this.f > this.Pontos.length - 1) this.f = 0;
                if (this.s > this.Pontos.length - 1) this.s = 0;
                if (this.v > this.Pontos.length - 1) this.v = 0;
                this.x += speedFactor* this.ratio*  Math.sin(Math.atan((this.Pontos[this.v].z - this.Pontos[this.f].z) / (this.Pontos[this.v].x - this.Pontos[this.f].x)));
                this.z += speedFactor* this.ratio* Math.cos(Math.atan((this.Pontos[this.v].z - this.Pontos[this.f].z) / (this.Pontos[this.v].x - this.Pontos[this.f].x)));
            } else {
                if (this.v < 0) this.v = this.Pontos.length - 1;
                if (this.f > this.Pontos.length - 1) this.f = 0;
                if (this.s > this.Pontos.length - 1) this.s = 0;
                if (this.v > this.Pontos.length - 1) this.v = 0;
                this.x -=speedFactor * this.ratio* Math.sin(Math.atan((this.Pontos[this.v].z - this.Pontos[this.f].z) / (this.Pontos[this.v].x - this.Pontos[this.f].x)));
                this.z -=speedFactor * this.ratio* Math.cos(Math.atan((this.Pontos[this.v].z - this.Pontos[this.f].z) / (this.Pontos[this.v].x - this.Pontos[this.f].x)));
            }
            if (this.v < 0) this.v = this.Pontos.length - 1;
            if (this.f > this.Pontos.length - 1) this.f = 0;
            if (this.s > this.Pontos.length - 1) this.s = 0;
            if (this.v > this.Pontos.length - 1) this.v = 0;
            this.dist = Math.hypot((4 * (this.Pontos[this.v].x) - this.z), (4 * (this.Pontos[this.v].z) - this.x));
            //console.log(this.timeelapsed);
            this.time = t;
        }
    }
    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z);
      //  this.scene.translate(1,0,4);
        this.scene.rotate(this.angle_y,0,1,0);
       // this.scene.translate(-1,0,-4);
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
        this.oge.apply();
        this.wheel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(0,0.75,0);
       // this.scene.translate(0,0,2.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.oge.apply();
        this.wheel1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(0,0.75,0);

        this.scene.translate(0,0,2.5);
        this.scene.translate(-5.2,0,0);
        this.oge.apply();
        this.wheel2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(0,0.75,0);

        // this.scene.translate(0,0,2.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.translate(5.2,0,0);
        this.oge.apply();
        this.wheel3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix()
        this.scene.scale(2.5,1,7.5);
        this.scene.translate(0.5,1.5,0.35);
        this.r.apply();
        this.body.display();
        this.scene.popMatrix();

        this.scene.pushMatrix()
        this.scene.scale(2,2.5,1.8);
        this.scene.translate(0.62,1.31,0.35);
        this.scene.translate(0,0,0.5);
        this.r.apply();
        this.cabine.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.9,0.9,3.5);
        this.scene.rotate(Math.PI/2,1,0,0);

        this.scene.translate(1.35,0.4,-3.25);
        this.scene.translate(0,0.2,0);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.2,2.9,5.35);
        this.scene.scale(0.9,0.9,0.3);
        this.scene.scale(1,1,0.3);
        this.scene.translate(0,0,-5);
        this.scene.translate(0,0,7.5);
        this.frente.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.2,1,0.2);
        this.scene.translate(4,3.5,19);
        this.scene.translate(0,0,3);
        this.p.apply();
        this.cylinder1.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0,0,1);
        this.crane.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}
