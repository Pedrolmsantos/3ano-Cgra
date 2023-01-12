import {CGFappearance, CGFobject} from '../lib/CGF.js';
import {MyQuad} from "./MyQuad.js";

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTrackSegment extends CGFobject {
    constructor(scene,Pi,Pf) {
        super(scene);
        this.Pi = Pi;
        this.Pf = Pf;
        this.dist = this.C_dist(Pi,Pf);
        this.alpha = this.C_alpha(this.dist);
        this.pm1 = (Pi.x + Pf.x)/2;
        this.pm2 = (Pi.z + Pf.z)/2;
        this.myquad = new MyQuad(this.scene);
        this.mineTop = new CGFappearance(scene);
        this.mineTop.setShininess(10.0);
        this.mineTop.setEmission(1,1,1,1);
        this.mineTop.loadTexture('images/tracks.png');
        this.mineTop.setTextureWrap('REPEAT', 'REPEAT');
    }
    C_dist(Pi,Pf){
        return Math.hypot((Pi.x - Pf.x), (Pi.z - Pf.z));
    }

    C_alpha(dist){
        return Math.atan((this.Pi.z - this.Pf.z)/(this.Pi.x - this.Pf.x));
    }

    display() {

        this.scene.pushMatrix();
       // console.log(this.dist);
        this.scene.rotate(-Math.PI*0.5, 1,0,0);
        this.scene.rotate(-Math.PI*0.5, 0,0,1);
        this.scene.translate(4*this.pm1,4*this.pm2,0);
        this.scene.translate(-15,0,0.2);
        this.scene.rotate(this.alpha,0,0,1);
        this.scene.scale(1,4,1);
       this.scene.scale(4*this.dist,1,1);
        this.myquad.updateTexCoords([0, 1, this.dist, 1, 0, 0, this.dist, 0]);
        this.mineTop.apply();
        this.myquad.display();

        this.scene.popMatrix();
    }
}

