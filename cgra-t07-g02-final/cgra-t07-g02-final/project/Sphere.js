import {CGFobject} from '../lib/CGF.js';

/*export class Sphere extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.aux = stacks * 2;
        this.aux1 = slices;

        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var phi = 0;
        var theta = 0;
        var phiInc = Math.PI / this.aux;
        var thetaInc = (2 * Math.PI) / this.aux1;
        var latVertices = this.longDivs + 1;

        var textmaplongitude=0;
        var textmaplatitude=0;
        var textmaplongpart = 1/this.aux1;
        var textmaplatpart= 1/this.aux;

        for (let latitude = 0; latitude <= this.aux; latitude++) {
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            theta = 0;
            textmaplongitude=0;

            for (let longitude = 0; longitude <= this.aux1; longitude++) {
                //--- Vertices coordinates
                var x = Math.cos(theta) * sinPhi;
                var y = cosPhi;
                var z = Math.sin(-theta) * sinPhi;
                this.vertices.push(x, y, z);
                this.texCoords.push(textmaplongitude,textmaplatitude);
                if (latitude < this.aux && longitude < this.aux1) {
                    var current = latitude * latVertices + longitude;
                    var next = current + latVertices;
                    this.indices.push( current + 1, current, next);
                    this.indices.push( current + 1, next, next +1);
                }
                this.normals.push(x, y, z);
                theta += thetaInc;
                textmaplongitude+=textmaplongpart;
            }
            phi += phiInc;
            textmaplatitude+=textmaplatpart;
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}*/
export class Sphere extends CGFobject {

    constructor(scene, slices, stacks) {
        super(scene);
        this.aux = stacks * 2;
        this.aux2 = slices;

        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var phi = 0;
        var ang = 0;
        var phiInc = Math.PI / this.aux;
        var thetaInc = (2 * Math.PI) / this.aux2;
        var latVertices = this.aux2 + 1;

        var textcordslg=0;
        var textcordslt=0;
        var textmaplongpart = 1/this.aux2;
        var textmaplatpart= 1/this.aux;

        for (let lt = 0; lt <= this.aux; lt++) {
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);
            
            ang = 0;
            textcordslg=0;

            for (let lg = 0; lg <= this.aux2; lg++) {
                var x = Math.cos(ang) * sinPhi;
                var y = cosPhi;
                var z = Math.sin(-ang) * sinPhi;
                this.vertices.push(x, y, z);

                this.texCoords.push(textcordslg,textcordslt );

                if (lt < this.aux && lg < this.aux2) {
                    var current = lt * latVertices + lg;
                    var i = current + latVertices;
                    this.indices.push( current + 1, current, i);
                    this.indices.push( current + 1, i, i +1);
                }
                this.normals.push(x, y, z);
                ang += thetaInc;
                textcordslg+=textmaplongpart;
            }
            phi += phiInc;
            textcordslt+=textmaplatpart;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}