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
        this.gui.add(this.scene, 'linear').name('Linear Int.');
        this.gui.add(this.scene, 'scaleFactor', 0.1, 10.0).name('Scale');



 //Dropdown for wrapping (S)
 this.gui.add(this.scene, 'wrapS', this.scene.wrappingS).name('Wrap S').onChange(this.scene.updateTextureWrapping.bind(this.scene));
 this.gui.add(this.scene, 'wrapT', this.scene.wrappingT).name('Wrap T').onChange(this.scene.updateTextureWrapping.bind(this.scene));

 //Groups for Texture coordinates per vertex (MyQuad)
 var f0 = this.gui.addFolder('Top Left Coords')
 f0.add(this.scene.texCoords, '4', -5.0, 5.0, 0.1).name('S Coord').onChange(this.scene.updateTexCoords.bind(this.scene)).step(0.001);
 f0.add(this.scene.texCoords, '5', -5.0, 5.0, 0.1).name('T Coord').onChange(this.scene.updateTexCoords.bind(this.scene)).step(0.001);
 var f1 = this.gui.addFolder('Top Right Coords')
 f1.add(this.scene.texCoords, '6', -5.0, 5.0, 0.1).name('S Coord').onChange(this.scene.updateTexCoords.bind(this.scene)).step(0.001);
 f1.add(this.scene.texCoords, '7', -5.0, 5.0, 0.1).name('T Coord').onChange(this.scene.updateTexCoords.bind(this.scene)).step(0.001);
 var f2 = this.gui.addFolder('Bottom Left Coords')
 f2.add(this.scene.texCoords, '0', -5.0, 5.0, 0.1).name('S Coord').onChange(this.scene.updateTexCoords.bind(this.scene)).step(0.001);
 f2.add(this.scene.texCoords, '1', -5.0, 5.0, 0.1).name('T Coord').onChange(this.scene.updateTexCoords.bind(this.scene)).step(0.001);
 var f3 = this.gui.addFolder('Bottom Right Coords')
 f3.add(this.scene.texCoords, '2', -5.0, 5.0, 0.1).name('S Coord').onChange(this.scene.updateTexCoords.bind(this.scene)).step(0.001);
 f3.add(this.scene.texCoords, '3', -5.0, 5.0, 0.1).name('T Coord').onChange(this.scene.updateTexCoords.bind(this.scene)).step(0.001);








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