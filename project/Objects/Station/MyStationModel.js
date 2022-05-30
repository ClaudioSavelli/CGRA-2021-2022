import { MyStationModelPiece } from './MyStationModelPiece.js';
import {CGFobject, CGFappearance, CGFtexture} from '../../../lib/CGF.js';
import { MyQuad } from '../../2D_Shapes/MyQuad.js';

export class MyStationModel extends CGFobject {
	constructor(scene) {
		super(scene);
		this.scene = scene;
        this.modelSide = new MyStationModelPiece(scene, 1.0);
        this.modelCenter = new MyStationModelPiece(scene, 1.5);
        this.window = new MyQuad(scene);

        this.windowAppearance = new CGFappearance(scene);
        this.windowAppearance.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.windowAppearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.windowAppearance.setSpecular(0, 0, 0, 1.0);
        this.windowAppearance.setEmission(2.0, 2.0, 2.0, 2.0);
        this.windowTexture = new CGFtexture(scene, "./images/window.jpg");
        this.windowAppearance.setTexture(this.windowTexture);
        this.windowAppearance.setTextureWrap('REPEAT', 'REPEAT');
    }
    display() {
        this.displayCenter();
        this.displaySide(-55);
        this.displaySide(55);
        this.scene.setDefaultAppearance();
    }

    displayCenter() {
        this.scene.pushMatrix();
        
        this.scene.scale(2, 2, 2)

        this.modelCenter.display();

        
        this.scene.pushMatrix();
        this.scene.translate(-10, 0, 0);
        this.modelCenter.display();
        this.scene.popMatrix();

            

        this.scene.pushMatrix();
        this.scene.translate(10, 0, 0);
        this.modelCenter.display();
        this.scene.popMatrix();

        this.displayWindows();

        this.scene.popMatrix();
        /*
        this.scene.pushMatrix();
        this.scene.scale(2, 2, 2)
        this.modelCenter.display();

        this.scene.pushMatrix();
        this.scene.translate(-10, 0, 0);
        this.modelCenter.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(10, 0, 0);
        this.modelCenter.display();
        this.scene.popMatrix();

        this.scene.popMatrix();*/
    }

    displaySide(xTranslation) {
        this.scene.pushMatrix();
        this.scene.translate(xTranslation, -6.05, 0);
        this.scene.scale(1.8, 1.8, 1.8);
        this.modelSide.display();
        this.scene.popMatrix();
    }

    displayWindow(xTranslation) {
        this.scene.pushMatrix();
        this.scene.translate(xTranslation, 5, 10.1);
        this.scene.scale(3.0, 3.0, 3.0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.windowAppearance.apply();
        this.window.display();
        this.scene.popMatrix();
    }

    displayWindows() {
        this.displayWindow(0);
        this.displayWindow(-10);
        this.displayWindow(10);
    }
}

