import { CGFscene, CGFcamera, CGFaxis, CGFappearance,CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import {CGFcamera2} from "./CGFcamera2.js";
import { MyTrack} from "./MyTrack.js";
import { MyQuad } from "./MyQuad.js";
import {Mycircle} from "./Mycircle.js";
import {MyTrackSegment} from "./MyTrackSegment.js";
import {Sphere} from "./Sphere.js";
import {MyCylinder} from "./MyCylinder.js";
import {Mytrain} from "./Mytrain.js";
import {MyCubeMap} from "./MyCubeMap.js";
import {MyInterface} from "./MyInterface.js";
import {MyVehicle} from "./MyVehicle.js";
import {MyStation} from "./MyStation.js";

//https://docs.google.com/document/d/e/2PACX-1vSo9whOmS5u1PoPAp_Ctl2BSIRUQfMx0cH_rX4ajJuzFto-LzqDC0TcpYzQaqRveg/pub
/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.initMaterials();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gui = new MyInterface();
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        //this.update("w");
        this.setUpdatePeriod(12);
         this.Pontos = [
            {x: 0, z: 0, type: "simple"},
            {x: 3, z: 4, type: "station"},
            {x: 6, z: 4, type: "simple"},
            {x: 9, z: 0, type: "station"}
        ];
        this.Pontos1 = [
            {x: 0, z: 0, type: "simple"},
            {x: 0, z: 5, type: "station"},
            {x: 5, z: 5, type: "simple"},
            {x: 5, z: 0, type: "station"}
        ];
        var Pontos2 = [
            {x: 0, z: 0, type: "simple"},
            {x: 0, z: 5, type: "station"},
            {x: 5, z: 5, type: "station"},
            {x: 5, z: 0, type: "station"}
        ];
        this.enableTextures(true);
        //Initialize scene objects
        this.axis = new CGFaxis(this);
        ///this.plane = new MyPlane(this, 1, 0,1,0,1);
        this.track = new MyTrack(this,this.Pontos);
        this.circle = new Mycircle(this,98,1);
        this.quad = new MyQuad(this);
        this.sphere = new Sphere(this,120,200);
       // this.cylinder = new MyCylinder(this,12);
        this.vehicle = new Mytrain(this,this.Pontos);
        this.cubemap = new MyCubeMap(this);

        this.displayAxis = true;
        this.displayTrain = true;
        this.displayTracks = true;
        this.displayCubeMap = true;
        this.displayCubeMap = true;
        this.displayStations = true;
        this.speedFactor = 1;

        this.setUpdatePeriod(12);
       // this.track.display();
       // this.tracksegment = new MyTrackSegment(this,Pontos[0],Pontos[1]);

        //Objects connected to MyInterface
        this.displayAxis = true;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();

        this.lights[1].setPosition(0,0,0,1);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].enable();
        this.lights[1].update();
    }
    initMaterials(){
        this.text1 = new CGFtexture(this,'images/window.jpg');
        this.textureCircle = new CGFappearance(this);
        this.textureCircle.setTexture(this.text1);
        this.text2 = new CGFtexture(this,'images/earth.jpg');
        this.textureSphere = new CGFappearance(this);
        this.textureSphere.setTexture(this.text2);
    }
    initCameras() {
       //this.camera = new CGFcamera2(0.4, 0.1, 500, vec3.fromValues(30,30,30), vec3.fromValues(0, 0, 0));
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(50 * Math.cos(Math.PI / 14), 1 * Math.sin(Math.PI / 12) + 35, 0), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }
    C_dist(Pi,Pf){
        return Math.hypot((Pi.x - Pf.x), (Pi.z - Pf.z));
    }

    C_alpha(Pi,Pf,Pg){
        let vec1 = {z: Pf.x -Pi.x,x: Pf.z -Pi.z};
        let vec2 = {z: Pg.x -Pf.x,x: Pg.z -Pf.z};
        let denom = (vec1.x*vec2.x+vec1.z*vec2.z);
        let parte_baixo = (Math.sqrt(Math.pow(vec1.x, 2)+Math.pow(vec1.z, 2))*Math.sqrt(Math.pow(vec2.x, 2)+Math.pow(vec2.z, 2)));
        return Math.acos(denom/parte_baixo);
    }
    checkKeys() {
        if (this.gui.isKeyPressed("KeyW")) {
            //this.myPyramid.accelerate(0.02);
            this.vehicle.updatecrane(1);
    //    this.vehicle.setAutomatic();
        }
        if (this.gui.isKeyPressed("KeyS")) {
            //this.myPyramid.accelerate(-.1);
            this.vehicle.updatecrane(-1);
        }
        if (this.gui.isKeyPressed("KeyA")) {
            //this.myPyramid.turn(-Math.PI/12);
            this.vehicle.updatecrane(2);
        } else {
        }
        if (this.gui.isKeyPressed("KeyD")) {
            //this.myPyramid.turn(Math.PI/12);
            this.vehicle.updatecrane(-2);
            //    console.log(text);
        }
        if (this.gui.isKeyPressed("KeyC")) {
            //this.myPyramid.turn(Math.PI/12);
            this.vehicle.updatestate();
            //    console.log(text);
        }
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t,speedFactor){
        //console.log(t);
           // this.vehicle.translate(0.0001,0,0);
          this.checkKeys();
            this.vehicle.update(t,this.speedFactor);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        for(let i = 0;i<this.Pontos.length;i++){
            if(this.Pontos[i].type === "station"){
               this.station =  new MyStation(this);
               this.pushMatrix()
                let t = i-1;
                let v = i+1;
                this.translate(0,0.5,-14);
                this.translate(4*this.Pontos[i].z,0,4*this.Pontos[i].x);
                this.scale(0.3,0.3,0.3);
                if(t<0)  t = this.Pontos.length-1;
                if(v>this.Pontos.length-1) v = 0;
                if(this.C_alpha(this.Pontos[t],this.Pontos[i],this.Pontos[v]) < 1.5){
                    this.rotate(Math.PI/2,0,1,0);
                    this.translate(0,0,17);
                }else{
                    this.rotate(-Math.PI/2,0,1,0);
                    this.translate(0,0,17);
                }
               if(this.displayStations)this.station.display();
               this.popMatrix();
            }
        }
        this.pushMatrix();
        if(this.displayTracks)this.track.display();
        //this.translate(5,5,5);
        this.popMatrix();

       // this.test.display();
        this.axis.display();
        this.pushMatrix();
        //this.rotate(Math.PI/2,0,1,0);
        this.translate(-1.2,0.2,-14);
       // this.translate(this.vehicle.posX, this.vehicle.posY, this.vehicle.posZ);
       // this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        //this.translate(-this.vehicle.posX, -this.vehicle.posY, -this.vehicle.posZ);
        if(this.displayTrain)this.vehicle.display();
        this.popMatrix();
        //while(1){
       // }
       // this.pushMatrix();
    //    this.textureSphere.apply();
     //   this.sphere.display();
      //  this.popMatrix();
        this.pushMatrix();
        this.scale(50,50,50);
        this.translate(0,0.5,0);
       if(this.displayCubeMap) this.cubemap.display();

        this.popMatrix();

        // Draw axis
        //if (this.displayAxis)
        this.setDefaultAppearance();
        //this.tracksegment.display();
        // ---- BEGIN Primitive drawing section
        //this.pushMatrix();
        //this.scale(50,1,50);
        //this.rotate(-Math.PI*0.5, 1,0,0);
        //this.plane.display();
        //this.popMatrix();
        // ---- END Primitive drawing section
    }
}