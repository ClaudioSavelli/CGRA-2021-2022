import {CGFobject, CGFappearance, CGFtexture} from '../../../lib/CGF.js';
import { MyCilinder } from '../../3D_Shapes/MyCilinder.js';
import { MyUnitCube } from '../../3D_Shapes/MyUnitCube.js';

export class MyAwning extends CGFobject {
	constructor(scene, complexity) {
		super(scene);
        this.scene = scene;
        this.init(scene, complexity);
        this.createTextures(scene);
    }

    init(scene, complexity){        
        this.cover = new MyUnitCube(scene);
        this.pillar = new MyCilinder(scene, complexity);
    }

    createTextures(scene){
        this.roofMaterial = new CGFappearance(scene);

        this.roofMaterial.setAmbient(0.9, 0.5, 0, 1);
        this.roofMaterial.setDiffuse(0.9, 0.5, 0, 1);
        this.roofMaterial.setSpecular(0, 0, 0, 1.0);
        this.roofMaterial.setEmission(0.5, 0.2, 0, 0.5);
        this.roofTexture = new CGFtexture(scene, "./images/roof.jpg");
        this.roofMaterial.setTexture(this.roofTexture);
        this.roofMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.pillarMaterial = new CGFappearance(scene);
        this.roofMaterial.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.roofMaterial.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.roofMaterial.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.roofMaterial.setEmission(0.5, 0.2, 0, 0.1);

    }


    display() {
        this.displayCover();
        this.displayPillars();
    }

    displayCover() {
        this.scene.pushMatrix();
        this.scene.translate(0, 5, 0);
        this.scene.rotate(0.1, 1, 0, 0);
        this.scene.scale(20, 0.1, 2.0);
        this.roofMaterial.apply();
        this.cover.display();
        this.scene.popMatrix();
    }

    displayPillars() {
        this.displayPillar(-6);
        this.displayPillar(6);
        this.displayPillar(-2);
        this.displayPillar(2);
    }

    displayPillar(xDisplace) {
        this.scene.pushMatrix();
        this.scene.translate(xDisplace, 0, 0.28);
        this.scene.scale(0.12, 5.0, 0.12);
        this.pillarMaterial.apply();
        this.pillar.display();
        this.scene.popMatrix();
    }
}

