import {CGFobject} from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class Myquadscene extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -0.5, -0.5, 0,	//0
            0.5, -0.5, 0,	//1
            -0.5, 0.5, 0,	//2
            0.5, 0.5, 0		//3
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            //0, 1, 2,
            //1, 3, 2,
            2,1,0,
            2,3,1
        ];


        this.texCoords = [
            0, 1,
            1, 1,
            0, 0,
            1, 0
        ]
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /**
     * @method updateTexCoords
     * Updates the list of texture coordinates of the quad
     * @param {Array} coords - Array of texture coordinates
     */
    updateTexCoords(coords) {
        this.texCoords = [...coords];
        this.updateTexCoordsGLBuffers();
    }
}

