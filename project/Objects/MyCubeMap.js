import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyQuad } from '../2D_Shapes/MyQuad.js';

export class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
		this.quad = new MyQuad(scene);
        this.cubeMaterial = new CGFappearance(scene);
        this.cubeMaterial.setAmbient(0.0, 0.0, 0.0, 1);
        this.cubeMaterial.setDiffuse(0.0, 0.0, 0.0, 1);
        this.cubeMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.cubeMaterial.setEmission(1, 1, 1, 1);
    }

    setTexture(top, front, right, back, left, bottom) {
        this.topTexture = top;
        this.frontTexture = front;
        this.rightTexture = right;
        this.backTexture = back;
        this.leftTexture = left;
        this.bottomTexture = bottom;
    }
    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        //this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.cubeMaterial.setTexture(this.frontTexture);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(
            this.scene.gl.TEXTURE_2D,
            this.scene.gl.TEXTURE_MAG_FILTER,
            this.scene.gl.NEAREST
        );
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.cubeMaterial.setTexture(this.backTexture);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(
            this.scene.gl.TEXTURE_2D,
            this.scene.gl.TEXTURE_MAG_FILTER,
            this.scene.gl.NEAREST
        );
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.cubeMaterial.setTexture(this.leftTexture);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(
            this.scene.gl.TEXTURE_2D,
            this.scene.gl.TEXTURE_MAG_FILTER,
            this.scene.gl.NEAREST
        );
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0)
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.cubeMaterial.setTexture(this.rightTexture);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(
            this.scene.gl.TEXTURE_2D,
            this.scene.gl.TEXTURE_MAG_FILTER,
            this.scene.gl.NEAREST
        );
        this.quad.display();
        this.scene.popMatrix();

        
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.cubeMaterial.setTexture(this.topTexture);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(
            this.scene.gl.TEXTURE_2D,
            this.scene.gl.TEXTURE_MAG_FILTER,
            this.scene.gl.NEAREST
        );
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        //this.scene.rotate(Math.PI, 1, 0, 0);
        this.cubeMaterial.setTexture(this.bottomTexture);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(
            this.scene.gl.TEXTURE_2D,
            this.scene.gl.TEXTURE_MAG_FILTER,
            this.scene.gl.NEAREST
        );
        this.quad.display();
        this.scene.popMatrix();
    }
}

