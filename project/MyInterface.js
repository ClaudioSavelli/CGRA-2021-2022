import { CGFinterface, dat } from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();

        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayTrain').name('Display Train');
        this.gui.add(this.scene, 'displayMovingTrain').name('Display Moving Train');
        this.gui.add(this.scene, 'displayExagon').name('Display Exagon');
        this.gui.add(this.scene, 'displayEarth').name('Display Earth');
        this.gui.add(this.scene, 'displayTrack').name('Display Track');
        this.gui.add(this.scene, 'linear').name('Linear Int.');
        this.gui.add(this.scene, 'scaleFactor', 0.1, 10.0).name('Scale');

        //Dropdown for textures
        this.gui.add(this.scene, 'selectedCubeMapTexture', this.scene.cubeMapTextureIds).name('Cube Map Texture').onChange(this.scene.updateAppliedTexture.bind(this.scene));
       
        this.initKeys();

        return true;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui = this;

        // disable the processKeyboard function
        this.processKeyboard = function () { };

        // create a named array to store which keys are being pressed
        this.activeKeys = {};
    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code] = true;
    }

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code] = false;
    }

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }

}