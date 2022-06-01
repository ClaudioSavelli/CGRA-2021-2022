import {CGFobject, CGFappearance, CGFtexture} from '../../../lib/CGF.js';
import { MyStationModel } from '../Station/MyStationModel.js';
import { MyTrackSegment } from './MyTrackSegment.js';

export class MyTrack extends CGFobject{
    constructor(scene, setOfPoints) {
        super(scene);
        this.trackWidth = 4; 
        this.trackSegmentArray = []; 
        this.angleArray = [];
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
        console.log(this.setOfPoints.length);
         for(let i = 1; i < this.setOfPoints.length; i++){
            //Every square is generated with the centre in (0,0,0), so the aim is to 
            //resize it, then rotate it and in the end traslate it in the right spot 

            //Coordinates of the actual point
            var x2 = this.setOfPoints[i].x;
            var z2 = this.setOfPoints[i].z;

            const angle  = this.angleBetweenTwoPoints(x1, z1, x2, z2);
            const middleX = x2
            const middleZ = z2
            console.log(i + " " + x2 + " " + z2);
            console.log(this.setOfPoints[i].type == "station");
            this.trackSegmentArray.push(new MyTrackSegment(scene, x1, z1, x2, z2, angle, 
                this.setOfPoints[i].type == "station", middleX, middleZ,
                this.setOfPoints[i].side, this.setOfPoints[i].hasLoad)); 

        
             //Coordinates of the next previous point
             x1 = x2; 
             z1 = z2; 
         }
 
         //For the last one, I put as p2 the initial point again
         x2 = this.setOfPoints[0].x; 
         z2 = this.setOfPoints[0].z; 

        const angle  = this.angleBetweenTwoPoints(x1, z1, x2, z2);
        const middleX = x2;
        const middleZ = z2;
        this.trackSegmentArray.push(new MyTrackSegment(scene, x1, z1, x2, z2, angle, 
            this.setOfPoints[this.setOfPoints.length-1].type == "station", middleX, middleZ, 
            this.setOfPoints[this.setOfPoints.length-1].side, this.setOfPoints[this.setOfPoints.length-1].hasLoad)); 

        this.stationArray = [];

        console.log(this.trackSegmentArray)
        for (const segment of this.trackSegmentArray) {
            if (segment.hasStation) {
                this.stationArray.push(new MyStationModel(this.scene, segment.angle,
                         segment.middleX, segment.middleZ, segment.hasLoad, segment.side))
            }
        }
        this.stationArray.pop()
        console.log(this.stationArray)
    }

    display(){
    
        for(let i = 0; i < this.trackSegmentArray.length; i++){
            this.trackSegmentArray[i].display(); 
        }

        for(let i = 0; i < this.stationArray.length; i++){
            this.stationArray[i].display(); 
        }

        console.log("size " + this.stationArray.length);
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


