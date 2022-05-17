import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import { MySphere } from "../3D_Shapes/MySphere";

export class MyEarth extends CGFobject{
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 20, 10);
        this.createTextures();
    }

    createTextures() {
        this.earthAppearance = new CGFappearance(this.scene);
        this.earthAppearance.setAmbient(0, 0, 0, 1);
        this.earthAppearance.setDiffuse(1, 1, 1, 1);
        this.earthAppearance.setSpecular(0, 0, 0, 0);
        this.earthAppearance.setShininess(10);

        this.earthTexture = new CGFtexture(this.scene, "./images/earth.jpg");
        this.earthAppearance.setTexture(this.earthTexture);
        this.earthAppearance.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');
    }

    display(){
        this.earthAppearance.apply();
        this.sphere.display();
    }
    
}


