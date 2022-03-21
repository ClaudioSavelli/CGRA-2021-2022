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
	}
	display(scene){
		const diamondRotation = 
		this.diamond = new MyDiamond(this);
    	this.triangle = new MyTriangle(this);
    	this.para = new MyParallelogram(this);
    	this.triangleSmall = new MyTriangleSmall(this);
    	this.triangleBig = new MyTriangleBig(this);
    	this.triangleBig2 = new MyTriangleBig(this);
    	this.diamond2 = new MyDiamond(this);
		
		[
			Math.cos(Math.PI/9), -Math.sin(Math.PI/9), 0, 0,
			Math.sin(Math.PI/9), Math.cos(Math.PI/9), 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		  ];
	  
		this.pushMatrix();
		this.multMatrix(diamondRotation);
	  
		this.diamond2.display();
		this.popMatrix();
		this.pushMatrix();
		this.translate(0.7, -2.45, 0);
		this.triangleBig.display();
		this.popMatrix();
		this.pushMatrix();
		this.translate(2, -2.45, 0);
		this.scale(-1, 1, 1);
		this.rotate(-Math.PI/4, 0, 0, 1);
		this.para.display();
		this.popMatrix();
		this.pushMatrix();
		this.translate(2.9,-0.67,0);
		this.rotate(Math.PI/2, 0, 0, 1);
		this.triangleBig2.display();
		this.popMatrix();
		this.pushMatrix();
		this.translate(1.5,1.35,0)
		this.rotate(-5/4*Math.PI, 0, 0, 1);
		this.triangle.display();
		this.popMatrix();
		this.pushMatrix();
		this.translate(1.5,3.5,0);
		this.rotate(Math.PI/2, 0, 0, 1);
		this.triangleSmall.display();
		this.popMatrix();
		this.pushMatrix();
		this.translate(0.62,2.85,0);
		this.rotate(Math.PI*3.4/4, 0, 0, 1);
		this.triangleSmall.display();
		this.popMatrix();
	}
}
