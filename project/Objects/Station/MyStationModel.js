import { MyStationModelPiece } from './MyStationModelPiece.js';
import {CGFobject, CGFappearance, CGFtexture} from '../../../lib/CGF.js';
import { MyQuad } from '../../2D_Shapes/MyQuad.js';
import { MyUnitCube } from '../../3D_Shapes/MyUnitCube.js';
import { MyLoad } from '../Load/MyLoad.js';
import { MyFlag } from './MyFlag.js';
import { MyAwning } from './MyAwning.js';

export class MyStationModel extends CGFobject {
	constructor(scene, angle, x, z, hasLoad, side) {
		super(scene);
		this.scene = scene;
        this.angle = angle;
        this.x = x;
        this.z = z;
        this.hasLoad = hasLoad;
        this.side = side;
        this.complexity = 30; 
        this.init(scene); 
        this.createTextures(scene); 
    }

    init(scene) {
        this.modelSide = new MyStationModelPiece(scene, 1.0);
        this.modelCenter = new MyStationModelPiece(scene, 1.5);
        this.window = new MyQuad(scene);
        this.base = new MyUnitCube(scene);
        this.load = new MyLoad(scene, this.complexity);
        this.flag = new MyFlag(scene, this.complexity);
        this.awning = new MyAwning(scene, this.complexity);
    }

    createTextures(scene){
        this.windowAppearance = new CGFappearance(scene);
        this.windowAppearance.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.windowAppearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.windowAppearance.setSpecular(0, 0, 0, 1.0);
        this.windowAppearance.setEmission(2.0, 2.0, 2.0, 2.0);
        this.windowTexture = new CGFtexture(scene, "./images/window.jpg");
        this.windowAppearance.setTexture(this.windowTexture);
        this.windowAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.baseAppearance = new CGFappearance(scene);
        this.baseAppearance.setAmbient(0.3, 0.3, 0.3, 0.5);
        this.baseAppearance.setDiffuse(0.3, 0.3, 0.3, 0.5);
        this.baseAppearance.setSpecular(0, 0, 0, 1.0);
        this.baseAppearance.setEmission(0.2, 0.1, 0.1, 0.2);
        this.baseTexture = new CGFtexture(scene, "./images/floor.webp");
        this.baseAppearance.setTexture(this.baseTexture);
        this.baseAppearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        this.scene.pushMatrix()

        const middleX = 0;
        const middleZ = 10.5; //9
        const middleXStart = Math.cos(-this.angle)*middleX + Math.sin(-this.angle)*middleZ
        const middleZStart = -Math.sin(-this.angle)*middleX + Math.cos(-this.angle)*middleZ
        
        this.scene.translate(this.x - middleXStart, 3.5, this.z - middleZStart)
        this.scene.rotate(-this.angle, 0, 1, 0);
        this.scene.scale(0.2, 0.2, 0.2);

            this.scene.pushMatrix();
            this.scene.translate(0, 3.5, -6.0);
            this.displayCenter();
            this.displaySide(-55);
            this.displaySide(55);
            this.scene.popMatrix();
            this.baseAppearance.apply();
            this.displayBase();

            if (this.hasLoad) {
                this.scene.pushMatrix();
                this.scene.translate(-8, -11, 30)
                this.scene.scale(5,5,5);
                this.load.display();
                this.scene.popMatrix(); 
            } 

            this.scene.pushMatrix(); 
            this.scene.translate(70, -12, 30); 
            this.scene.scale(5,5,5)
            this.flag.display(); 
            this.scene.popMatrix(); 

            this.displayAwning();

        this.scene.popMatrix();

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

    displayBase() {
        this.scene.pushMatrix();
        this.scene.translate(0, -14.5, 0);
        //this.scene.scale(170.0, 5.0, 60.0);
        this.scene.scale(170.0, 5.0, 80.0);
        this.base.display();
        this.scene.popMatrix();
    }

    displayAwning() {
        this.scene.pushMatrix();

        this.scene.translate(0, -15, 19);
        this.scene.scale(4.0, 4.5, 5);
        this.awning.display();
        this.scene.popMatrix();
    }
}

