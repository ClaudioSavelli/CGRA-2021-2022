import {CGFobject, CGFappearance} from '../../../lib/CGF.js';
import { MyQuad } from '../../2D_Shapes/MyQuad.js'
import { MyLoad } from '../Load/MyLoad.js';


export class MyContainer extends CGFobject {
	constructor(scene, N) {
		super(scene);
		this.scene = scene; 
		this.init(scene, N);
	}
	
	init(scene, N) {
		this.quad = new MyQuad(this.scene); 
		//this.load = new MyLoad(this, N); 
	}

	display(){
		this.scene.pushMatrix(); 
		this.scene.translate(0,2.01,-3); 
		
		//base
		this.scene.pushMatrix(); 
		this.scene.scale(2.25, 1, 1.25); 
		this.quad.display(); 
		this.scene.popMatrix();

		//front and back 
		this.scene.pushMatrix();  
		this.scene.translate(0, 0.5, 0.625); 
		this.scene.rotate(Math.PI/2, 1, 0, 0); 
		this.scene.scale(2.25, 1, 1); 
		this.quad.display(); 
		this.scene.scale(1, 1, -1); 
		this.quad.display(); 
		this.scene.translate(0,-1.25,0); 
		this.quad.display(); 
		this.scene.scale(1, 1, -1); 
		this.quad.display();
		this.scene.popMatrix();

		/*
		//back
		this.scene.pushMatrix();  
		this.scene.translate(0, 0.5, -0.625); 
		this.scene.rotate(Math.PI/2, 1, 0, 0); 
		this.scene.scale(2.25, 1, 1); 
		this.quad.display(); 
		this.scene.scale(1, 1, -1); 
		this.quad.display(); 
		this.scene.popMatrix();
*/

		//lateral
		this.scene.pushMatrix();  
		this.scene.translate(1.125, 0.5, 0); 
		this.scene.rotate(Math.PI/2, 0, 1, 0); 
		this.scene.rotate(Math.PI/2, 1, 0, 0); 
		this.scene.scale(1.25, 1, 1); 
		this.quad.display(); 
		this.scene.scale(1, 1, -1); 
		this.quad.display(); 
		this.scene.translate(0, -2.25, 0);
		this.quad.display(); 
		this.scene.scale(1, 1, -1); 
		this.quad.display(); 
		this.scene.popMatrix();

		this.scene.popMatrix();		 
	}

	updateBuffers() {
		this.initBuffers(); 
		this.initNormalVizBuffers(); 
	}
}

