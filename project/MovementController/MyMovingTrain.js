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
		this.velocity = 0;
		this.cruisingSpeed = 0.01;
		this.acceleration = 0;
		this.isTrainJustStarted = false; 
		this.haveToAccelerate = true; 
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

		this.distance = this.distanceBetweenTwoPoints(this.x1, this.z1, this.x2, this.z2);
		
		if(t>=this.timeToArrive && !this.isStopped){

			if((this.track.setOfPoints[this.actualEdge].type == 'station')){
				if(!this.isTrainJustStarted){
					this.isStopped = true; 
					this.velocity = 0;
					this.acceleration = 0;
					this.angleVisualized = this.angle; 
					if(this.checkStopAtStation() == false){
						this.departure(); 
					}
					return; 
				}
				this.isTrainJustStarted = false; 
			}

			this.evaluateNextPoint();

			this.distance = this.distanceBetweenTwoPoints(this.x1, this.z1, this.x2, this.z2);

			if(this.haveToAccelerate){
				this.acceleration = Math.pow(this.cruisingSpeed, 2) / (2*(this.distance));
				this.haveToAccelerate = false; 
			} else if (this.track.setOfPoints[this.actualEdge].type == 'station') {
				this.acceleration = - (Math.pow(this.cruisingSpeed, 2)/ (2*this.distance));
			} else {
				this.acceleration = 0; 
				this.velocity = 0.01; 
			}

			this.initialTime = t;
			if(this.acceleration==0){
				this.timeToArrive = this.initialTime + this.distance/this.velocity;
			} else {
				this.timeToArrive = this.initialTime + Math.abs(this.cruisingSpeed/this.acceleration); 
			}
			
			this.evaluateTimeToFinishTurning(t); 
		}	



		if(!this.isStopped){
			this.smoothAngleTrain(t);

			if (this.acceleration != 0 && (this.velocity >= 0 && this.velocity <= this.cruisingSpeed)){
				this.velocity += this.acceleration * (t-this.initialTime); 
			}

									
			const dt = t-this.initialTime;

			this.x += this.velocity*dt*Math.cos(this.angle) 
			this.z += this.velocity*dt*Math.sin(this.angle) 
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

		this.x = this.x1; 
		this.z = this.z1; 
		this.track.evaluateNextAngle(); 
		this.track.evaluateNextPoint(); 
		this.actualEdge = this.nextEdge; 
		this.nextEdge = (this.nextEdge+1)%this.totalEdges;
	}

	smoothAngleTrain(t){
		if(t>=this.timeToArrive - this.gapForAngle){
			if(this.angle != this.track.getActualAngle()){
				this.angleVisualized += 0.1; 
			} 
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

		if(this.timeToFinishTurning > this.timeToArrive){
			this.timeToFinishTurning = this.timeToArrive; 
		}
	}

	checkStopAtStation(){
		let station = this.track.getActualStation(); 

		return ((this.flag == 0 && station.hasLoad) || (this.flag == 1 && !station.hasLoad))

	}

	departure(){
		if(this.isStopped){
			this.isStopped = false; 
			this.timeToArrive = 0; 
			this.isTrainJustStarted = true;
			this.haveToAccelerate = true; 
			this.track.nextStation(); 
		}
	}

	interact(){
		if (this.isStopped){

			let station = this.track.getActualStation(); 

			console.log("trying to interact!"); 
			if(this.train.crane.alfa >= -0.3 && this.train.crane.alfa <= 0.3 && this.train.crane.beta >= -0.6){
				console.log("catched!"); 
				if((this.train.crane.hasLoad && !this.train.container.hasLoad) || (!this.train.crane.hasLoad && this.train.container.hasLoad)){
					console.log("exchanced!"); 
					this.exchangeLoad(this.train.crane, this.train.container); 
				} 
			}


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

