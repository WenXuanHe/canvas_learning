var $ = (selector) => {
    return document.querySelector(selector) || document.body;
}

var canvas = $('#canvas');
var context = canvas.getContext('2d');
var rubberbandDiv = $("#rubberbandDiv");
var resetButton = $("#resetButton");
var image = new Image();
// 起始位置的坐标信息
var mouseDown = {};
// 选择框的属性信息
var rubberbandRectangle = {};
// 可拖动选择
var dragging = false;

function rubberbandStart(x, y){
    mouseDown.x = x;
    mouseDown.y = y;

    rubberbandRectangle.left = mouseDown.x;
    rubberbandRectangle.top = mouseDown.y;

    moveRubberbandDiv();
    showRubberbandDiv();

    dragging = true;
}

// 重置选择框的起点
function moveRubberbandDiv(){
    rubberbandDiv.style.top = rubberbandRectangle.top + 'px';
    rubberbandDiv.style.left = rubberbandRectangle.left + 'px';
}

// 展示选择框
function showRubberbandDiv(){
    rubberbandDiv.style.display="inline";
}

function rubberbandStretch(x, y){
    rubberbandRectangle.left = x < mouseDown.x ? x : mouseDown.x
    rubberbandRectangle.top = y < mouseDown.y ? y : mouseDown.y

    rubberbandRectangle.width = Math.abs(x-mouseDown.x);
    rubberbandRectangle.height = Math.abs(y-mouseDown.y);

    moveRubberbandDiv();
    resizeRubberbandDiv();
}

function rubberbandEnd(){
    var box = canvas.getBoundingClientRect();

    try{
        context.drawImage(
        canvas, 
        rubberbandRectangle.left - box.left, 
        rubberbandRectangle.top-box.top,
        rubberbandRectangle.width,
        rubberbandRectangle.height,
        0, 0, canvas.width, canvas.height)
    }catch(e){

    }

    resetRubberbandRectangle();
    rubberbandDiv.style.width = 0;
    rubberbandDiv.style.height = 0;

    hideRubberBandDiv();

    dragging = false;
}

// 实时改变选择区域的大小
function resizeRubberbandDiv(){
    rubberbandDiv.style.width = rubberbandRectangle.width + 'px';
    rubberbandDiv.style.height = rubberbandRectangle.height + 'px';
}

function hideRubberBandDiv(){
    rubberbandDiv.style.display="none";
}

function resetRubberbandRectangle(){
    rubberbandRectangle = {
        top: 0,
        left: 0,
        width: 0,
        height: 0
    }
}


canvas.onmousedown = function(e){
    var x = e.clientX;
    var y = e.clientY;

    e.preventDefault();
    rubberbandStart(x, y);
}

window.onmousemove = function(e){
    var x = e.clientX;
    var y = e.clientY;

    e.preventDefault();
    if(dragging){
        rubberbandStretch(x, y);
    }
}

window.onmouseup = function(e){
    e.preventDefault();
    rubberbandEnd();
}

image.onload = function(){
    
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

resetButton.onclick = function(e){
    context.clearRect(0, 0, canvas.width, canvas.height);
    // 缩放图片
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

image.src = "../public/images/crate.jpg";