import {CGFobject, CGFappearance, CGFtexture} from '../../../lib/CGF.js';
import { MyCilinder } from '../../3D_Shapes/MyCilinder.js';
import { MySphere } from "../../3D_Shapes/MySphere.js"; 
import { MyLoad } from '../Load/MyLoad.js';



export class MyCrane extends CGFobject {
	constructor(scene, alfa, beta, complexity) {
		super(scene);
                this.defaultAlfa = alfa; 
                this.defaultBeta = beta; 
                this.alfa = this.defaultAlfa; 
                this.beta = this.defaultBeta; 
		this.scene = scene;
                this.isEmpty = true; 
                 
                this.createTextures(); 
		this.init(scene, complexity);
	}
	
	init(scene, complexity) {
		this.mainAxis = new MyCilinder(scene, complexity); 
		this.secondaryAxis = new MyCilinder(scene, complexity); 
                this.cable = new MyCilinder(scene, complexity); 
                this.sphere = new MySphere(scene, complexity, complexity); 
                this.load = new MyLoad(scene, complexity); 
	}

        createTextures() {
                this.metalTexture = new CGFappearance(this.scene);
                this.metalTexture.setAmbient(3, 3, 3, 1);
		this.metalTexture.setDiffuse(6, 6, 6, 1);
		this.metalTexture.setSpecular(0, 0, 0, 1);
		this.metalTexture.setShininess(500);
        
                this.texture = new CGFtexture(this.scene, "./images/steel.jpg");
                this.metalTexture.setTexture(this.texture);
                this.metalTexture.setTextureWrap('REPEAT', 'REPEAT');

                this.blackTexture = new CGFappearance(this.scene);
                this.blackTexture.setAmbient(3, 3, 3, 1);
		this.blackTexture.setDiffuse(6, 6, 6, 1);
		this.blackTexture.setSpecular(0, 0, 0, 1);
		this.blackTexture.setShininess(500);
        
                this.texture = new CGFtexture(this.scene, "./images/black.png");
                this.blackTexture.setTexture(this.texture);
                this.blackTexture.setTextureWrap('REPEAT', 'REPEAT');

                this.redTexture = new CGFappearance(this.scene);
                this.redTexture.setAmbient(3, 3, 3, 1);
		this.redTexture.setDiffuse(6, 6, 6, 1);
		this.redTexture.setSpecular(0, 0, 0, 1);
		this.redTexture.setShininess(500);
        
                this.texture = new CGFtexture(this.scene, "./images/metallic_red.jpg");
                this.redTexture.setTexture(this.texture);
                this.redTexture.setTextureWrap('REPEAT', 'REPEAT');
            }

	display(){

        this.metalTexture.apply();

        this.scene.pushMatrix(); 
        this.scene.translate(0, 0, -1.4); 
        this.scene.rotate(this.alfa, 0, 1, 0); 

        //MainAxis
        this.scene.pushMatrix(); 
        this.scene.translate(0, 3.5, 0); 
        this.scene.scale(0.4, 2, 0.4); 
        this.mainAxis.display();
        this.scene.popMatrix(); 

        //secondaryAxis
        this.scene.pushMatrix(); 
        this.scene.translate(0, 5.5, 0);
        this.scene.rotate(this.beta,1,0,0);  
        this.scene.scale(0.2, 5, 0.2); 
        this.secondaryAxis.display();
        this.scene.popMatrix(); 

        this.redTexture.apply();

        //Sphere 
        this.scene.pushMatrix(); 
        this.scene.translate(0, 5.5, 0); 
        this.scene.scale(0.5, 0.5, 0.5); 
        this.sphere.display();
        this.scene.popMatrix(); 

        this.blackTexture.apply();

        //cable
        this.scene.pushMatrix(); 
        //this.scene.translate(0, 5*Math.sin(this.beta-this.defaultBeta)+3, 2*Math.sin(this.beta-this.defaultBeta)-4.1);
        this.scene.translate(0,5*Math.cos(this.beta)+0.4,5*Math.sin(this.beta)+0.2); 
        this.scene.scale(0.1, 5, 0.1); 
        this.cable.display();
        this.scene.popMatrix();

         
        //load 
	if(!this.isEmpty){
		this.scene.pushMatrix();  
                this.scene.translate(0,5*Math.cos(this.beta),5*Math.sin(this.beta));		this.load.display(); 
		this.scene.popMatrix();		 
	}

        this.scene.popMatrix(); 

	}

        turn(value){
                if(this.alfa<=-1.6 && value < 0){
                        return; 
                } else if (this.alfa>=1.6 && value > 0){
                        return; 
                }
                this.alfa += value; 
        }

        tilt(value){
                if(this.beta<=-1.4 && value<0){
                        return;   
                } else if (this.beta>=-0.5 && value>0){
                        return;
                }
                this.beta += value; 
        }

        reset(){
                console.log("reset"); 
                this.alfa = this.defaultAlfa; 
                this.beta = this.defaultBeta; 
        }

	updateBuffers() {
		this.initBuffers(); 
		this.initNormalVizBuffers(); 
	}
}

