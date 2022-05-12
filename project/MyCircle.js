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
		this.texCoords = []; 

		var angle = 2*Math.PI/N; 
		var actualAngle = 0; 
		
		for(let i=0; i<=N; i++){
			this.vertices.push(Math.cos(actualAngle), 0, -Math.sin(actualAngle));
            this.indices.push(0, i+1, i+2); 
			this.normals.push(0,1,0); 
			this.texCoords.push(Math.cos(actualAngle), -Math.sin(actualAngle)); 
			actualAngle += angle; 
		}

		this.texCoords.push(Math.cos(actualAngle), 0, -Math.sin(actualAngle)); 
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

