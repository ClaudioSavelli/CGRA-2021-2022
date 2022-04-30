import { CGFscene, CGFaxis, CGFappearance } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { CGFcamera2 } from "../lib/CGFcamera2.js";
import { MyTrack } from "./MyTrack.js";

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

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        this.defaultAppearance = new CGFappearance(this)
        this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0)
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0)
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0)
        this.defaultAppearance.setEmission(0, 0, 0, 1)
        this.defaultAppearance.setShininess(120)

        /*
        this.setOfPoints = [
            {x: -5, z: 10, type: 'simple'},
            {x: 0, z: 0, type: 'station'},
            {x: 10, z: 0, type: 'simple'},
            {x: 15, z: 10, type: 'station'}
          ]*/

          this.setOfPoints = [
            {x: -10, z: 10, type: 'simple'},
            {x: -5, z: 0, type: 'station'},
            {x: 10, z: 0, type: 'simple'},
            {x: 15, z: 10, type: 'station'}
          ]
/*
          this.setOfPoints = [
            {x: -20, z: 20, type: 'simple'},
            {x: -10, z: 0, type: 'station'},
            {x: 20, z: 0, type: 'simple'},
            {x: 30, z: 20, type: 'station'}
  
          ]*/
          this.linear = true;
          this.scaleFactor = 1.2;
          this.selectedTexture = -1;   
          this.wrapS = 0;
          this.wrapT = 0;
          this.textures = [this.texture1, this.texture2, this.texture3];
        this.texCoords = [0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0];
        this.wrappingMethods = ['REPEAT', 'CLAMP_TO_EDGE', 'MIRRORED_REPEAT'];
        this.wrappingS = { 'Repeat': 0, 'Clamp to edge': 1, 'Mirrored repeat': 2 };
        this.wrappingT = { 'Repeat': 0, 'Clamp to edge': 1, 'Mirrored repeat': 2 };

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new MyPlane(this, 20, 0,1,0,1);
        this.track = new MyTrack(this, this.setOfPoints); 

        //Objects connected to MyInterface
        this.displayAxis = true;
    }

    loadTextures() {
        this.tracksTexture = new CGFtexture(this, 'images/tracks.png');
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
        this.camera = new CGFcamera2(0.5, 0.1, 500, vec3.fromValues(2,50,2), vec3.fromValues(0, 2, 0));
    
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

    updateTexCoords() {
        this.track.quad.updateTexCoords(this.texCoords);
    }

    //Function that resets selected texture in quadMaterial
    updateAppliedTexture() {
        this.track.appearance.setTexture(this.textures[this.selectedTexture]);
    }

    //Function that updates wrapping mode in quadMaterial
    updateTextureWrapping() {
        this.track.appearance.setTextureWrap(this.wrappingMethods[this.wrapS], this.wrappingMethods[this.wrapT]);
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
        this.pushMatrix();
        this.scale(50,1,50);
        this.rotate(-Math.PI*0.5, 1,0,0);
        this.plane.display();
        this.popMatrix();
        this.track.display(); 
        // ---- END Primitive drawing section
    }
}