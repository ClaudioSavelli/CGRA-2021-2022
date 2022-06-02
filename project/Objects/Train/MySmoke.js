import {CGFobject, CGFappearance, CGFtexture} from '../../../lib/CGF.js';
import { MySphere } from '../../3D_Shapes/MySphere.js';


export class MySmoke extends CGFobject {
	constructor(scene, complexity) {
		super(scene);
		this.scene = scene; 
		this.init(scene, complexity); 
		this.createTextures(); 
	}

	init(scene, complexity){
		this.sphere = new MySphere(scene, complexity, complexity); 
		
		this.velocity = 0.002;
		this.maxHeight = 5;
		this.flag = 0; 
		this.shift = 1; 

		this.defaultDimension = 0.2; 
		this.dimension = this.defaultDimension;
		this.dimension2 = this.defaultDimension + this.shift*0.05; 
		this.dimension3 = this.defaultDimension + this.shift*0.08; 
		
		this.defaultY = 4.4; 
		this.y = this.defaultY;
		this.y2 = this.defaultY + this.shift*Math.cos(45); 
		this.y3 = this.defaultY + this.shift*2*Math.cos(45); 


		this.defaultZ = 2.5; 
		this.z = this.defaultZ;
		this.z2 = this.defaultZ - this.shift*Math.sin(45);  
		this.z3 = this.defaultZ - this.shift*2*Math.sin(45);  

	}

	createTextures() {
		this.defaultTexture = new CGFappearance(this.scene);
		this.defaultTexture.setAmbient(5, 5, 5, 1);
		this.defaultTexture.setDiffuse(1, 1, 1, 1);
		this.defaultTexture.setSpecular(0, 0, 0, 1);
		this.defaultTexture.setShininess(100);

		this.texture = new CGFtexture(this.scene, "./images/smoke.jpg");
		this.defaultTexture.setTexture(this.texture);
		this.defaultTexture.setTextureWrap('REPEAT', 'REPEAT');
	}

	update(t){
		
		if(this.flag == 0){
			this.flag = 1; 
			this.initialTime = t; 
		}
		
		this.y += (this.velocity*(t-this.initialTime))*Math.cos(45); 
		this.z -= (this.velocity*(t-this.initialTime))*Math.sin(45); 
		this.dimension += 0.005; 

		this.y2 += (this.velocity*(t-this.initialTime))*Math.cos(45); 
		this.z2 -= (this.velocity*(t-this.initialTime))*Math.sin(45); 
		this.dimension2 += 0.005; 

		this.y3 += (this.velocity*(t-this.initialTime))*Math.cos(45); 
		this.z3 -= (this.velocity*(t-this.initialTime))*Math.sin(45); 
		this.dimension3 += 0.005; 

		if(this.y >= this.maxHeight){
			this.y = this.defaultY; 
			this.z = this.defaultZ; 
			this.dimension = this.defaultDimension; 
		}
		if(this.y2 >= this.maxHeight+0.3){
			this.y2 = this.defaultY; 
			this.z2 = this.defaultZ; 
			this.dimension2 = this.defaultDimension; 
		}
		if(this.y3 >= this.maxHeight+0.6){
			this.y3 = this.defaultY; 
			this.z3 = this.defaultZ; 
			this.dimension3 = this.defaultDimension; 
		}

		this.initialTime = t;
	}

	display(){
		this.defaultTexture.apply(); 

		this.scene.pushMatrix(); 
		this.scene.translate(0, this.y, this.z);
		this.scene.scale(this.dimension,this.dimension,this.dimension); 
		this.sphere.display(); 
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.translate(0, this.y2, this.z2);
		this.scene.scale(this.dimension2,this.dimension2,this.dimension2); 
		this.sphere.display(); 
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.translate(0, this.y3, this.z3);
		this.scene.scale(this.dimension3,this.dimension3,this.dimension3); 
		this.sphere.display(); 
		this.scene.popMatrix();
	}
}

