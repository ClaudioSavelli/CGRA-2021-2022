import {CGFobject, CGFappearance, CGFtexture} from '../../../lib/CGF.js';
import { MyCilinder } from '../../3D_Shapes/MyCilinder.js';
import { MyCircle } from '../../2D_Shapes/MyCircle.js';



//It is just a closed cilinder 
export class MyWood extends CGFobject {
	constructor(scene, N) {
		//N is the number of triangles/sides/points 
		super(scene);
		this.scene = scene; 
		this.init(scene, N);
		this.createTextures(); 
	}
	
	init(scene, N) {
		this.cilinder = new MyCilinder(scene, N); 
		this.circle = new MyCircle(scene, N); 
	}

	createTextures() {
		this.defaultAppearance = new CGFappearance(this.scene);
		this.defaultAppearance.setAmbient(1, 1, 1, 1);
		this.defaultAppearance.setDiffuse(1, 1, 1, 1);
		this.defaultAppearance.setSpecular(0, 0, 0, 1);

		this.texture = new CGFtexture(this.scene, "./images/wood.jpg");
		this.defaultAppearance.setTexture(this.texture);
		this.defaultAppearance.setTextureWrap('REPEAT', 'REPEAT');
	}

	display(){
		this.defaultAppearance.apply();

		this.scene.pushMatrix(); 
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.scene.translate(0, -1, 0); 


		this.scene.pushMatrix(); 
		this.scene.scale(0.2, 2, 0.2); 
		this.cilinder.display(); 
		this.scene.popMatrix();

		
		this.scene.pushMatrix(); 
		this.scene.translate(0, 2, 0); 
		this.scene.scale(0.2, 1, 0.2);
		this.circle.display(); 
		this.scene.popMatrix(); 

		this.scene.pushMatrix(); 
		this.scene.translate(0, 0, 0); 
		this.scene.scale(0.2, 1, -0.2);
		this.circle.display(); 
		this.scene.popMatrix(); 
		

		this.scene.popMatrix();		 
	}

	updateBuffers() {
		this.initBuffers(); 
		this.initNormalVizBuffers(); 
	}
}

