import {CGFobject, CGFappearance, CGFtexture} from '../../../lib/CGF.js';
import { MyTrackSegment } from './MyTrackSegment.js';

export class MyTrack extends CGFobject{
    constructor(scene, setOfPoints) {
        super(scene);
        this.trackWidth = 4; 
        this.trackSegmentArray = []; 

		this.scene = scene;
        this.setOfPoints = setOfPoints; 
        this.createTextures();
        this.init(scene); 
    }

    createTextures() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1, 1, 1, 1);
        this.appearance.setDiffuse(1, 1, 1, 1);
        this.appearance.setSpecular(0, 0, 0, 1);
        this.appearance.setShininess(120);

        this.texture = new CGFtexture(this.scene, "./images/tracks.png");
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    init(scene){
         //Coordinates of the first previous point
         var x1 = this.setOfPoints[0].x;
         var z1 = this.setOfPoints[0].z;
 
         for(let i = 1; i < this.setOfPoints.length; i++){
             //Every square is generated with the centre in (0,0,0), so the aim is to 
             //resize it, then rotate it and in the end traslate it in the right spot 
 
             //Coordinates of the actual point
             var x2 = this.setOfPoints[i].x; 
             var z2 = this.setOfPoints[i].z; 
 
             this.trackSegmentArray.push(new MyTrackSegment(scene, x1, z1, x2, z2)); 
 
 
             //Coordinates of the next previous point
             x1 = x2; 
             z1 = z2; 
         }
 
         //For the last one, I put as p2 the initial point again
         x2 = this.setOfPoints[0].x; 
         z2 = this.setOfPoints[0].z; 
         this.trackSegmentArray.push(new MyTrackSegment(scene, x1, z1, x2, z2)); 
    }

    display(){
    
        for(let i = 0; i < this.trackSegmentArray.length; i++){
            this.trackSegmentArray[i].display(); 
        }
        this.scene.setDefaultAppearance();
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

    
    textureFactor(x1, z1, x2, z2) {
        return 1/Math.sqrt(Math.pow(x2-x1, 2)+ Math.pow(z2-z1, 2))
    }
    
}


