import {CGFobject, CGFappearance} from '../../../lib/CGF.js';
import { MyCilinder } from '../../3D_Shapes/MyCilinder.js';
import { MyCircle } from '../../2D_Shapes/MyCircle.js';


//It is just a closed cilinder 
export class MyWheel extends CGFobject {
	constructor(scene, N) {
		//N is the number of triangles/sides/points 
		super(scene);
		this.scene = scene; 
		this.init(scene, N);
	}
	
	init(scene, N) {
		this.cilinder = new MyCilinder(scene, N); 
		this.circle = new MyCircle(scene, N); 
	}

	display(){
		this.scene.pushMatrix(); 
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.scene.translate(0, -0.1, 0); 
		
		this.scene.pushMatrix(); 
		this.scene.scale(0.75, 0.2, 0.75); 
		this.cilinder.display(); 
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.translate(0, 0.2, 0); 
		this.scene.scale(0.75, 1, 0.75);
		this.circle.display(); 
		this.scene.popMatrix(); 

		this.scene.pushMatrix(); 
		this.scene.scale(0.75, 1, -0.75);
		this.circle.display(); 
		this.scene.popMatrix(); 


		this.scene.popMatrix();		 
	}

	updateBuffers() {
		this.initBuffers(); 
		this.initNormalVizBuffers(); 
	}
}

