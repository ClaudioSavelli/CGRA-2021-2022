import { CGFscene, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { CGFcamera2 } from "../lib/CGFcamera2.js";
import { MyTrack } from "./Objects/Track/MyTrack.js";
import { MySphere } from "./3D_Shapes/MySphere.js";
//import { MyEarth } from "./Objects/MyEarth.js";
import { MyCircle } from "./2D_Shapes/MyCircle.js";
import { MyCilinder } from "./3D_Shapes/MyCilinder.js";
import { MyUnitCube } from "./3D_Shapes/MyUnitCube.js"; 
import { MyWheel } from "./Objects/Train/MyWheel.js";
import { MyTrain } from "./Objects/Train/MyTrain.js";
import { MyCubeMap } from "./Objects/MyCubeMap.js";
import { MyCrane } from "./Objects/Train/MyCrane.js";
import { MyMovingTrain } from "./MovementController/MyMovingTrain.js";
import { MyLoad } from "./Objects/Load/MyLoad.js";


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

        this.defaultAppearance = new CGFappearance(this)
        this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0)
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0)
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0)
        this.defaultAppearance.setEmission(0, 0, 0, 1)
        this.defaultAppearance.setShininess(120)
        this.loadTextures();
        /*
        this.setOfPoints = [
            {x: -5, z: 10, type: 'simple'},
            {x: 0, z: 0, type: 'station'},
            {x: 10, z: 0, type: 'simple'},
            {x: 15, z: 10, type: 'station'}
          ]*/


          this.setOfPoints = [
            {x: -20, z: 15, type: 'simple'},
            {x: -20, z: -10, type: 'simple'},
            {x: 20, z: -10, type: 'simple'},
            {x: 20, z: 15, type: 'simple'}, 
        ]
        /* THE FINAL TRACK
        this.setOfPoints = [
            {x: -20, z: 15, type: 'simple'},
            {x: -10, z: -10, type: 'simple'},
            {x: 0, z: -10, type: 'station'},
            {x: 10, z: -10, type: 'simple'},
            {x: 20, z: 15, type: 'simple'}, 
            {x: 0, z: 15, type: 'station'},
        ]*/
/*
          this.setOfPoints = [
            {x: -10, z: 10, type: 'simple'},
            {x: -5, z: 0, type: 'station'},
            {x: 10, z: 0, type: 'simple'},
            {x: 15, z: 10, type: 'station'}
  
          ]*/
        this.linear = true;
        this.scaleFactor = 0.1;
        this.selectedCubeMapTexture = -1;
        this.cubeMapTextureIds = { 'Sunny hills': 0, 'Demo': 1 };
        this.cubeMapTextures = [this.sunnyHillsCubeMap, this.testCubeMap];
        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new MyPlane(this, 20, 0,1,0,1);
        this.track = new MyTrack(this, this.setOfPoints); 
        //this.earth = new MyEarth(this);
        this.circle = new MyCircle(this, complexity); 
        this.cilinder = new MyCilinder(this, complexity); 
        this.sphere = new MySphere(this, complexity, complexity); 
        this.cube = new MyUnitCube(this); 
        this.wheel = new MyWheel(this, complexity);
        this.train = new MyTrain(this, complexity);
        this.crane = new MyCrane(this, 0, -1, complexity); 
        this.cubeMap = new MyCubeMap(this)
        this.movingTrain = new MyMovingTrain(this, this.train, this.crane, this.setOfPoints); 
        this.load = new MyLoad(this, complexity); 
        //this.cubeMap.setTexture(top, front, right, back, left, bottom);
        this.cubeMap.setTexture(
                                this.sunnyHillsCubeMap.top, 
                                this.sunnyHillsCubeMap.front, 
                                this.sunnyHillsCubeMap.right,
                                this.sunnyHillsCubeMap.back, 
                                this.sunnyHillsCubeMap.left, 
                                this.sunnyHillsCubeMap.bottom
                                );
        //Objects connected to MyInterface
        this.displayAxis = false;
    }

    loadTextures() {
        this.tracksTexture = new CGFtexture(this, 'images/tracks.png');
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
        /*this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();*/

        this.lights[0].setPosition(5, 1, 3, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setVisible(true);
        this.lights[0].enable();
        this.lights[0].update();
    
    }

    initCameras() {
        //this.camera = new CGFcamera2(0.4, 0.1, 500, vec3.fromValues(30,30,30), vec3.fromValues(0, 0, 0));
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
        //to be done
        this.checkKeys(); 
        this.movingTrain.update(t); 
    }

    updateTexCoords() {
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

        this.setDefaultAppearance();

        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

        // ---- BEGIN Primitive drawing section
        //this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.pushMatrix();
        this.scale(50,1,50);
        this.rotate(-Math.PI*0.5, 1,0,0);
        //this.plane.display();
        this.popMatrix();

        this.track.display(); 

        this.train.display(); 
        this.crane.display(); 

        this.load.display(); 

        //this.movingTrain.display(); 

        this.pushMatrix();
        this.translate(0, 17, 0)

        this.translate(this.camera.position[0], this.camera.position[1], this.camera.position[2]);

        this.scale(50, 50, 50);
        //this.cubeMap.display();
        this.popMatrix();
        //this.track.display(); 
        //this.circle.display();
        //this.cilinder.display();  
        // ---- END Primitive drawing section
    }
    checkKeys() {

        var text="Keys pressed: ";
        var keysPressed=false;

        // Check for key codes eg in https://keycode.info/

        if (this.gui.isKeyPressed("KeyW")) {
                this.crane.tilt(0.1); 
        }
        if (this.gui.isKeyPressed("KeyS"))        {
                this.crane.tilt(-0.1); 
        }
        if (this.gui.isKeyPressed("KeyA")) {
            this.crane.turn(0.1); 
    }
        if (this.gui.isKeyPressed("KeyD"))        {
                this.crane.turn(-0.1); 
        }
        if (this.gui.isKeyPressed("KeyR"))        {
                this.crane.reset(); 
        }
  }
}