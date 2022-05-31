import {CGFobject, CGFappearance, CGFtexture} from '../../../lib/CGF.js';
import { MyCilinder } from '../../3D_Shapes/MyCilinder.js';
import { MyCircle } from '../../2D_Shapes/MyCircle.js';
import { MySphere } from "../../3D_Shapes/MySphere.js"; 
import { MyUnitCube } from "../../3D_Shapes/MyUnitCube.js"; 
import { MyWheel } from "./MyWheel.js";
import { MyCrane } from './MyCrane.js';
import { MyContainer } from './MyContainer.js';

export class MyTrain extends CGFobject {
	constructor(scene, complexity) {
		//N is the number of triangles/sides/points 
		super(scene);
		this.scene = scene; 
                this.createTextures(); 
		this.init(scene, complexity);
	}
	
	init(scene, complexity) {
		this.cube = new MyUnitCube(scene); 
		this.cilinder = new MyCilinder(scene, complexity); 
		this.circle = new MyCircle(scene, complexity);
		this.sphere = new MySphere(scene, complexity, complexity); 
		this.wheel = new MyWheel(scene, complexity); 
                this.crane = new MyCrane(scene, 0, -1, complexity); 
                this.container = new MyContainer(scene, complexity, true); 
	}

        createTextures() {
                this.redTexture = new CGFappearance(this.scene);
                this.redTexture.setAmbient(3, 3, 3, 1);
		this.redTexture.setDiffuse(6, 6, 6, 1);
		this.redTexture.setSpecular(0, 0, 0, 1);
		this.redTexture.setShininess(500);
        
                this.texture = new CGFtexture(this.scene, "./images/metallic_red.jpg");
                this.redTexture.setTexture(this.texture);
                this.redTexture.setTextureWrap('REPEAT', 'REPEAT');

                this.defaultTexture = new CGFappearance(this.scene);
                this.defaultTexture.setAmbient(3, 3, 3, 1);
		this.defaultTexture.setDiffuse(6, 6, 6, 1);
		this.defaultTexture.setSpecular(0, 0, 0, 1);
		this.defaultTexture.setShininess(500);
        
                this.texture = new CGFtexture(this.scene, "./images/default.png");
                this.defaultTexture.setTexture(this.texture);
                this.defaultTexture.setTextureWrap('REPEAT', 'REPEAT');
            }

	display(){

        this.redTexture.apply();


        //base parallelepiped
        this.scene.pushMatrix(); 
        this.scene.translate(0, 1.5, 0); 
        this.scene.scale(2.5, 1, 7.5); 
        this.cube.display();
        this.scene.popMatrix(); 

        //cabin 
        this.scene.pushMatrix(); 
        this.scene.translate(0, 3, -1.4); 
        this.scene.scale(2, 2.5, 1.8); 
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

        this.crane.display(); 
        this.container.display(); 
	}

	updateBuffers() {
		this.initBuffers(); 
		this.initNormalVizBuffers(); 
	}
}

