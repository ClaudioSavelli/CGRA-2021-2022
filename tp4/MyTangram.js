import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.scene = scene;
		this.tangramTex = new CGFappearance(this.scene);
        this.tangramTex.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangramTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangramTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangramTex.setShininess(10.0);
        this.tangramTex.loadTexture('images/tangram.png');
        this.tangramTex.setTextureWrap('REPEAT', 'REPEAT');

		this.init(scene);
	}

	init(scene) {
		this.diamond = new MyDiamond(scene);
    	this.triangle = new MyTriangle(scene);
    	this.para = new MyParallelogram(scene);
    	this.triangleSmallCobalt = new MyTriangleSmall(scene, 'cobalt');
		this.triangleSmallRed = new MyTriangleSmall(scene, 'red'); 
    	this.triangleBigBlue = new MyTriangleBig(scene, 'blue');
    	this.triangleBigOrange = new MyTriangleBig(scene, 'orange');

		this.diamondRotation =  [
			Math.cos(Math.PI/9), -Math.sin(Math.PI/9), 0, 0,
			Math.sin(Math.PI/9), Math.cos(Math.PI/9), 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		  ];

		 /* 
		  this.materialR = new CGFappearance(this.scene);
		  this.materialR.setAmbient(0.5, 0, 0, 1.0);
		  this.materialR.setDiffuse(0.6, 0, 0, 1.0);
		  this.materialR.setSpecular(1, 0, 0, 1.0);
		  this.materialR.setShininess(10.0);
		  this.tangramTex.loadTexture('images/tangram.png');
          this.tangramTex.setTextureWrap('REPEAT', 'REPEAT');
  
		  this.materialPurple = new CGFappearance(this.scene);
		  this.materialPurple.setAmbient(0.47, 0.32, 0.66, 1.0);
		  this.materialPurple.setDiffuse(0.47, 0.32, 0.66, 1.0);
		  this.materialPurple.setSpecular(0.47, 0.32, 0.66, 1.0);
		  this.materialPurple.setShininess(10.0);
  
		  this.materialB = new CGFappearance(this.scene);
		  this.materialB.setAmbient(0, 0, 0.6, 1.0);
		  this.materialB.setDiffuse(0, 0., 0.7, 1.0);
		  this.materialB.setSpecular(0, 0, 1, 1.0);
		  this.materialB.setShininess(10.0);
  
		  this.materialOrange = new CGFappearance(this.scene);
		  this.materialOrange.setAmbient(0.5, 0.33, 0, 1.0);
		  this.materialOrange.setDiffuse(0.5, 0.33, 0, 1.0);
		  this.materialOrange.setSpecular(1, 0.65, 0, 1.0);
		  this.materialOrange.setShininess(10.0);
  
		  this.materialYellow = new CGFappearance(this.scene);
		  this.materialYellow.setAmbient(0.5, 0.5, 0, 1.0);
		  this.materialYellow.setDiffuse(0.5, 0.5, 0, 1.0);
		  this.materialYellow.setSpecular(1, 1, 0, 1.0);
		  this.materialYellow.setShininess(10.0);

		  this.setAmbient(1, 1, 0.05, 1.0);
		  this.setDiffuse(1, 1, 0.05, 1.0);
		  this.setSpecular(1, 1, 0.05, 1.0);
		  this.setShininess(10.0);
  
		  this.materialHotPink = new CGFappearance(this.scene);
		  this.materialHotPink.setAmbient(0.5, 0.2, 0.35, 1.0);
		  this.materialHotPink.setDiffuse(0.5, 0.2, 0.35, 1.0);
		  this.materialHotPink.setSpecular(1, 0.41, 0.71, 1.0);
		  this.materialHotPink.setShininess(10.0); */
	
	}

	enableNormalViz() {
		this.diamond.enableNormalViz();
    	this.triangle.enableNormalViz();
    	this.para.enableNormalViz();
    	this.triangleSmall.enableNormalViz();
    	this.triangleBig.enableNormalViz();
    	this.triangleBig2.enableNormalViz();
	}


	disableNormalViz() {
		this.diamond.disableNormalViz();
    	this.triangle.disableNormalViz();
    	this.para.disableNormalViz();
    	this.triangleSmall.disableNormalViz();
    	this.triangleBig.disableNormalViz();
    	this.triangleBig2.disableNormalViz();
	}

	display(){	  
		/*
		this.scene.pushMatrix();
		this.scene.multMatrix(this.diamondRotation);
		this.scene.customMaterial.apply();
		this.diamond2.display();
		this.scene.popMatrix();

			
		//this.scene.setDefaultAppearance();
		this.materialB.apply();
		this.scene.pushMatrix();
		this.scene.translate(0.7, -2.45, 0);
		this.triangleBig.display();
		this.scene.popMatrix();
		
        //this.scene.setColorPurple();
        this.materialPurple.apply();
		this.scene.pushMatrix();
		this.scene.translate(2, -2.45, 0);
		this.scene.scale(-1, 1, 1);
		this.scene.rotate(-Math.PI/4, 0, 0, 1);
		this.para.display();
		this.triangleBig2.display();
		this.scene.popMatrix();
		
		//this.scene.setColorYellow();
		this.materialYellow.apply();
		this.scene.pushMatrix();
		this.scene.translate(1.5,1.35,0)
		this.scene.rotate(-5/4*Math.PI, 0, 0, 1);
		this.triangle.display();
		this.scene.popMatrix();
		

		//this.scene.setColorHotPink();
		this.materialHotPink.apply();
		this.scene.pushMatrix();
		this.scene.translate(1.5,3.5,0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.triangleSmall.display();
		this.scene.popMatrix();

        //this.scene.setColorOrange();
        this.materialOrange.apply();
		this.scene.pushMatrix();
		this.scene.translate(0.62,2.85,0);
		this.scene.rotate(Math.PI*3.4/4, 0, 0, 1);
		this.triangleSmall.display();
		this.scene.popMatrix();
		*/

		this.scene.pushMatrix(); 
		this.tangramTex.apply();
		this.scene.scale(0.25,0.25,1); 
		
		this.scene.pushMatrix();
		this.scene.multMatrix(this.diamondRotation);
		this.diamond.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
		this.scene.translate(0.7, -2.45, 0);
		this.triangleBigBlue.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(2, -2.45, 0);
		this.scene.scale(-1, 1, 1);
		this.scene.rotate(-Math.PI/4, 0, 0, 1);
		this.tangramTex.apply();
		this.para.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		this.scene.translate(2.9,-0.67,0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.triangleBigOrange.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(1.5,1.35,0)
		this.scene.rotate(-5/4*Math.PI, 0, 0, 1);
		this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(1.5,3.5,0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.triangleSmallRed.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.62,2.85,0);
		this.scene.rotate(Math.PI*3.4/4, 0, 0, 1);
		this.triangleSmallCobalt.display();
		this.scene.popMatrix();

		this.scene.popMatrix();

	}

	updateBuffers() {
		this.initBuffers();
        this.initNormalVizBuffers();
	}

}
