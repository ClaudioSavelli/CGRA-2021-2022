import {CGFobject} from '../../lib/CGF.js';

export class MyMovingTrain extends CGFobject {
	constructor(scene, object, setOfPoints) {
		//N is the number of triangles/sides/points 
		super(scene);
		this.object = object; 
		this.setOfPoints = setOfPoints; 
		this.init()
	}

	init(){
		this.velocity = 0.01; 
		this.flag = 0; 

		this.x1 = this.setOfPoints[0].x; 
		this.z1 = this.setOfPoints[0].z; 
		this.x2 = this.setOfPoints[1].x; 
		this.z2 = this.setOfPoints[1].z;
		
		this.angle = this.angleBetweenTwoPoints(this.x1, this.z1, this.x2, this.z2);
		this.x = this.x1; 
		this.z = this.z1; 

		this.nextEdge = 2; 
		this.totalEdges = this.setOfPoints.length; 
	}

	update(t){
		if (this.flag == 0){
			this.initialTime = t;
			this.timeToArrive = this.initialTime+(this.distanceBetweenTwoPoints(this.x1, this.z1, this.x2, this.z2)*this.velocity*1000)*2;  
			this.flag = 1;
			console.log(this.initialTime); 
			console.log(this.timeToArrive); 
			console.log(this.distanceBetweenTwoPoints(this.x1, this.z1, this.x2, this.z2)*this.velocity); 
		}
		this.x += (this.velocity*(t-this.initialTime))*Math.cos(this.angle); 
		this.z += (this.velocity*(t-this.initialTime))*Math.sin(this.angle); 
		 
		if(t>=this.timeToArrive){
			console.log("Arrived!"); 
			//Evaluate new track informations
			this.x1 = this.x2; 
			this.z1 = this.z2;
			this.x2 = this.setOfPoints[this.nextEdge].x; 
			this.z2 = this.setOfPoints[this.nextEdge].z;
			this.angle = this.angleBetweenTwoPoints(this.x1, this.z1, this.x2, this.z2);
			
			this.flag = 0; 
			this.nextEdge++; 
			if(this.nextEdge==this.totalEdges){
				this.nextEdge = 0; 
			}
		}	
	}

	display(){
		this.scene.pushMatrix(); 
		this.scene.translate(this.x, 0, this.z);
		this.scene.rotate(Math.PI/2,0,1,0); 
		this.scene.rotate(-this.angle,0,1,0); 
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

	// angle in degree 
	//return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
	
} }
