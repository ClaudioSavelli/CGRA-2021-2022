import {CGFobject, CGFappearance, CGFtexture} from '../../../lib/CGF.js';
import { MyWood } from './MyWood.js';


export class MyLoad extends CGFobject {
	constructor(scene, N) {
		super(scene);
		this.scene = scene; 
		this.init(scene, N);
	}
	
	init(scene, N) {
		this.wood = new MyWood(this.scene, N); 
		this.isTaken = false; 
	}

	display(){
		if (!this.isTaken){
			this.scene.pushMatrix(); 
			this.wood.display(); 
			this.scene.popMatrix();	

			this.scene.pushMatrix(); 
			this.scene.translate(0, 0, 0.4); 
			this.wood.display(); 
			this.scene.popMatrix();	
			
			this.scene.pushMatrix(); 
			this.scene.translate(0, 0.35, 0.2); 
			this.wood.display(); 
			this.scene.popMatrix();
		}
		
	}

	updateBuffers() {
		this.initBuffers(); 
		this.initNormalVizBuffers(); 
	}
}

