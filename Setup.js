// SETUP

var graph = document.getElementById('display');
var draw = graph.getContext('2d');
var pixelRatio = window.devicePixelRatio;
document.body.style.zoom=1/pixelRatio;
graph.width = ((pixelRatio)*document.documentElement.getBoundingClientRect().width - 320);
graph.height = (document.body.getBoundingClientRect().height*0.997);

//document.getElementById('settingsBlock').style.height = (graph.height - 3);
draw.translate(0.5,0.5);


window.onresize = function(){
    pixelRatio = window.devicePixelRatio;
    document.body.style.zoom=1/pixelRatio;
    graph.width = ((pixelRatio)*document.documentElement.getBoundingClientRect().width - 320);
    graph.height = (document.body.getBoundingClientRect().height*0.997);
    for(k=0; k<flakeArr.length; k++){
        drawFlake(flakeArr[k]);
    }
}