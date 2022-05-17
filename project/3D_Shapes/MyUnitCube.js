import {CGFobject} from '../../lib/CGF.js';

export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene); 
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0.5,  //0
			0.5, -0.5, 0.5,   //1
			0.5, 0.5, 0.5,    //2
			-0.5, 0.5, 0.5,   //3 Face 1
			0.5, -0.5, 0.5,   //4
			0.5, -0.5, -0.5,  //5
			0.5, 0.5, -0.5,   //6
			0.5, 0.5, 0.5,    //7 Face 2
			0.5, -0.5, -0.5,  //8
			-0.5, -0.5, -0.5, //9
			-0.5, 0.5, -0.5,  //10
			0.5, 0.5, -0.5,   //11 Face 3
			-0.5, -0.5, -0.5, //12
			-0.5, -0.5, 0.5,  //13
			-0.5, 0.5, 0.5,   //14
			-0.5, 0.5, -0.5,  //15 Face 4
			-0.5, 0.5, 0.5,   //16
			0.5, 0.5, 0.5,    //17
			0.5, 0.5, -0.5,   //18
			-0.5, 0.5, -0.5,  //19 Face 5
			-0.5, -0.5, 0.5,  //20
			0.5, -0.5, 0.5,   //21
			0.5, -0.5, -0.5,  //22
			-0.5, -0.5, -0.5  //23 Face 6
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			0, 2, 3,
			4, 5, 6,
			4, 6, 7,
			8, 9, 10,
			8, 10, 11,
			12, 13, 14,
			12, 14, 15,
			16, 17, 18,
			16, 18, 19,
			22, 21, 20,
			23, 22, 20

		];

		this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0,
			0, 1,
			1, 1,
			0, 0,
			1, 0,
			0, 1,
			1, 1,
			0, 0,
			1, 0,
			0, 1,
			1, 1,
			0, 0,
			1, 0,
			0, 1,
			1, 1,
			0, 0,
			1, 0,
			0, 1,
			1, 1,
			0, 0,
			1, 0
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

