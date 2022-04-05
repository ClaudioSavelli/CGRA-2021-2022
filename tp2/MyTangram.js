import {CGFobject} from '../lib/CGF.js';
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
		this.diamond = new MyDiamond(scene);
    	this.triangle = new MyTriangle(scene);
    	this.para = new MyParallelogram(scene);
    	this.triangleSmall = new MyTriangleSmall(scene);
    	this.triangleBig = new MyTriangleBig(scene);
    	this.triangleBig2 = new MyTriangleBig(scene);
		
		this.diamondRotation =  [
			Math.cos(Math.PI/9), -Math.sin(Math.PI/9), 0, 0,
			Math.sin(Math.PI/9), Math.cos(Math.PI/9), 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		  ];
	}
	display(){	  
		this.scene.pushMatrix();
		this.scene.multMatrix(this.diamondRotation);
	  
		this.diamond.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
		this.scene.translate(0.7, -2.45, 0);
		this.triangleBig.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
		this.scene.translate(2, -2.45, 0);
		this.scene.scale(-1, 1, 1);
		this.scene.rotate(-Math.PI/4, 0, 0, 1);
		this.para.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
		this.scene.translate(2.9,-0.67,0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.triangleBig2.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
		this.scene.translate(1.5,1.35,0)
		this.scene.rotate(-5/4*Math.PI, 0, 0, 1);
		this.triangle.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
		this.scene.translate(1.5,3.5,0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.triangleSmall.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
		this.scene.translate(0.62,2.85,0);
		this.scene.rotate(Math.PI*3.4/4, 0, 0, 1);
		this.triangleSmall.display();
		this.scene.popMatrix();
	}
}
