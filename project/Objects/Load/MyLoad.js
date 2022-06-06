import {CGFobject, CGFappearance, CGFtexture} from '../../../lib/CGF.js';
import { MyWood } from './MyWood.js';


export class MyLoad extends CGFobject {
	constructor(scene, complexity) {
		super(scene);
		this.scene = scene; 
		this.init(scene, complexity);
	}
	
	init(scene, complexity) {
		this.wood = new MyWood(scene, complexity); 
	}

	display(){
		{
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
}

