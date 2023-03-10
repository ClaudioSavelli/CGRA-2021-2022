import { CGFscene, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { CGFcamera2 } from "../lib/CGFcamera2.js";
import { MyTrack } from "./Objects/Track/MyTrack.js";
import { MyEarth } from "./Objects/MyEarth.js";
import { MyTrain } from "./Objects/Train/MyTrain.js";
import { MyCubeMap } from "./Objects/MyCubeMap.js";
import { MyMovingTrain } from "./MovementController/MyMovingTrain.js";
import { MyCircle } from "./2D_Shapes/MyCircle.js";

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
        const complexity = 30; 

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        this.createTextures(); 

        this.defaultAppearance = new CGFappearance(this)
        this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0)
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0)
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0)
        this.defaultAppearance.setEmission(0, 0, 0, 1)
        this.defaultAppearance.setShininess(120)
        this.loadTextures();

        this.setOfPoints = [
            {x: -25, z: 20, type: 'simple', side:null},
            //{x: -20, z: 2.5, type: 'station', side:'right', hasLoad:false}, //station supposed to be on the angle 
            {x: -15, z: -15, type: 'simple', side:null},
            {x: 0, z: -15, type: 'station', side:'left', hasLoad:true}, //upper one
            {x: 15, z: -15, type: 'simple', side:null},
            //{x: 20, z: 2.5, type: 'station', side:'left', hasLoad:true}, //station supposed to be on the angle 
            {x: 25, z: 20, type: 'simple', side:null}, 
            {x: 0, z: 20, type: 'station', side:'right', hasLoad:false}, //lower one
        ]

        this.linear = true;
        this.scaleFactor = 0.5;
        this.selectedCubeMapTexture = 0;
        this.cubeMapTextureIds = { 'Yokohama': 0, 'Sunny hills': 1, 'Demo': 2 };
        this.cubeMapTextures = [this.YokohamaCubeMap, this.sunnyHillsCubeMap, this.testCubeMap];
        
        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new MyPlane(this, 20, 0,10,0,10);
        this.track = new MyTrack(this, this.setOfPoints); 
        this.earth = new MyEarth(this);
        this.train = new MyTrain(this, complexity, false);
        this.cubeMap = new MyCubeMap(this); 
        this.movingTrain = new MyMovingTrain(this, this.train, this.track); 
        this.circle = new MyCircle(this, 6); 

        this.cubeMap.setTexture(
                                this.YokohamaCubeMap.top, 
                                this.YokohamaCubeMap.front, 
                                this.YokohamaCubeMap.right,
                                this.YokohamaCubeMap.back, 
                                this.YokohamaCubeMap.left, 
                                this.YokohamaCubeMap.bottom
                                );
        //Objects connected to MyInterface
        this.displayAxis = false;
        this.displayExagon = false; 
        this.displayEarth = false;
        this.displayTrain = false;
        this.displayMovingTrain = true;
        this.displayTrack = true;
    }

    loadTextures() {
        this.tracksTexture = new CGFtexture(this, 'images/tracks.png');
        this.YokohamaCubeMap = {
            "top":    new CGFtexture(this, "./images/Yokohama/pz.jpg"),
            "front":  new CGFtexture(this, "./images/Yokohama/px.jpg"),
            "right":  new CGFtexture(this, "./images/Yokohama/py.jpg"),
            "back":   new CGFtexture(this, "./images/Yokohama/nx.jpg"),
            "left":   new CGFtexture(this, "./images/Yokohama/ny.jpg"),
            "bottom": new CGFtexture(this, "./images/Yokohama/nz.jpg"),
        };

        this.sunnyHillsCubeMap = {
            "top":    new CGFtexture(this, "./images/demo_cubemap/top.png"),
            "front":  new CGFtexture(this, "./images/demo_cubemap/front.png"),
            "right":  new CGFtexture(this, "./images/demo_cubemap/right.png"),
            "back":   new CGFtexture(this, "./images/demo_cubemap/back.png"),
            "left":   new CGFtexture(this, "./images/demo_cubemap/left.png"),
            "bottom": new CGFtexture(this, "./images/demo_cubemap/bottom.png"),
        };

        this.testCubeMap = {
            "top":    new CGFtexture(this, "./images/test_cubemap/pz.png"),
            "front":  new CGFtexture(this, "./images/test_cubemap/px.png"),
            "right":  new CGFtexture(this, "./images/test_cubemap/py.png"),
            "back":   new CGFtexture(this, "./images/test_cubemap/nx.png"),
            "left":   new CGFtexture(this, "./images/test_cubemap/ny.png"),
            "bottom": new CGFtexture(this, "./images/test_cubemap/nz.png"),
        };

    }

    setColorHotPink() {
        this.setAmbient(1, 0.41, 0.71, 1.0);
        this.setDiffuse(1, 0.41, 0.71, 1.0);
        this.setSpecular(1, 0.41, 0.71, 1.0);
        this.setShininess(10.0);
      }

    initLights() {
        this.lights[0].setPosition(20, 10, 12, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setVisible(true);
        this.lights[0].enable();
        this.lights[0].update();

        this.lights[1].setPosition(-20, 10, -12, 1);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setVisible(true);
        this.lights[1].enable();
        this.lights[1].update();
    }

    initCameras() {
        this.camera = new CGFcamera2(1.5, 0.1, 500, vec3.fromValues(2,2,2), vec3.fromValues(0, 2, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys(); 
        this.movingTrain.update(t); 
    }

    //Function that resets selected texture in quadMaterial
    updateAppliedTexture() {
        this.cubeMap.setTexture(                                
                                this.cubeMapTextures[this.selectedCubeMapTexture].top, 
                                this.cubeMapTextures[this.selectedCubeMapTexture].front, 
                                this.cubeMapTextures[this.selectedCubeMapTexture].right,
                                this.cubeMapTextures[this.selectedCubeMapTexture].back, 
                                this.cubeMapTextures[this.selectedCubeMapTexture].left, 
                                this.cubeMapTextures[this.selectedCubeMapTexture].bottom
                                )
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
        if (this.displayAxis)
            this.axis.display();


        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

        
        this.pushMatrix();
        this.translate(0, 13, 0)
        this.scale(100, 100, 100);
        this.cubeMap.display();
        this.popMatrix();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        this.pushMatrix();
        this.scale(100,1,100); 
        this.rotate(-Math.PI*0.5, 1,0,0);
        this.plane.planeTexture.apply(); 
        this.plane.display();
        this.popMatrix();

        if (this.displayTrack) {
            this.track.display();
        }

        if(this.displayExagon){
            this.testAppaerance.apply();

            this.pushMatrix(); 
            this.translate(0, 5, 0);
            this.rotate(Math.PI/2, 1, 0, 0); 
            this.scale(2, 2, 2); 
            this.circle.display();
            this.popMatrix();
        }

        if (this.displayTrain) {
            this.train.display();
        }

        if (this.displayEarth) {
            this.pushMatrix();
            this.translate(0, 5.0, 0);
            this.scale(2.0, 2.0, 2.0);
            this.earth.display();
            this.popMatrix();
        }

        if (this.displayMovingTrain) {
            this.movingTrain.display();
        }

        // ---- END Primitive drawing section
    }
    checkKeys() {

        // Check for key codes eg in https://keycode.info/

        if (this.gui.isKeyPressed("KeyW")) {
            this.train.crane.tilt(0.1); 
        }
        if (this.gui.isKeyPressed("KeyS"))        {
            this.train.crane.tilt(-0.1); 
        }
        if (this.gui.isKeyPressed("KeyA")) {
            this.train.crane.turn(-0.1); 
    }
        if (this.gui.isKeyPressed("KeyD"))        {
            this.train.crane.turn(0.1); 
        }
        if (this.gui.isKeyPressed("KeyR"))        {
            this.train.crane.reset(); 
        }
        if (this.gui.isKeyPressed("KeyP"))  {
            this.movingTrain.interact(); 
        }
        if (this.gui.isKeyPressed("KeyC"))          {
            this.movingTrain.departure(); 
        }
  }

  createTextures() {
    this.testAppaerance = new CGFappearance(this);
    this.testAppaerance.setAmbient(1, 1, 1, 1);
    this.testAppaerance.setDiffuse(1, 1, 1, 1);
    this.testAppaerance.setSpecular(0, 0, 0, 1);

    this.texture = new CGFtexture(this, "./images/window.jpg");
    this.testAppaerance.setTexture(this.texture);
    this.testAppaerance.setTextureWrap('REPEAT', 'REPEAT');
}


}