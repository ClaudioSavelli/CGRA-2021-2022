import {CGFobject} from '../../lib/CGF.js';

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

		this.vertices.push(0,0,0); 
		this.normals.push(0,1,0); 
		this.texCoords.push(0.5, 0.5); 
		
		for(let i=0; i<=N; i++){
			this.vertices.push(Math.cos(actualAngle), 0, -Math.sin(actualAngle));
            this.indices.push(0, i, i+1); 
			this.normals.push(0,1,0); 
			this.texCoords.push((Math.cos(actualAngle)+1)/2, (1-Math.sin(actualAngle))/2); 
			actualAngle += angle; 
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

