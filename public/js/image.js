import { windowToCanvas } from "./event";

var canvas = $("canvas"),
context = canvas.getContext('2d'),
image = new Image(),
imageData,
mouseDown={},
rubberBandRectangle={},
dragging = false,
imageDataCopy = context.createImageData(canvas.width, canvas.height);

// 负片滤镜 从255中减去每个像素的红，蓝， 绿分量， 再将差值设置回去
// 黑白滤镜， 计算出红，蓝， 绿分量的平均值， 再将三个分量都设置为这个平均值
function drawInBlackAndWhite(){
  for(i = 0; i < imageData.data.length - 4; i+4){
   let average = (imageData.data[i] + imageData.data[i+1] + imageData.data[i+2]) / 3;
   data[i] = average;
   data[i+1] = average;
   data[i+2] = average;
  }

  context.putImageData(imagedata, 0, 0);
}

function drawInColor(){

}

function copyCanvasPixels(){
  var i = 0;
  // 复制第一个像素的红，绿，蓝属性值
  for(i = 0; i < 3; i++){
    imageDataCopy.data[i] = imageData.data[i]
  }

  for(i = 3; i < imageData.data.length - 4; i+4){
    imageDataCopy[i] = imageData.data[i] / 2;  // alpha 透明度/2
    imageDataCopy[i+1] = imageData.data[i+1];  // red
    imageDataCopy[i+2] = imageData.data[i+2];  // green
    imageDataCopy[i+3] = imageData.data[i+3];  // blue
  }
  
}

function captureCanvasPixels(){
  context.getImageData(0, 0, canvas.width, canvas.height);
  copyCanvasPixels();
}

function restoreCanvasPixels(){
  var dx = imageData.width / canvas.width;
  var dy = imageData.height / canvas.height;

  context.putImageData(imagedata, 0, 0);

  context.putImageData(imageDataCopy, 0, 0, rubberBandRectangle.left + context.lineWidth
  , rubberBandRectangle.top + context.lineWidth, (rubberBandRectangle.width - 2 * context.lineWidth) * dx, 
   (rubberBandRectangle.height - 2 * context.lineWidth) * dy);
  
}

function setRubberbandRectangle(x, y){
  rubberBandRectangle = {
    left: Math.min(x, mouseDown.x),
    top: Math.min(y, mouseDown.y),
    width: Math.abs(x - mouseDown.x),
    height: Math.abs(y - mouseDown.y)
  }
}

function drawRubberband(){
  context.strokeRect(rubberBandRectangle.left + context.lineWidth, rubberBandRectangle.top + context.lineWidth,
    rubberBandRectangle.width - 2 * context.lineWidth, rubberBandRectangle.height - 2 * context.lineWidth);
}

function rubberbandStart(x, y){
  mouseDown={
    x,y
  }

  rubberBandRectangle = {
    left: x,
    top: y,
    width: 0,
    height: 0
  }

  dragging = true;
  captureCanvasPixels();
}

function rubberbandStretch(x, y){

  if(rubberBandRectangle.width > 2 * context.lineWidth && rubberBandRectangle.height > 2 * context.lineWidth && imageData){
    restoreCanvasPixels();
  }
  setRubberbandRectangle(x, y);
 if(rubberBandRectangle.width > 2 * context.lineWidth && rubberBandRectangle.height > 2 * context.lineWidth){
    drawRubberband();
  }
}

function rubberbandEnd(){
  context.putImageData(imagedata, 0, 0);
  context.drawImage(canvas, rubberBandRectangle.x, rubberBandRectangle.y, rubberBandRectangle.width, rubberBandRectangle.height);
  imageData = null;
} 

canvas.onmousedown = (e) => {
  var loc = windowToCanvas(canvas, e.clientX, e.clientY);
  rubberbandStart(loc.x, loc.y);
}

canvas.onmousemove = function(){
  var loc = windowToCanvas(e.clientX, e.clentY);
  rubberbandStretch(loc.x, loc.y);
}

canvas.onmouseup = function(){
  rubberbandEnd();
}
