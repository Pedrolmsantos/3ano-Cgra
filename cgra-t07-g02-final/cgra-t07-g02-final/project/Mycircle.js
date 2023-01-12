import {CGFobject} from '../lib/CGF.js';
/**
 * MyCircle
 * @constructor
 */
 export class Mycircle extends CGFobject {
  constructor(scene, slices, radius = 0.5) {
      super(scene);
      this.slices = slices;
      this.radius = radius;
      this.initBuffers();
  }
  initBuffers() {
      this.vertices = [];
      this.indices = [];
      this.normals = [];
      this.texCoords = [];
      var ag = 0;
      var alpha = 2*Math.PI/this.slices;
      for(var iter = 0; iter < this.slices; iter++){
          this.vertices.push(Math.cos(ag)*this.radius, 0, -Math.sin(ag)*this.radius);
          this.indices.push(iter, (iter+1) % this.slices, this.slices);
          this.normals.push(0, 1, 0);
          this.texCoords.push(0.5 + Math.cos(ag)*0.5, 0.5 - Math.sin(ag)*0.5);
          ag+=alpha;
      }

      this.vertices.push(0,0,0);
      this.normals.push(0,1,0);
      this.texCoords.push(0.5, 0.5);

      this.primitiveType = this.scene.gl.TRIANGLES;
      this.initGLBuffers();
  }
}