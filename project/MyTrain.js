import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyCilinder } from './MyCilinder.js';
import { MyCircle } from './MyCircle.js';
import { MySphere } from "./MySphere.js"; 
import { MyUnitCube } from "./MyUnitCube.js"; 
import { MyWheel } from "./MyWheel.js";


//It is just a closed cilinder 
export class MyTrain extends CGFobject {
	constructor(scene, N) {
		//N is the number of triangles/sides/points 
		super(scene);
		this.scene = scene; 
		this.init(scene, N);
	}
	
	init(scene, N) {
		this.cube = new MyUnitCube(scene); 
		this.cilinder = new MyCilinder(scene, N); 
		this.circle = new MyCircle(scene, N);
		this.sphere = new MySphere(scene, N, N); 
		this.wheel = new MyWheel(scene, N); 

                this.createTextures(); 
	}

        createTextures() {
                this.appearance = new CGFappearance(this.scene);
                this.appearance.setAmbient(1, 1, 1, 1);
                this.appearance.setDiffuse(1, 1, 1, 1);
                this.appearance.setSpecular(0, 0, 0, 1);
                this.appearance.setShininess(120);
        
                //this.texture = new CGFtexture(this.scene, "./images/tracks.png");
                //this.appearance.setTexture(this.texture);
                //this.appearance.setTextureWrap('REPEAT', 'REPEAT');
            }

	display(){

        //base parallelepiped
        this.scene.pushMatrix(); 
        this.scene.translate(0, 1.5, 0); 
        this.scene.scale(2.5, 1, 7.5); 
        this.cube.display();
        this.scene.popMatrix(); 

        //front left wheel  
        this.scene.pushMatrix(); 
        this.scene.translate(1.35, 0.75, 3); 
        this.wheel.display();
        this.scene.popMatrix();  

        //front right wheel  
        this.scene.pushMatrix(); 
        this.scene.translate(-1.35, 0.75, -3); 
        this.wheel.display();
        this.scene.popMatrix(); 

        //back left wheel  
        this.scene.pushMatrix(); 
        this.scene.translate(1.35, 0.75, -3); 
        this.wheel.display();
        this.scene.popMatrix();  

        //back right wheel  
        this.scene.pushMatrix(); 
        this.scene.translate(-1.35, 0.75, 3); 
        this.wheel.display();
        this.scene.popMatrix(); 

        //cabin 
        this.scene.pushMatrix(); 
        this.scene.translate(0, 3, -1.4); 
        this.scene.scale(2, 2.5, 1.8); 
        this.cube.display();
        this.scene.popMatrix(); 

        //cylindrical body 
        this.scene.pushMatrix(); 
        this.scene.translate(0, 2.8, -0.5); 
        this.scene.rotate(Math.PI/2, 1, 0, 0); 
        this.scene.scale(0.9, 3.5, 0.9); 
        this.cilinder.display();
        this.scene.popMatrix(); 
        
        this.scene.pushMatrix();
        this.scene.translate(0, 2.8, 3); 
        this.scene.scale(0.9, 0.9, 0.2); 
        this.sphere.display();  
        this.scene.popMatrix(); 

        //chimney 
        this.scene.pushMatrix(); 
        this.scene.translate(0, 3.5, 2.5); 
        this.scene.scale(0.2, 0.7, 0.2); 
        this.cilinder.display();
        this.scene.popMatrix(); 
	 
        this.appearance.apply(); 
	}

	updateBuffers() {
		this.initBuffers(); 
		this.initNormalVizBuffers(); 
	}
}

