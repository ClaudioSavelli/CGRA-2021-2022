import {CGFobject, CGFappearance, CGFtexture} from '../../../lib/CGF.js';
import { MyCilinder } from '../../3D_Shapes/MyCilinder.js';
import { MyCircle } from '../../2D_Shapes/MyCircle.js';
import { MySphere } from "../../3D_Shapes/MySphere.js"; 
import { MyUnitCube } from "../../3D_Shapes/MyUnitCube.js"; 
import { MyWheel } from "./MyWheel.js";


export class MyCrane extends CGFobject {
	constructor(scene, alfa, beta, complexity) {
		super(scene);
                this.defaultAlfa = alfa; 
                this.defaultBeta = beta; 
                this.alfa = this.defaultAlfa; 
                this.beta = this.defaultBeta; 
		this.scene = scene;
                 
                this.createTextures(); 
		this.init(scene, complexity);
	}
	
	init(scene, complexity) {
		this.mainAxis = new MyCilinder(scene, complexity); 
		this.secondaryAxis = new MyCilinder(scene, complexity); 
                this.cable = new MyCilinder(scene, complexity); 
                this.sphere = new MySphere(scene, complexity, complexity); 
	}

        createTextures() {
                this.defaultAppearance = new CGFappearance(this.scene);
                this.defaultAppearance.setAmbient(1, 1, 1, 1);
                this.defaultAppearance.setDiffuse(1, 1, 1, 1);
                this.defaultAppearance.setSpecular(0, 0, 0, 1);
                this.defaultAppearance.setShininess(120);
        
                this.texture = new CGFtexture(this.scene, "./images/default.png");
                this.defaultAppearance.setTexture(this.texture);
                this.defaultAppearance.setTextureWrap('REPEAT', 'REPEAT');
            }

	display(){

        this.defaultAppearance.apply();

        this.scene.pushMatrix(); 
        this.scene.translate(0, 0, -1.4); 
        this.scene.rotate(this.alfa, 0, 1, 0); 

        //MainAxis
        this.scene.pushMatrix(); 
        this.scene.translate(0, 3.5, 0); 
        this.scene.scale(0.4, 2, 0.4); 
        this.mainAxis.display();
        this.scene.popMatrix(); 

        //Sphere 
        this.scene.pushMatrix(); 
        this.scene.translate(0, 5.5, 0); 
        this.scene.scale(0.5, 0.5, 0.5); 
        this.sphere.display();
        this.scene.popMatrix(); 

        //secondaryAxis
        this.scene.pushMatrix(); 
        this.scene.translate(0, 5.5, 0);
        this.scene.rotate(this.beta,1,0,0);  
        this.scene.scale(0.2, 5, 0.2); 
        this.secondaryAxis.display();
        this.scene.popMatrix(); 

        //cable
        this.scene.pushMatrix(); 
        //this.scene.translate(0, 5*Math.sin(this.beta-this.defaultBeta)+3, 2*Math.sin(this.beta-this.defaultBeta)-4.1);
        this.scene.translate(0,5*Math.cos(this.beta)+0.4,5*Math.sin(this.beta)+0.2); 
        this.scene.scale(0.1, 5, 0.1); 
        this.cable.display();
        this.scene.popMatrix();

        this.scene.popMatrix(); 

	}

        turn(value){
                if(this.alfa<=-2.3 && value < 0){
                        return; 
                } else if (this.alfa>=2.3 && value > 0){
                        return; 
                }
                this.alfa += value; 
        }

        tilt(value){
                if(this.beta<=-1.6 && value<0){
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

