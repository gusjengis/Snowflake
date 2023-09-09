// DRAWING FUNCTIONS

var drawFuncs = [];
function animateFlake(flake){
    var ang = document.getElementById('angleIterate').value;
    var rot = document.getElementById('rotIterate').value;
    var brch = document.getElementById('branchIterate').value;
    var width = document.getElementById('lineWidthIterate').value;
    var red = document.getElementById('redIterate').value;
    var green = document.getElementById('greenIterate').value;
    var blue = document.getElementById('blueIterate').value;
    if(ang == ""){
        ang = 0;
    }
    if(rot == ""){
        rot = 0;
    }
    if(brch == ""){
        brch = 0;
    }
    if(width == ""){
        width = 0;
    }
    if(red == ""){
        red = 0;
    }
    if(green == ""){
        green = 0;
    }
    if(blue == ""){
        blue = 0;
    }
    if(flake.animated == false){
        flake.animated = true;
        drawFuncs.push([function(t, ID){
            let thisFlake;
            for(i = 0; i<flakeArr.length; i++){
                if(flakeArr[i].ID == ID){
                    thisFlake = flakeArr[i];
                }
            }
            thisFlake.rot = thisFlake.rot +  (t/14)*eval(rot);
            thisFlake.bAngle = thisFlake.bAngle +  (t/14)*eval(ang);
            thisFlake.branches = thisFlake.branches + (t/14)*eval(brch);
            thisFlake.lineWidth = thisFlake.lineWidth + (t/14)*eval(width);
            for(a=0;a<thisFlake.layerArr.length;a++){
                thisFlake.layerArr[a].r = thisFlake.layerArr[a].r + (t/14)*eval(red);
                thisFlake.layerArr[a].g = thisFlake.layerArr[a].g + (t/14)*eval(green);
                thisFlake.layerArr[a].b = thisFlake.layerArr[a].b + (t/14)*eval(blue);
            }
            drawFlake(flake);
            if(thisFlake == flakeArr[cFlk]){
                populateMenus(thisFlake);
            }
        }, flake.ID]);
        
    } else {
        flake.animated = false;
        for(i = 0; i<drawFuncs.length; i++){
            if(drawFuncs[i][1] == flake.ID){
                drawFuncs.splice(i, 1);
                i--;
            }
        }
    }
    console.log(drawFuncs);
}

var prevTimestamp = Date.now();
function drawFlakes(timestamp){
    for(j = 0; j<drawFuncs.length; j++){
        drawFuncs[j][0](timestamp-prevTimestamp, drawFuncs[j][1]);
    }
    prevTimestamp = timestamp;
    requestAnimationFrame(drawFlakes);
}

function drawTray(){
    newFlake(7,"floor(graph.width/6)","floor(graph.height/5)",3, 1);
    newFlake(14,"floor(graph.width/6)","floor(graph.height/2)",3, 1);
    newFlake(21,"floor(graph.width/6)","floor(graph.height)-floor(graph.height/5)",3, 1);
    newFlake(7,"2*floor(graph.width/6)","floor(graph.height/5)",4, 1);
    newFlake(14,"2*floor(graph.width/6)","floor(graph.height/2)",4, 1);
    newFlake(21,"2*floor(graph.width/6)","floor(graph.height)-floor(graph.height/5)",4, 1);
    newFlake(7,"floor(graph.width/2)","floor(graph.height/5)",5, 1);
    newFlake(14,"floor(graph.width/2)","floor(graph.height/2)",5, 1);
    newFlake(21,"floor(graph.width/2)","floor(graph.height)-floor(graph.height/5)",5, 1);
    newFlake(10,"4*floor(graph.width/6)","floor(graph.height/5)",6, 1);
    newFlake(14,"4*floor(graph.width/6)","floor(graph.height/2)",6, 1);
    newFlake(21,"4*floor(graph.width/6)","floor(graph.height)-floor(graph.height/5)",6, 1);
    newFlake(13,"5*floor(graph.width/6)","floor(graph.height/5)",10, 1);
    newFlake(14,"5*floor(graph.width/6)","floor(graph.height/2)",10, 1);
    newFlake(21,"5*floor(graph.width/6)","floor(graph.height)-floor(graph.height/5)",10, 1);
    // for(k=0; k<flakeArr.length; k++){
    //     cFlk = k;
    //     populateMenus(flakeArr[k]);
    //     animateFlake(flakeArr[k]);
    // }
};

function drawFlake(flakeObj){
    if(trail == false){
        draw.clearRect(flakeObj.getX()-flakeObj.r*flakeObj.size,flakeObj.getY()-flakeObj.r*flakeObj.size,2*flakeObj.r*flakeObj.size,2*flakeObj.r*flakeObj.size);//draw.clearRect(0,0,graph.width,graph.height);//
        flakeObj.borderWidth = 2*flakeObj.size;
    } else if(trail == true && flakeObj.animated == true) {
        flakeObj.borderWidth = 2*flakeObj.size;
    }
    for(i=0;i<flakeObj.layerArr.length;i++){
        draw.strokeStyle = 'rgba('+(flakeObj.layerArr[i].r-255.00001*floor(flakeObj.layerArr[i].r/255.00001))+','+(flakeObj.layerArr[i].g-255.00001*floor(flakeObj.layerArr[i].g/255.00001))+','+(flakeObj.layerArr[i].b-255.00001*floor(flakeObj.layerArr[i].b/255.00001))+',1)';
        draw.strokeStyle = 'rgba(0,0,0,1 )';
        draw.lineWidth = flakeObj.lineWidth*flakeObj.size + flakeObj.borderWidth;
        allBranches(flakeObj.layerArr[i].length,flakeObj.size,flakeObj.layerArr[i].bAngle,flakeObj.layerArr[i].bLength+0.5*flakeObj.borderWidth/flakeObj.size,flakeObj.getX(),flakeObj.getY(),flakeObj.branches,flakeObj.rot,flakeObj.bAngle,flakeObj.bType,true,flakeObj.layerArr[i].borderColor);
        draw.strokeStyle = 'rgba('+(flakeObj.layerArr[i].r-255.00001*floor(flakeObj.layerArr[i].r/255.00001))+','+(flakeObj.layerArr[i].g-255.00001*floor(flakeObj.layerArr[i].g/255.00001))+','+(flakeObj.layerArr[i].b-255.00001*floor(flakeObj.layerArr[i].b/255.00001))+',1)';
        draw.lineWidth = flakeObj.lineWidth*flakeObj.size;
        allBranches(flakeObj.layerArr[i].length,flakeObj.size,flakeObj.layerArr[i].bAngle,flakeObj.layerArr[i].bLength,flakeObj.getX(),flakeObj.getY(),flakeObj.branches,flakeObj.rot,flakeObj.bAngle,flakeObj.bType,false);
    }
}

function allBranches(length,size,angle,bLength,midX,midY,branches,rotation,bAngle,bType,border,borderColor){
    var angleMod = 360/branches; 
    if(border == true){
        //draw.strokeStyle = borderColor;//rgba('+flakeObj.layerArr[i].r/2+','+flakeObj.layerArr[i].g/2+','+flakeObj.layerArr[i].b/2+',0.6 )';
    }
    for(n=0;n<branches;n++){
        branch(length,size,angle,bLength,midX,midY,branches,angleMod*n,rotation,bAngle,bType);
    }
}

function branch(length,size,angle,bLength,midX,midY,branches,angleMod,rotation,bAngle,bType){
    angle = angle + bAngle;
    draw.beginPath();
    if(branches/2 == floor(branches/2)){
        turtle.goTo(midX,midY,0+rotation+angleMod);
    } else {
        turtle.goTo(midX,midY,90+rotation+angleMod);
    }
    if(bType == "branch"){
        turtle.forward(length*size);
        turtle.left(angle);
        turtle.forward(bLength*size);
        turtle.left(180);
        turtle.forward(bLength*size);
        turtle.right(angle+180);
        turtle.forward(10+bLength*size*cos(angle));
        turtle.left(180);
        turtle.forward(10+bLength*size*cos(angle));
        turtle.right(angle+180);
        turtle.forward(bLength*size);
        turtle.left(180);
        turtle.forward(bLength*size);
        turtle.left(angle);
        turtle.forward(length*size);
    }
    if(bType == "squiggle"){
        turtle.forward(length*size);
        turtle.left(angle);
        turtle.forward(bLength*size/2);
        turtle.right(2*angle);
        turtle.forward(bLength*size/2);
        turtle.left(180);
        turtle.forward(bLength*size/2);
        turtle.left(2*angle);
        turtle.forward(bLength*size/2);
        turtle.right(angle);
        turtle.forward(length*size);
    }
    draw.stroke();
}

function reset(){
    for(o=0;o<flakeArr.length;o++){
        flakeArr[o].animated = false;
    }
    draw.clearRect(0,0,graph.width,graph.height);
    flakeArr.length = 0;
    drawFuncs = [];
    cFlk = -1;
    drawTray();
    collapseAll();
}