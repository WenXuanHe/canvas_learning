import event from './event'
import Polygon  from './polygon'
let { $, windowToCanvas} = event
var canvas = $('#canvas');
var context = canvas.getContext('2d');
var eraseAllButton = $("#eraseAllButton"), 
    strokeStyleSelect = $("#strokeStyleSelect"), 
    fillStyleSelect = $("#fillStyleSelect"), 
    fillCheckbox = $("#fillCheckbox"),
    editCheckbox = $("#editCheckbox"), 
    sidesSelect = $("#sidesSelect");

function  drawPolygon(polygon){
  context.beginPath();
  polygon.createPath(context);
  polygon.stroke(context);
  if(fillCheckbox.checked){
    polygon.fill(context);
  }
}

function updateRubberbandRectangle(loc){
  rubberbandRect.left = mousedown.x < loc.x ? mousedown.x : loc.x
  rubberbandRect.top = mousedown.y < loc.y ? mousedown.y : loc.y

  rubberbandRect.width = Math.abs(loc.x - mousedown.x);
  rubberbandRect.height = Math.abs(loc.y - mousedown.y);
}

function drawRubberbandShape(loc, sides, startAngle){
  var polygon = new Polygon(mousedown.x, mousedown.y, 
    rubberbandRect.width, parseInt(sidesSelect.value), 
    Math.PI/180 * parseInt(startAngleSelect.value), 
    context.strokeStyle, context.fillStyle, fillCheckbox.value);

    drawPolygon(polygon);

    if(!dragging){
      polygons.push(dragging)
    }
}

function updateRubberband(loc, sides, startAngle){
  updateRubberbandRectangle(loc)
  drawRubberbandShape();
}

function drawHorizontalLine(y){

}

function drawVerticalLine(){

}

function drawGuidewires(x, y){

}

function drawPolygons(){
  polygons.forEach(item => {
    drawPolygon(item)
  })
}

function startDraggings(loc){
  mousedown.x = loc.x;
  mousedown.y = loc.y;
}

function startEditing(){
  canvas.style.cursor = 'pointer';
  editing = true;
}

function stopEditing(){
  canvas.style.cursor = 'crosshair';
  editing = false;
}

canvas.onmousemose = function(){

}

canvas.onmouseup = function(){

}

eraseAllButton.onclick=function(){

}

strokeStyleSelect.onchange = function(){}

fillStyleSelect.onchange = function(){

}

editCheckbox.onchange = function(){

}

