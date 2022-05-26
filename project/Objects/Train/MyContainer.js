import {CGFobject, CGFappearance, CGFtexture} from '../../../lib/CGF.js';
import { MyQuad } from '../../2D_Shapes/MyQuad.js'
import { MyLoad } from '../Load/MyLoad.js';


export class MyContainer extends CGFobject {
	constructor(scene, N, isEmpty) {
		super(scene);
		this.scene = scene; 
		this.init(scene, N);
		this.createTextures(); 
		this.isEmpty = isEmpty; 
	}
	
	init(scene, N) {
		this.quad = new MyQuad(this.scene); 
		this.load = new MyLoad(this.scene, N); 
	}

	createTextures() {
		this.defaultAppearance = new CGFappearance(this.scene);
		this.defaultAppearance.setAmbient(3, 3, 3, 1);
		this.defaultAppearance.setDiffuse(6, 6, 6, 1);
		this.defaultAppearance.setSpecular(0, 0, 0, 1);
		this.defaultAppearance.setShininess(500);

		this.texture = new CGFtexture(this.scene, "./images/steel.jpg");
		this.defaultAppearance.setTexture(this.texture);
		this.defaultAppearance.setTextureWrap('REPEAT', 'REPEAT');
	}

	display(){

		this.defaultAppearance.apply();

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

		//load 
		if(!this.isEmpty){
			this.scene.pushMatrix();  
			this.scene.translate(0,0.25,-0.15); 
			this.load.display(); 
			this.scene.popMatrix();		 
		}

		this.scene.popMatrix();		 
	}

	updateBuffers() {
		this.initBuffers(); 
		this.initNormalVizBuffers(); 
	}
}

