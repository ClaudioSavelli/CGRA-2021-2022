import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.quadLeft = new MyQuad(scene);
        this.quadRight = new MyQuad(scene);
        this.quadTop = new MyQuad(scene);
        this.quadBottom = new MyQuad(scene);
        this.quadFront = new MyQuad(scene);
        this.quadBack = new MyQuad(scene);

        this.topTex = new CGFappearance(this.scene);
        this.topTex.setAmbient(0.1, 0.1, 0.1, 1);
        this.topTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.topTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.topTex.setShininess(10.0);
        this.topTex.loadTexture('images/mineTop.png');
        this.topTex.setTextureWrap('REPEAT', 'REPEAT');

        this.sideTex = new CGFappearance(this.scene);
        this.sideTex.setAmbient(0.1, 0.1, 0.1, 1);
        this.sideTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.sideTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.sideTex.setShininess(10.0);
        this.sideTex.loadTexture('images/mineSide.png');
        this.sideTex.setTextureWrap('REPEAT', 'REPEAT');

        this.bottomTex = new CGFappearance(this.scene);
        this.bottomTex.setAmbient(0.1, 0.1, 0.1, 1);
        this.bottomTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bottomTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.bottomTex.setShininess(10.0);
        this.bottomTex.loadTexture('images/mineBottom.png');
        this.bottomTex.setTextureWrap('REPEAT', 'REPEAT');
    }
	
    display() {
        this.sideTex.apply();
        if (!this.scene.linear)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);


        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.quadFront.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quadBack.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.quadLeft.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quadLeft.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.topTex.apply();
        if (!this.scene.linear)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        this.quadTop.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.bottomTex.apply();
        if (!this.scene.linear)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        this.quadBottom.display();
        this.scene.popMatrix();
    }
}

