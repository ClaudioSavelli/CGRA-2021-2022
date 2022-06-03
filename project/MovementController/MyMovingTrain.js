import {CGFobject} from '../../lib/CGF.js';

export class MyMovingTrain extends CGFobject {
	constructor(scene, train, trackInWhichIHaveToMove) {
		super(scene);
		this.train = train; 
		this.smoke = train.smoke; 
		this.track = trackInWhichIHaveToMove;  
		this.init()
	}

	init(){
		this.velocity = 0.01; 
		this.isTrainJustStarted = 0; 
		this.timeToArrive = 0; 
		this.isStopped = false;
		this.gapForAngle = 500;  

		this.flag = 0; //=0 if we want to load on train, =1 if we want to release in station

		this.x2 = this.track.setOfPoints[0].x; 
		this.z2 = this.track.setOfPoints[0].z;
		
		this.angle = this.track.getActualAngle();
		this.angleVisualized = this.track.evaluateMiddleAngle(); 
		this.x = this.x1; 
		this.z = this.z1; 

		this.actualEdge = 0; 
		this.nextEdge = 1; 
		this.totalEdges = this.track.setOfPoints.length; 
	}

	update(t){
		this.smoke.update(t); 
		if(t>=this.timeToArrive && !this.isStopped){

			if((this.track.setOfPoints[this.actualEdge].type == 'station')){
				console.log("I'm on a station!"); 
				if(this.isTrainJustStarted == 0){
					console.log("Entered in the if!"); 
					this.isStopped = true; 
					this.velocity = 0;
					this.angleVisualized = this.angle; 
					if(this.checkStopAtStation() == false){
						console.log("entered in the checkStopAtStation if!"); 
						this.departure(); 
					}
					return; 
				}
				 this.isTrainJustStarted = 0; 
			}

			this.evaluateNextPoint(); 

			this.initialTime = t;
			this.timeToArrive = this.initialTime+(this.distanceBetweenTwoPoints(this.x1, this.z1, this.x2, this.z2)/(this.velocity));
			this.evaluateTimeToFinishTurning(t); 
		}	



		if(!this.isStopped){
			this.smoothAngleTrain(t); 	
			this.x += (this.velocity*(t-this.initialTime))*Math.cos(this.angle); 
			this.z += (this.velocity*(t-this.initialTime))*Math.sin(this.angle); 
		}

		this.initialTime = t; 
        this.train.wheel.rotation(this.velocity*100); 
	}

	display(){
		this.scene.pushMatrix(); 
		this.scene.translate(this.x, 0, this.z);
		this.scene.rotate(Math.PI/2,0,1,0); 
		this.scene.rotate(-this.angleVisualized,0,1,0); 
		this.train.display(); 
		this.scene.popMatrix();
	}

	evaluateNextPoint(){
		this.x1 = this.x2; 
		this.z1 = this.z2;
		this.x2 = this.track.setOfPoints[this.nextEdge].x; 
		this.z2 = this.track.setOfPoints[this.nextEdge].z;
		this.angle = this.track.getActualAngle();
		//this.angleVisualized = this.track.evaluateMiddleAngle(); 

		this.x = this.x1; 
		this.z = this.z1; 
		this.track.evaluateNextAngle(); 
		this.actualEdge = this.nextEdge; 
		this.nextEdge++; 
		if(this.nextEdge==this.totalEdges){
			this.nextEdge = 0; 
		}
	}

	smoothAngleTrain(t){
		//this.normalizeAngleVisualized(); 
		if(t>=this.timeToArrive - this.gapForAngle){
			if(this.angle != this.track.getActualAngle()){
				this.angleVisualized += 0.1; 
			} 
			//console.log("The actual visualized angle is " + this.angleVisualized)
			//console.log("The actual angle is " + this.track.getActualAngle()); 
	}
	else if(t<=this.timeToFinishTurning){
		if(this.angleVisualized < this.angle || (this.angleVisualized>0 && this.angle<0)){
			this.angleVisualized+=0.1		} 
	} else {
		this.angleVisualized = this.angle; 
	}
	}

	evaluateTimeToFinishTurning(t){
		this.timeToFinishTurning = t+this.gapForAngle; 
		//console.log("time to finish turning = "+this.timeToFinishTurning)
		//console.log("time to arrive = "+this.timeToArrive)

		if(this.timeToFinishTurning > this.timeToArrive){
			this.timeToFinishTurning = this.timeToArrive; 
		}
	}

	/* TO ELIMINATE
	normalizeAngleVisualized(){
		if(this.angleVisualized>4){
			this.angleVisualized -= 6.3; //this is necessary to keep the train in the interested range of the scene, that is, more or less -2<angle<4
		}
	}*/

	checkStopAtStation(){
		let station = this.track.getActualStation(); 

		return ((this.flag == 0 && station.hasLoad) || (this.flag == 1 && !station.hasLoad))

	}

	departure(){
		if(this.isStopped){
			this.velocity = 0.01; 
			this.isStopped = false; 
			this.timeToArrive = 0; 
			this.isTrainJustStarted = 1; 
			this.track.nextStation(); 
		}
	}

	interact(){
		if (this.isStopped){

			let station = this.track.getActualStation(); 

			console.log("trying to interact!"); 
			//Interact with the container in the Train 
			if(this.train.crane.alfa >= -0.3 && this.train.crane.alfa <= 0.3 && this.train.crane.beta >= -0.6){
				console.log("catched!"); 
				if((this.train.crane.hasLoad && !this.train.container.hasLoad) || (!this.train.crane.hasLoad && this.train.container.hasLoad)){
					console.log("exchanced!"); 
					this.exchangeLoad(this.train.crane, this.train.container); 
				} 
			}


			//Interact with the container in the station 
			else if (station.side == "left" && this.angle<=0 || station.side == "right" && this.angle > 0){
				if(this.train.crane.alfa <= -1.5 && this.train.crane.beta <= -1.3){
				console.log("catched!"); 
				if((this.train.crane.hasLoad && !station.hasLoad) || (!this.train.crane.hasLoad && station.hasLoad)){
					console.log("exchanced!"); 
					this.exchangeLoad(this.train.crane, station);
				}}}

			else{
				if(this.train.crane.alfa >= 1.5 && this.train.crane.beta <= -1.3){
					console.log("catched!"); 
					if((this.train.crane.hasLoad && !station.hasLoad) || (!this.train.crane.hasLoad && station.hasLoad)){
						console.log("exchanced!"); 
						this.exchangeLoad(this.train.crane, station);
					}}}

			this.checkIfWeCanGo(station); 
		}
	}

	exchangeLoad(a,b){
		a.hasLoad = !a.hasLoad; 
		b.hasLoad = !b.hasLoad; 
	}

	checkIfWeCanGo(station){
		if(this.flag == 0){
			//We want the train loaded
			if(this.train.container.hasLoad){
				this.flag = 1; 
				this.departure(); 
			}
		}
		else {
			//We want the train empty
			if(station.hasLoad){
				this.flag = 0; 
				this.departure(); 
			}
		}
	}

	distanceBetweenTwoPoints(x1, z1, x2, z2){
        var dx = x1 - x2; 
        var dz = z1 - z2; 
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dz, 2)); 
    }
}

