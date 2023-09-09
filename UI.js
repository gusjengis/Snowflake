// UI

function uiLogic(){
    graph.onclick = click;
    dropMenu();
    document.getElementById('rot').onchange = function(){
        applySettings(cFlk,cLyr);
    }
    document.getElementById('bAngle').onchange = function(){
        applySettings(cFlk,cLyr);
    }
    document.getElementById('layerRed').onchange = function(){
        applySettings(cFlk,cLyr);
    }
    document.getElementById('layerGreen').onchange = function(){
        applySettings(cFlk,cLyr);
    }
    document.getElementById('layerBlue').onchange = function(){
        applySettings(cFlk,cLyr);
    }
    document.getElementById('angle').onchange = function(){
        applySettings(cFlk,cLyr);
    }
    document.getElementById('length').onchange = function(){
        applySettings(cFlk,cLyr);
    }
    document.getElementById('bLength').onchange = function(){
        applySettings(cFlk,cLyr);
    }
    document.getElementById('type').onchange = function(){
        applySettings(cFlk,cLyr);
    }
    document.getElementById('trailButton').onclick = function(){
        if(trail == false){
            trail = true;
            document.getElementById('trailButton').value = "Trail: On"
        } else {
            trail = false;
            document.getElementById('trailButton').value = "Trail: Off"
        }
    }
    document.getElementById('flakeSettingsReset').onclick = resetFlake;
    document.getElementById('flakeReplace').onclick = function(){
        if(cFlk != -1){
            flakeArr[cFlk].animated = false;
            flakeArr[cFlk].branches = flakeArr[cFlk].OGbranches;
            document.getElementById('branches').value = flakeArr[cFlk].OGbranches;
            document.getElementById('rot').value = 0;
            document.getElementById('bAngle').value = 0;
            applySettings(cFlk,cLyr);
        }
        draw.clearRect(flakeArr[cFlk].getX()-flakeArr[cFlk].r,flakeArr[cFlk].getY()-flakeArr[cFlk].r,2*flakeArr[cFlk].r,2*flakeArr[cFlk].r);
        
        flakeArr[cFlk] = newFlakeReplace(flakeArr[cFlk].layerArr.length,flakeArr[cFlk].x,flakeArr[cFlk].y,flakeArr[cFlk].branches,flakeArr[cFlk].bType);;
    }
}

function resetFlake(){
    if(cFlk != -1){ 
        flakeArr[cFlk].branches = flakeArr[cFlk].OGbranches;
        document.getElementById('branches').value = flakeArr[cFlk].OGbranches;
        document.getElementById('rot').value = 0;
        document.getElementById('bAngle').value = 0;
        flakeArr[cFlk].lineWidth = 2;
        flakeArr[cFlk].borderWidth = 4;
        for(i=0;i<flakeArr[cFlk].layerArr.length;i++){
            flakeArr[cFlk].layerArr[i].r = flakeArr[cFlk].layerArr[i].OGr;
            flakeArr[cFlk].layerArr[i].g = flakeArr[cFlk].layerArr[i].OGg;
            flakeArr[cFlk].layerArr[i].b = flakeArr[cFlk].layerArr[i].OGb;
        }
        applySettings(cFlk,cLyr);
    }
}

function buttonOnClick(bID){
    cLyr = bID;
    var layer = flakeArr[cFlk].layerArr[bID];
    for(e=0;e<flakeArr[cFlk].layerArr.length;e++){
        flakeArr[cFlk].layerArr[e].borderColor = 'black';
    }   
    document.getElementById('layerSettings').style.display = "block";
    layer.borderColor = '#7f7f7f';
    drawFlake(flakeArr[cFlk]);
    document.getElementById('layerRed').value = layer.r;
    document.getElementById('layerGreen').value = layer.g;
    document.getElementById('layerBlue').value = layer.b;
    document.getElementById('angle').value = layer.bAngle;
    document.getElementById('length').value = layer.length;
    document.getElementById('bLength').value = layer.bLength;
}

function populateMenus(flkObj){
    document.getElementById('branches').value = flkObj.branches;
    document.getElementById('rot').value = flkObj.rot-360*floor(flkObj.rot/360);
    document.getElementById('bAngle').value = flkObj.bAngle-360*floor(flkObj.bAngle/360);
    document.getElementById('type').value = flkObj.bType;
    var element = document.getElementById("layerSelect");
    element.innerHTML = "";
    for(q=0;q<flkObj.layerArr.length;q++){
        var button = document.createElement("input");
        button.id = q;
        button.type = "button";
        button.class = "settingsButton border layerButton";
        button.value = "Layer "+(q+1);
        button.style = "width:300px; background-color:  rgba(0,20,55); color: white; font-family:monospace;";
        //console.log(button);
        button.addEventListener('click',function(){
            buttonOnClick(this.id)
        });
        document.getElementById('layerRed').value = flkObj.layerArr[cFlk].r-255*floor(flkObj.layerArr[cFlk].r/255);
        document.getElementById('layerGreen').value = flkObj.layerArr[cFlk].g-255*floor(flkObj.layerArr[cFlk].g/255);
        document.getElementById('layerBlue').value = flkObj.layerArr[cFlk].b-255*floor(flkObj.layerArr[cFlk].b/255);
        document.getElementById('angle').value = flkObj.layerArr[cFlk].bAngle;
        document.getElementById('length').value = flkObj.layerArr[cFlk].length;
        document.getElementById('bLength').value = flkObj.layerArr[cFlk].bLength;
        element.appendChild(button);
    }
}

function applySettings(index,indexTwo){
    if(cFlk != -1){
        draw.clearRect(flakeArr[index].getX()-flakeArr[index].r,flakeArr[index].getY()-flakeArr[index].r,2*flakeArr[index].r,2*flakeArr[index].r);
        flakeArr[index].branches = eval(document.getElementById('branches').value);
        flakeArr[index].rot = eval(document.getElementById('rot').value);
        flakeArr[index].bAngle = eval(document.getElementById('bAngle').value);
        flakeArr[index].bType =document.getElementById('type').value;
        if(cLyr != -1){
            flakeArr[index].layerArr[indexTwo].r = document.getElementById('layerRed').value;
            flakeArr[index].layerArr[indexTwo].g = document.getElementById('layerGreen').value;
            flakeArr[index].layerArr[indexTwo].b = document.getElementById('layerBlue').value;
            // flakeArr[index].layerArr[indexTwo].bAngle = document.getElementById('angle').value;
            // flakeArr[index].layerArr[indexTwo].length = document.getElementById('length').value;
            // flakeArr[index].layerArr[indexTwo].bLength = document.getElementById('bLength').value;
        }
        drawFlake(flakeArr[index]);
    }
}

function dropMenu() {
    var header = document.getElementById("flakeSettingsHeader");
    header.onclick = function(){
        var menu = document.getElementById("flakeSettings");
        if (menu.style.display === "none") {
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
    }
    var headerOne = document.getElementById("animationSettingsHeader");
    headerOne.onclick = function(){
        var menu = document.getElementById("animationSettings");
        if (menu.style.display === "none") {
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
    }
    var headerTwo = document.getElementById("layerSelectHeader");
    headerTwo.onclick = function(){
        var menu = document.getElementById("layerSelect");
        if (menu.style.display === "none") {
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
    }
    var headerThree = document.getElementById("layerSettingsHeader");
    headerThree.onclick = function(){
        var menu = document.getElementById("layerSettings");
        if (menu.style.display === "none") {
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
    }
    var headerFour = document.getElementById("batchSettingsHeader");
    headerFour.onclick = function(){
        var menu = document.getElementById("batchSettings");
        if (menu.style.display === "none") {
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
    }
}

function clickHitCheck(flkArray){
    for(p=0;p<flkArray.length;p++){
        if(flkArray[p].getX()-flkArray[p].r<event.clientX*window.devicePixelRatio && event.clientX*window.devicePixelRatio<flkArray[p].getX()+flkArray[p].r && flkArray[p].getY()-flkArray[p].r<event.clientY*window.devicePixelRatio && event.clientY*window.devicePixelRatio<flkArray[p].getY()+flkArray[p].r){
            return p;
        }
    }
    return -1;
}

function click(){
    if(clickHitCheck(flakeArr) != -1){
        cFlk = clickHitCheck(flakeArr);
        populateMenus(flakeArr[cFlk]);
        document.getElementById("flakeSettings").style.display = "block";
        //document.getElementById("layerSelect").style.display = "block";
        document.getElementById("layerSettings").style.display = "none";
        for(g=0;g<flakeArr.length;g++){
            if(g != cFlk){
                for(e=0;e<flakeArr[g].layerArr.length;e++){
                    flakeArr[g].layerArr[e].borderColor = 'black';
                }
                drawFlake(flakeArr[g]);
            }
        }
    } else {
        cFlk = -1;
    }
}

function collapseAll(){
    document.getElementById("flakeSettings").style.display = "none";
    document.getElementById("animationSettings").style.display = "none";
    document.getElementById("layerSelect").innerHTML = "";
    document.getElementById("layerSelect").style.display = "none";
    document.getElementById("layerSettings").style.display = "none";
}

document.onkeypress = function(e){
    if(document.activeElement.className != "settingsTextBox"){
        if(cFlk != -1){
            if(e.keyCode == 32){
                animateFlake(flakeArr[cFlk]);
                // for(k=0; k<flakeArr.length; k++){
                //     cFlk = k;
                //     populateMenus(flakeArr[k]);
                //     animateFlake(flakeArr[k]);
                // }
            }
            if(e.keyCode == 13){
                applySettings(cFlk,cLyr);
            }
            if(e.keyCode == 114){
                resetFlake();
            }
        } else {
            if(e.keyCode == 32){
                for(k=0; k<flakeArr.length; k++){
                    cFlk = k;
                    populateMenus(flakeArr[k]);
                    animateFlake(flakeArr[k]);
                }
                cFlk = -1;
                
            }
            if(e.keyCode == 114){
                for(k=0; k<flakeArr.length; k++){
                    cFlk = k;
                    resetFlake();
                }
                cFlk = -1;
            }
        }
        if(e.keyCode == 110){
            reset();
        }
    }
}