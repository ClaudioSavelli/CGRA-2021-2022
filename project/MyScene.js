import { CGFscene, CGFaxis, CGFappearance } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { CGFcamera2 } from "../lib/CGFcamera2.js";
import { MyTrack } from "./MyTrack.js";
import { MyCircle } from "./MyCircle.js";
import { MyCilinder } from "./MyCilinder.js";
import { MySphere } from "./MySphere.js"; 
import { MyUnitCube } from "./MyUnitCube.js"; 
import { MyWheel } from "./MyWheel.js";
import { MyTrain } from "./MyTrain.js";

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
        var N = 10; 

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        this.setOfPoints = [
            {x: -5, z: 10, type: 'simple'},
            {x: 0, z: 0, type: 'station'},
            {x: 10, z: 0, type: 'simple'},
            {x: 15, z: 10, type: 'station'}
          ]

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new MyPlane(this, 20, 0,1,0,1);
        this.track = new MyTrack(this, this.setOfPoints); 
        this.circle = new MyCircle(this, N); 
        this.cilinder = new MyCilinder(this, N); 
        this.sphere = new MySphere(this, N, N); 
        this.cube = new MyUnitCube(this); 
        this.wheel = new MyWheel(this, N); 
        this.train = new MyTrain(this, N); 

        //Objects connected to MyInterface
        this.displayAxis = true;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera2(0.4, 0.1, 500, vec3.fromValues(30,30,30), vec3.fromValues(0, 0, 0));
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
        //To be done...
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

        // ---- BEGIN Primitive drawing section
        this.pushMatrix();
        this.scale(50,1,50);
        this.rotate(-Math.PI*0.5, 1,0,0);
        this.plane.display();
        this.popMatrix();

        this.train.display(); 

        
        //this.track.display(); 
        //this.circle.display();
        //this.cilinder.display();  
        // ---- END Primitive drawing section
    }
}