import {CGFobject} from '../../lib/CGF.js';

export class MyCilinder extends CGFobject {
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

		//bottom part 
		var angle = 2*Math.PI/N; 
		var actualAngle = 0; 
		
		for(let i=0; i<=N; i++){
			this.vertices.push(Math.cos(actualAngle), 0, -Math.sin(actualAngle));
			this.normals.push(Math.cos(actualAngle), 0, -Math.sin(actualAngle));
			this.texCoords.push(Math.cos(actualAngle), -Math.sin(actualAngle));
			actualAngle += angle; 
		}

		//upper part
		actualAngle = 0; 
		
		for(let i=0; i<=N; i++){
			this.vertices.push(Math.cos(actualAngle), 1, -Math.sin(actualAngle));
			this.normals.push(Math.cos(actualAngle), 0, -Math.sin(actualAngle));
			this.texCoords.push(Math.cos(actualAngle), -Math.sin(actualAngle));
			actualAngle += angle; 
		}

		//now we have a matrix of 2N vertices, now generates the triangles
		for(let i=0; i<N; i++){
			//exterior part
			this.indices.push(i,i+1,N+i+1); 
			this.indices.push(i+1,N+i+2,N+i+1); 

			//interior part
			this.indices.push(i,N+i+1,i+1); 
			this.indices.push(i+1,N+i+1,N+i+2); 
		}


		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

