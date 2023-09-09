// GLOBAL OBJECTS/DATA STRUCTURES

var cFlk = -1;
var cLyr = -1;
var trail = false;
var flakeArr = new Array();
var flakeLayer = function(){
    this.length = (25*Math.random()+20);//*(document.documentElement.clientWidth/1920);
    this.bAngle = (360*Math.random()-180);
    this.bLength = (40*Math.random()+20);//*(document.documentElement.clientWidth/1920);
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.borderColor = 'black';
    if(Math.random() < 0.75){
        this.r = 255*Math.random();
    }
    if(Math.random() < 0.75){
        this.g = 255*Math.random()/2;
    }
    if(Math.random() < 0.75){
        this.b = 3*255*Math.random()/4;
    }
    this.OGr = this.r;
    this.OGg = this.g;
    this.OGb = this.b;
}

var flakeID = 0;
var wholeFlake = function(){
    this.ID = flakeID++;
    this.x = "0";
    this.y = "0";
    this.r = 0;
    this.bType = "branch";
    this.branches = 0;
    this.OGbranches = 0;
    this.size = 0;
    this.rot = 0;
    this.bAngle = 0;
    this.animated = false;
    this.lineWidth = 2;//*(document.documentElement.clientWidth/1920);
    this.borderWidth = 4;//*(document.documentElement.clientWidth/1920);
    this.layerArr = new Array();

    this.getX = function() {
        return eval(this.x);
    }

    this.getY = function() {
        return eval(this.y);
    }
}

var turtleObj = function(){
    this.dir = function(){
        this.angle;
        this.x;
        this.y;
    }
    this.goTo = function(x,y,absAngle){
        this.x = x;
        this.y = y;
        this.dir.angle = absAngle;
        this.getUnitVector();
        draw.moveTo(x,y);
    }
    this.getUnitVector = function(){
        this.dir.x = cos(this.dir.angle);
        this.dir.y = -sin(this.dir.angle);
    }
    this.forward = function(length){
        this.x = this.x + length * this.dir.x;
        this.y = this.y + length * this.dir.y;
        draw.lineTo(this.x,this.y);
    }
    this.left = function(angle){
        this.dir.angle = this.dir.angle + angle;
        this.getUnitVector();
    }
    this.right = function(angle){
        this.dir.angle = this.dir.angle - angle;
        this.getUnitVector();
    }
}

var turtle = new turtleObj();

function newFlake(loops,xCoord,yCoord,branches,size){
    var r;
    flakeArr[flakeArr.length] = new wholeFlake;
    flakeArr[flakeArr.length-1].x = xCoord;
    flakeArr[flakeArr.length-1].y = yCoord;
    flakeArr[flakeArr.length-1].branches = branches;
    flakeArr[flakeArr.length-1].OGbranches = branches;
    flakeArr[flakeArr.length-1].size = size;
    // if(bType != null){
    //     flakeArr[flakeArr.length-1].bType = bType;
    // }
    flakeArr[flakeArr.length-1].layerArr[0] = new flakeLayer();
    r = flakeArr[flakeArr.length-1].layerArr[0].length  + 2*flakeArr[flakeArr.length-1].layerArr[0].bLength  +  10;
    for(i=1;i<loops;i++){
        flakeArr[flakeArr.length-1].layerArr[i] = new flakeLayer();
        flakeArr[flakeArr.length-1].layerArr[i].length = flakeArr[flakeArr.length-1].layerArr[i].length;
        flakeArr[flakeArr.length-1].layerArr[i].bLength = flakeArr[flakeArr.length-1].layerArr[i].bLength;
        if(r<(flakeArr[flakeArr.length-1].layerArr[i].length  +  2*flakeArr[flakeArr.length-1].layerArr[i].bLength  +  10)){
            r = (flakeArr[flakeArr.length-1].layerArr[i].length  +  2*flakeArr[flakeArr.length-1].layerArr[i].bLength  +  10);
        }
    }
    flakeArr[flakeArr.length-1].r = r/1.3;
    let max = 0;
    for(i=0; i<flakeArr[flakeArr.length-1].layerArr.length; i++){
        if(flakeArr[flakeArr.length-1].layerArr[i].r > max){
            max = flakeArr[flakeArr.length-1].layerArr[i].r;
        }
        if(flakeArr[flakeArr.length-1].layerArr[i].g > max){
            max = flakeArr[flakeArr.length-1].layerArr[i].g;
        }
        if(flakeArr[flakeArr.length-1].layerArr[i].b > max){
            max = flakeArr[flakeArr.length-1].layerArr[i].b;
        }
    }

    for(i=0; i<flakeArr[flakeArr.length-1].layerArr.length; i++){
        flakeArr[flakeArr.length-1].layerArr[i].r *= 255/max; 
        flakeArr[flakeArr.length-1].layerArr[i].OGr *= 255/max; 

        flakeArr[flakeArr.length-1].layerArr[i].g *= 255/max; 
        flakeArr[flakeArr.length-1].layerArr[i].OGg *= 255/max; 

        flakeArr[flakeArr.length-1].layerArr[i].b *= 255/max; 
        flakeArr[flakeArr.length-1].layerArr[i].OGb *= 255/max; 
    }

    drawFlake(flakeArr[flakeArr.length-1]);
}


function newFlakeReplace(loops,xCoord,yCoord,branches,bType){
    var r;
    let newFlake = new wholeFlake;
    newFlake.x = xCoord;
    newFlake.y = yCoord;
    newFlake.branches = branches;
    newFlake.OGbranches = branches;
    if(bType != null){
        newFlake.bType = bType;
    }
    newFlake.layerArr[0] = new flakeLayer();
    r = newFlake.layerArr[0].length  + 2*newFlake.layerArr[0].bLength  +  10;
    for(i=1;i<loops;i++){
        newFlake.layerArr[i] = new flakeLayer();
        newFlake.layerArr[i].length = newFlake.layerArr[i].length;
        newFlake.layerArr[i].bLength = newFlake.layerArr[i].bLength;
        if(r<(newFlake.layerArr[i].length  +  2*newFlake.layerArr[i].bLength  +  10)){
            r = (newFlake.layerArr[i].length  +  2*newFlake.layerArr[i].bLength  +  10);
        }
    }
    newFlake.r = r/1.3;
    drawFlake(newFlake);
    return newFlake;
}