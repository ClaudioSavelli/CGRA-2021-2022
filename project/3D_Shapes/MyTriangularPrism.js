import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyQuad } from '../2D_Shapes/MyQuad.js';
import { MyTriangle } from '../2D_Shapes/MyTriangle.js';

export class MyTriangularPrism extends CGFobject {
	constructor(scene) {
		super(scene);
        this.triangle = new MyTriangle(scene);
        this.quad = new MyQuad(scene);
        this.defaultAppearanceW = new CGFappearance(scene)
        this.defaultAppearanceW.setAmbient(1, 1, 1, 1.0)
        this.defaultAppearanceW.setDiffuse(1, 1, 1, 1.0)
        this.defaultAppearanceW.setSpecular(0, 0, 0, 1.0)
        this.defaultAppearanceW.setShininess(120)
    }

    display() {
        this.scene.pushMatrix()
        this.scene.scale(5.0, 5.0, 5.0)

        this.scene.pushMatrix();
        this.scene.translate(2, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
       // this.defaultAppearanceW.apply()
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2, 0, 0)
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(4.0, 3.0, 4.0)
        this.scene.rotate(-Math.PI, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1, 1)
        this.scene.rotate(Math.PI/4, 1, 0, 0);
        this.scene.scale(4.0, 1.0, 4*Math.SQRT2/2)
        this.quad.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0, 1, -1)
        this.scene.rotate(-Math.PI/4, 1, 0, 0);
        this.scene.scale(4.0, 1.0, 4*Math.SQRT2/2)
        this.quad.display();
        this.scene.popMatrix();
        
        this.scene.popMatrix();
    }

}
