import { MyTriangularPrism } from '../../3D_Shapes/MyTriangularPrism.js';
import { MyUnitCube } from '../../3D_Shapes/MyUnitCube.js';
import {CGFobject, CGFappearance, CGFtexture} from '../../../lib/CGF.js';
import { MyQuad } from '../../2D_Shapes/MyQuad.js';

export class MyStationModelPiece extends CGFobject {
	constructor(scene, roofHeightScaleFactor) {
		super(scene);
        this.scene = scene;
        this.roofHeightScaleFactor = roofHeightScaleFactor;
        this.init(scene); 
        this.createTextures(scene); 
        this.initBuffers(); 
    }

    init(scene){
        this.prism = new MyTriangularPrism(scene);
        this.cube = new MyUnitCube(scene);
        this.door = new MyQuad(scene);
    }

    createTextures(scene){
        this.roofMaterial = new CGFappearance(scene);
        /*this.roofMaterial.setAmbient(0.8, 0.4, 0.1, 1.0);
        this.roofMaterial.setDiffuse(0.8, 0.4, 0.1, 1.0);
        this.roofMaterial.setSpecular(0, 0, 0, 1.0);
        this.roofMaterial.setEmission(0.8, 0.4, 0.1, 0.3);
        */

        this.roofMaterial.setAmbient(0.8, 0.5, 0, 1);
        this.roofMaterial.setDiffuse(0.8, 0.5, 0, 1);
        this.roofMaterial.setSpecular(0, 0, 0, 1.0);
        //this.roofMaterial.setEmission(0.8, 0.4, 0.1, 0.1);
        this.roofMaterial.setEmission(0.5, 0.2, 0, 0.1);
        
        /*this.roofMaterial.setAmbient(0.9, 0.3, 0, 1);
        this.roofMaterial.setDiffuse(0.9, 0.3, 0, 1);
        this.roofMaterial.setSpecular(0, 0, 0, 1.0);
        //this.roofMaterial.setEmission(0.8, 0.4, 0.1, 0.1);
        this.roofMaterial.setEmission(0.5, 0.2, 0, 0.1);*/
        this.roofTexture = new CGFtexture(scene, "./images/roof.jpg");
        this.roofMaterial.setTexture(this.roofTexture);
        this.roofMaterial.setTextureWrap('REPEAT', 'REPEAT');


        this.wallMaterial = new CGFappearance(scene);
        /*this.wallMaterial.setAmbient(0.6, 0.5, 0.6, 0.8);
        this.wallMaterial.setDiffuse(0.6, 0.5, 0.6, 0.7);
        this.wallMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.wallMaterial.setEmission(0.5, 0.5, 0.5, 0.5);
        */
       
        this.wallMaterial.setAmbient(0.5, 0.5, 0.5, 1);
        this.wallMaterial.setDiffuse(0.5, 0.5, 0.5, 0.7);
        this.wallMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.wallMaterial.setEmission(0.4, 0.4, 0.4, 0.5);
        this.wallTexture = new CGFtexture(scene, "./images/brickwallwhite.webp");
        this.wallMaterial.setTexture(this.wallTexture);
        this.wallMaterial.setTextureWrap('REPEAT', 'REPEAT');


        this.doorMaterial = new CGFappearance(scene);
        this.doorMaterial.setAmbient(0.5, 0.5, 0.5, 1);
        this.doorMaterial.setDiffuse(0.5, 0.5, 0.5, 0.7);
        this.doorMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.doorMaterial.setEmission(1.0, 1.0, 1.0, 1.0);
        this.doorTexture = new CGFtexture(scene, "./images/glassdoor.webp");
        this.doorMaterial.setTexture(this.doorTexture);
        this.doorMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }


    display() {/*
        this.scene.pushMatrix();

        this.scene.scale(1.0, 0.5, 1.0)
        this.scene.pushMatrix()
        this.scene.translate(0, 10, 0);
        this.scene.scale(1.0, 1.5, 1.0);
        this.roofMaterial.apply();
        this.prism.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(20, 20, 20);
        this.wallMaterial.apply()
        this.cube.display();
        this.scene.popMatrix();

        this.scene.popMatrix();*/

        this.scene.pushMatrix();

        this.scene.scale(1.0, 0.5, 1.0)
        this.scene.pushMatrix()
        //this.scene.translate(0, 10*factor*5-40*factor, 0);
        //this.scene.scale(1.0, 1.5*factor*5, 1.0);
        this.scene.translate(0, 10*this.roofHeightScaleFactor, 0);
        this.scene.scale(1.0, 1.5*this.roofHeightScaleFactor, 1.0);
        this.roofMaterial.apply();
        this.prism.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(20, 20*this.roofHeightScaleFactor, 20);
        this.wallMaterial.apply();
        this.cube.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -5.0*this.roofHeightScaleFactor+2.798, 10.1);
        // -5.002 ± 0.04028
        //this.scene.translate(0, );
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(5.5, 20.0, 5.5);
        this.doorMaterial.apply();
        this.door.display();
        this.scene.popMatrix();

    }
}

