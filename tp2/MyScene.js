import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTangram } from "./MyTangram.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyQuad } from "./MyQuad.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }

  
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);
    this.para = new MyParallelogram(this);
    this.triangleSmall = new MyTriangleSmall(this);
    this.triangleBig = new MyTriangleBig(this);
    this.triangleBig2 = new MyTriangleBig(this);
    this.diamond2 = new MyDiamond(this);
    this.tangram = new MyTangram(this);
    this.cube = new MyUnitCube(this); 
    this.quad1 = new MyQuad(this); 
    this.quad2 = new MyQuad(this);
    this.quad3 = new MyQuad(this);
    this.quad4 = new MyQuad(this);
    this.quad5 = new MyQuad(this);
    this.quad6 = new MyQuad(this);
    this.tangram = new MyTangram(this);
    this.cube2 = new MyUnitCubeQuad(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayTriangle = true;
    this.displayDiamond = true;
    this.displayPara = true;
    this.displayTriangleSmall = true;
    this.displayTriangleBig = true;
    this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  setColorHotPink() {
    this.setAmbient(1, 0.41, 0.71, 1.0);
    this.setDiffuse(1, 0.41, 0.71, 1.0);
    this.setSpecular(1, 0.41, 0.71, 1.0);
    this.setShininess(10.0);
  }
  setColorYellow() {
    this.setAmbient(1, 1, 0.05, 1.0);
    this.setDiffuse(1, 1, 0.05, 1.0);
    this.setSpecular(1, 1, 0.05, 1.0);
    this.setShininess(10.0);
  }


  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    const sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);

    // ---- BEGIN Primitive drawing section
/*
    if (this.displayDiamond) this.diamond.display();
    this.setColorHotPink();
    if (this.displayTriangle) this.triangle.display();
    this.setColorYellow();
    if (this.displayPara) this.para.display();

    this.setColorHotPink();
    if (this.displayTriangleSmall) this.triangleSmall.display();
    this.setColorYellow();
    if (this.displayTriangleBig) this.triangleBig.display();*/
  
  
    const diamondRotation = [
      Math.cos(Math.PI/9), -Math.sin(Math.PI/9), 0, 0,
      Math.sin(Math.PI/9), Math.cos(Math.PI/9), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];

  this.pushMatrix(); 
  this.translate(0,0,8.5);
  this.rotate(-Math.PI/2,1,0,0);
  
  this.pushMatrix();  //Generate the matrix to move all the tangram
  this.translate(1.65,3.9,0); //For moving all the tangram

  //Start of the MyTangram function
  /*
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
  this.popMatrix();*/
    this.tangram.display();
    this.popMatrix();
    this.setColorHotPink();
  //End of MyTangramFunction 
  
  //this.popMatrix() //Pop the matrix that move all the tangram 
  

  
  //3.
  /*
  this.pushMatrix(); 
  this.translate(2.5,4.25,-0.26);
  this.scale(5,8.5,0.5); 
  this.cube.display(); 
  this.popMatrix(); 
  */

  //4.
    this.pushMatrix(); 
    this.translate(2.5,4.25,-0.26);
    this.scale(5,8.5,0.5); 
    this.cube2.display();
    this.popMatrix(); 

  this.popMatrix(); 

   // ---- END Primitive drawing section
  }
}
