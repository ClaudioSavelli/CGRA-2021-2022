import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

export class MyTrack extends CGFobject{
    constructor(scene) {
        super(scene);
        this.trackWidth = 4; 

		this.scene = scene;

       this.init(scene); 
    }
    

    init(scene){
        this.setOfPoints = [
            {x: 3, z: 3, type: 'simple'},
            {x: 4, z: 2, type: 'station'},
            {x: 6, z: 2, type: 'simple'},
            {x: 7, z: 3, type: 'station'}
          ]
    
          this.quad = new MyQuad(scene); 
    }

    display(){
        //Coordinates of the first previous point
        var x1 = this.setOfPoints[0].x; 
        var z1 = this.setOfPoints[0].z; 

        for(let i = 1; i < this.setOfPoints.length; i++){
            //Every square is generated with the centre in (0,0,0), so the aim is to 
            //resize it, then rotate it and in the end traslate it in the right spot 

            //Coordinates of the actual point
            var x2 = this.setOfPoints[i].x; 
            var z2 = this.setOfPoints[i].z; 

            
            this.scene.pushMatrix(); 
            this.scene.translate(this.midpointEvaluation(x1,x2),0,this.midpointEvaluation(z1,z2)); 
            this.scene.rotate(-this.angleBetweenTwoPoints(x1,z1,x2,z2),0,1,0); 
            this.scene.scale(this.distanceBetweenTwoPoints(x1, z1, x2, z2),1,1); 
            this.quad.display(); 
            this.scene.popMatrix(); 

            //Coordinates of the next previous point
            x1 = x2; 
            z1 = z2; 
        }

        //For the last one, I put as p2 the initial point again
        x2 = this.setOfPoints[0].x; 
        z2 = this.setOfPoints[0].z; 
        this.scene.pushMatrix(); 
        this.scene.translate(this.midpointEvaluation(x1,x2),0,this.midpointEvaluation(z1,z2)); 
        this.scene.rotate(-this.angleBetweenTwoPoints(x1,z1,x2,z2),0,1,0); 
        this.scene.scale(this.distanceBetweenTwoPoints(x1, z1, x2, z2),1,1); 
        this.quad.display(); 
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

    // angle in degrees
    // angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
    }

    
   
}


