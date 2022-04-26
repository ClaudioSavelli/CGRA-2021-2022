import {CGFobject} from '../lib/CGF.js';

export class MyCircle extends CGFobject {
	constructor(scene, N) {
		//N is the number of triangles/sides/points 
		super(scene);
		this.init(N);
	}
	
	init(N) {
		this.vertices = []; 
		this.indices = []; 
		this.normals = []; 

		this.vertices.push(0,0,0); 
		this.normals.push(0,1,0); 
		var angle = 2*Math.PI/N; 
		var actualAngle = 0; 
		
		for(let i=0; i<=N; i++){
			this.vertices.push(Math.cos(actualAngle), 0, -Math.sin(actualAngle));
            this.indices.push(0, i+1, i+2); 
			this.normals.push(0,1,0); 
			actualAngle += angle; 
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

