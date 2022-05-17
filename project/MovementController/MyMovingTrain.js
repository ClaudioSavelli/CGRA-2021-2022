import {CGFobject} from '../../lib/CGF.js';

export class MyMovingTrain extends CGFobject {
	constructor(scene, object, setOfPoints) {
		//N is the number of triangles/sides/points 
		super(scene);
		this.object = object; 
		this.setOfPoints = setOfPoints; 
	}

	display(){
		this.scene.pushMatrix(); 
		//this.scene.translate(this.setOfPoints[0].x, this.setOfPoints[0].z);
		//this.scene.rotate(-this.angleBetweenTwoPoints(this.setOfPoints[0].x,this.setOfPoints[0].y,this.setOfPoints[1].x,this.setOfPoints[1].y),0,1,0); 
		this.object.display(); 
		this.scene.popMatrix();
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
	
} }

