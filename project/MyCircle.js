import {CGFobject} from '../lib/CGF.js';

export class MyCircle extends CGFobject {
	constructor(scene, N) {
		//N is the number of triangles/sides/points 
		super(scene);
		this.init(N);
	}
	
	init(N) {
		angle = 360/N; 
		initialAngle = 0; 
		x1 = 1; 
		z1 = 0; 
		for(let i=0; i<N; i++){
			


			//save as last vertex
			x1 = x2; 
			z1 = z2; 
		}
		//generate the last triangle 
		x2 = 1; 
		z1 = 0; 

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

