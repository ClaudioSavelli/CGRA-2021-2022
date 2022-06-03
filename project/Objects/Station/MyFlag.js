import {CGFobject, CGFappearance, CGFtexture} from '../../../lib/CGF.js';
import { MyCilinder } from '../../3D_Shapes/MyCilinder.js';
import { MyUnitCube } from '../../3D_Shapes/MyUnitCube.js';

export class MyFlag extends CGFobject {
	constructor(scene, complexity) {
		super(scene);
        this.scene = scene;
        this.complexity = complexity; 
        this.init(scene); 
        this.createTextures(scene); 
    }

    init(scene){
        this.cilinder = new MyCilinder(scene, this.complexity); 
        this.flag = new MyUnitCube(scene); 
    }

    createTextures(scene){
        this.black = new CGFappearance(scene);
        this.black.setAmbient(0.8, 0.5, 0, 1);
        this.black.setDiffuse(0.8, 0.5, 0, 1);
        this.black.setSpecular(0, 0, 0, 1.0);
        this.black.setEmission(0.5, 0.2, 0, 0.1);
        
        this.blackTexture = new CGFtexture(scene, "./images/metallic_black.jpg");
        this.black.setTexture(this.blackTexture);
        this.black.setTextureWrap('REPEAT', 'REPEAT');

        this.japanFlag = new CGFappearance(scene);
        this.japanFlag.setAmbient(0.5, 0.5, 0.5, 1);
        this.japanFlag.setDiffuse(0.5, 0.5, 0.5, 0.7);
        this.japanFlag.setSpecular(0.0, 0.0, 0.0, 1);
        this.japanFlag.setEmission(0.4, 0.4, 0.4, 0.5);

        this.japanFlagTexture = new CGFtexture(scene, "./images/japan_flag.png");
        this.japanFlag.setTexture(this.japanFlagTexture);
        this.japanFlag.setTextureWrap('REPEAT', 'REPEAT');

        this.doorMaterial = new CGFappearance(scene);
        this.doorMaterial.setAmbient(0.5, 0.5, 0.5, 1);
        this.doorMaterial.setDiffuse(0.5, 0.5, 0.5, 0.7);
        this.doorMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.doorMaterial.setEmission(1.0, 1.0, 1.0, 1.0);

        this.doorTexture = new CGFtexture(scene, "./images/glassdoor.webp");
        this.doorMaterial.setTexture(this.doorTexture);
        this.doorMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }


    display() {
        this.black.apply(); 

        this.scene.pushMatrix(); 
        this.scene.scale(0.2, 6.2, 0.2); 
        this.cilinder.display(); 
        this.scene.popMatrix(); 

        this.japanFlag.apply(); 

        this.scene.pushMatrix(); 
        this.scene.translate(1.5, 5, 0); 
        this.scene.scale(3, 2, 0); 
        this.flag.display(); 
        this.scene.popMatrix(); 
        
    }
}

