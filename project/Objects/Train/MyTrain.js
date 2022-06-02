import {CGFobject, CGFappearance, CGFtexture} from '../../../lib/CGF.js';
import { MyCilinder } from '../../3D_Shapes/MyCilinder.js';
import { MyCircle } from '../../2D_Shapes/MyCircle.js';
import { MySphere } from "../../3D_Shapes/MySphere.js"; 
import { MyUnitCube } from "../../3D_Shapes/MyUnitCube.js"; 
import { MyWheel } from "./MyWheel.js";
import { MyCrane } from './MyCrane.js';
import { MyContainer } from './MyContainer.js';
import { MySmoke } from './MySmoke.js';

export class MyTrain extends CGFobject {
	constructor(scene, complexity, hasLoad) {
		//N is the number of triangles/sides/points 
		super(scene);
		this.scene = scene; 
                this.createTextures(); 
		this.init(scene, complexity, hasLoad);
	}
	
	init(scene, complexity, hasLoad) {
		this.cube = new MyUnitCube(scene); 
		this.cilinder = new MyCilinder(scene, complexity); 
		this.circle = new MyCircle(scene, complexity);
		this.sphere = new MySphere(scene, complexity, complexity); 
		this.wheel = new MyWheel(scene, complexity); 
                this.light = new MyWheel(scene, complexity); 

                this.crane = new MyCrane(scene, 0, -1, complexity); 
                this.container = new MyContainer(scene, complexity, hasLoad);
                this.smoke = new MySmoke(scene, complexity);  
	}

        createTextures() {
                this.red = new CGFappearance(this.scene);
                this.red.setAmbient(1, 1, 1, 1);
                this.red.setDiffuse(1, 1, 1, 1);
                this.red.setSpecular(0, 0, 0, 1);
                this.red.setShininess(120);
        
                this.texture = new CGFtexture(this.scene, "./images/metallic_red.jpg");
                this.red.setTexture(this.texture);
                this.red.setTextureWrap('REPEAT', 'REPEAT');
            }

	display(){

        this.red.apply();


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

        //objects
        this.crane.display(); 
        this.container.display(); 
        this.smoke.display();
	}

	updateBuffers() {
		this.initBuffers(); 
		this.initNormalVizBuffers(); 
	}
}

