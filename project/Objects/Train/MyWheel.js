import {CGFobject, CGFappearance, CGFtexture} from '../../../lib/CGF.js';
import { MyCilinder } from '../../3D_Shapes/MyCilinder.js';
import { MyCircle } from '../../2D_Shapes/MyCircle.js';


//It is just a closed cilinder 
export class MyWheel extends CGFobject {
	constructor(scene, complexity) {
		super(scene);
		this.scene = scene; 
		this.init(scene, complexity);
		this.createTextures(); 
	}
	
	init(scene, complexity) {
		this.cilinder = new MyCilinder(scene, complexity); 
		this.circle = new MyCircle(scene, complexity); 

		this.wheelRadius = 0.75; 
		this.wheelCircumference = 2*Math.PI*this.wheelRadius; 
		this.alfa = 0; 
	}

	createTextures() {
		this.wheelTexture = new CGFappearance(this.scene);
        this.wheelTexture.setAmbient(0.5, 0.5, 0.5, 1);
        this.wheelTexture.setDiffuse(1, 1, 1, 1);
        this.wheelTexture.setSpecular(0, 0, 0, 1);
        this.wheelTexture.setShininess(120);
        
        this.texture = new CGFtexture(this.scene, "./images/wheel.png");
        this.wheelTexture.setTexture(this.texture);
        this.wheelTexture.setTextureWrap('REPEAT', 'REPEAT');

		this.black = new CGFappearance(this.scene);
        this.black.setAmbient(0.5, 0.5, 0.5, 1);
        this.black.setDiffuse(1, 1, 1, 1);
        this.black.setSpecular(0, 0, 0, 1);
        this.black.setShininess(120);
        
        this.texture = new CGFtexture(this.scene, "./images/metallic_black.jpg");
        this.black.setTexture(this.texture);
        this.black.setTextureWrap('REPEAT', 'REPEAT');


	}
	

	display(){
		this.scene.pushMatrix(); 
		this.scene.rotate(this.alfa, 1, 0, 0); 
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.scene.translate(0, -0.1, 0); 
		
		this.black.apply(); 

		this.scene.pushMatrix(); 
		this.scene.scale(this.wheelRadius, 0.2, this.wheelRadius); 
		this.cilinder.display(); 
		this.scene.popMatrix();

		this.wheelTexture.apply(); 

		this.scene.pushMatrix(); 
		this.scene.translate(0, 0.2, 0); 
		this.scene.scale(this.wheelRadius, 1, this.wheelRadius);
		this.circle.display(); 
		this.scene.popMatrix(); 

		this.scene.pushMatrix(); 
		this.scene.scale(this.wheelRadius, 1, -this.wheelRadius);
		this.circle.display(); 
		this.scene.popMatrix(); 


		this.scene.popMatrix();		 
	}

	rotation(velocity){
		this.alfa += velocity / this.wheelCircumference;  
	}
}

