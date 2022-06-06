import {CGFobject, CGFappearance, CGFtexture} from '../../../lib/CGF.js';
import { MyQuad } from '../../2D_Shapes/MyQuad.js';
import { MyTriangle } from '../../2D_Shapes/MyTriangle.js';
import { MyUnitCube } from '../../3D_Shapes/MyUnitCube.js';


export class MySnowplow extends CGFobject {
	constructor(scene) {
		super(scene);
		this.scene = scene; 
		this.init(scene);
		this.createTextures(); 
	}
	
	init(scene) {
		this.cube = new MyUnitCube(scene);  
		this.quad = new MyQuad(scene); 
		this.triangle = new MyTriangle(scene); 
	}

	createTextures() {
		this.blackMetal = new CGFappearance(this.scene);
		this.blackMetal.setAmbient(3, 3, 3, 1);
		this.blackMetal.setDiffuse(6, 6, 6, 1);
		this.blackMetal.setSpecular(0, 0, 0, 1);
		this.blackMetal.setShininess(500);

		this.texture = new CGFtexture(this.scene, "./images/metallic_red.jpg");
		this.blackMetal.setTexture(this.texture);
		this.blackMetal.setTextureWrap('REPEAT', 'REPEAT');
	}

	display(){

		this.blackMetal.apply();

		//front and back 
		this.scene.pushMatrix();  
		this.scene.translate(0.6, 1.5, 4.1); 
		this.scene.rotate(Math.PI/6, 0, 1, 0); 
		this.scene.scale(1.45, 1, 0.1); 
		this.cube.display();  
		this.scene.popMatrix();

		this.scene.pushMatrix();  
		this.scene.translate(-0.6, 1.5, 4.1); 
		this.scene.rotate(-Math.PI/6, 0, 1, 0); 
		this.scene.scale(1.45, 1, 0.1); 
		this.cube.display();  
		this.scene.popMatrix();

		this.scene.pushMatrix();  
		this.scene.translate(0, 2.001, 3.7); 
		this.scene.rotate(Math.PI/2, 1, 0, 0); 
		this.scene.scale(-0.60, 0.40, 1); 
		this.triangle.display();  
		this.scene.popMatrix();

		this.scene.pushMatrix();  
		this.scene.translate(0, 1, 3.7); 
		this.scene.rotate(Math.PI/2, 1, 0, 0); 
		this.scene.scale(0.60, 0.40, 1); 
		this.triangle.display();  
		this.scene.popMatrix();
	 
	}
}

