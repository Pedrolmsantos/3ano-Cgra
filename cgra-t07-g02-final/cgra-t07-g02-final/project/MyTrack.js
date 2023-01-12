import {CGFobject} from '../lib/CGF.js';
import {MyPlane} from "./MyPlane.js";
import {MyTrackSegment} from "./MyTrackSegment.js";
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTrack extends CGFobject {
	constructor(scene,Pontos) {
		super(scene);
		this.Pontos = Pontos;
		this.segments = [];
		//this.initBuffers();
		for(var i=0;i<Pontos.length;i++){
			if(i===Pontos.length-1){
				this.segments.push(new MyTrackSegment(scene,Pontos[0],Pontos[i]));
				break;
			}
			this.segments.push(new MyTrackSegment(scene,Pontos[i],Pontos[i+1]));
		}
	}
	display(){
		for(let i=0;i<this.segments.length;i++){
			this.scene.pushMatrix();
		//	this.scene.translate(5,0,0);
			this.segments[i].display();
		}
	}
}

