import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyQuad } from "../../2D_Shapes/MyQuad";

export class MyTrackSegment extends CGFobject{
    constructor(scene, x1, z1, x2, z2) {
        super(scene);
        this.trackWidth = 4; 
		this.scene = scene;
        this.quad = new MyQuad(scene); 
        this.init(scene, x1, z1, x2, z2); 
        this.createTextures();
    }

    createTextures() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(100, 100, 100, 1);
        this.appearance.setDiffuse(100, 100, 100, 1);
        this.appearance.setSpecular(0, 0, 0, 1);
        this.appearance.setShininess(120);

        this.texture = new CGFtexture(this.scene, "./images/tracks.png");
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    init(scene, x1, z1, x2, z2){         
            this.x1 = x1; 
            this.z1 = z1; 
            this.x2 = x2; 
            this.z2 = z2; 
            this.length = this.distanceBetweenTwoPoints(this.x1, this.z1, this.x2, this.z2); 
            this.quad.updateTexCoords([0, 1,
                this.length/3, 1,
                0, 0,
                this.length/3, 0]);
            console.log(this.quad.texCoords);
            //this.scene.defaultAppearance.apply()
        } 


    display(){
            this.scene.pushMatrix(); 
            this.scene.translate(this.midpointEvaluation(this.x1,this.x2),0.1,this.midpointEvaluation(this.z1,this.z2)); 
            this.scene.rotate(-this.angleBetweenTwoPoints(this.x1,this.z1,this.x2,this.z2),0,1,0); 
            this.scene.scale(this.length,1,this.trackWidth);
            this.appearance.apply();
            this.quad.display(); 
            this.scene.popMatrix();
            //this.scene.defaultAppearance.apply()
        }

    distanceBetweenTwoPoints(x1, z1, x2, z2){
        var dx = x1 - x2; 
        var dz = z1 - z2; 
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dz, 2)); 
    }

    midpointEvaluation(c1, c2){
        return ((c1+c2)/2); 
    }

    angleBetweenTwoPoints(x1, z1, x2, z2){
    // angle in radians
    return Math.atan2(z2 - z1, x2 - x1);

    // angle in degrees
    // angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
    }

}


