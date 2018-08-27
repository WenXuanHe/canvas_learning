var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var endPoints = [
  {
    x: 130,
    y: 70
  }, {
    x: 430,
    y: 270
  }
];
var controlPoints = [{
  x: 130,
  y: 250
}, {
  x: 450,
  y: 70
}]

function drawBezier(){
  context.strokeStyle='blue';
  context.beginPath();
  // 起始点
  context.moveTo(endPoints[0].x, endPoints[0].y);
  // 前两个点是曲线的控制点， 最后一个是锚点
  context.bezierCurveTo(controlPoints[0].x, controlPoints[0].y, controlPoints[1].x, controlPoints[1].y, endPoints[1].x, endPoints[1].y);
  context.stroke();
}

function drawEndPoints(){
  context.strokeStyle='blue';
  context.fillStyle='red';

  endPoints.forEach((point) => {
    context.beginPath();
    context.strokeStyle='blue';
    context.arc(point.x, point.y, 5, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
    context.stroke();
    context.fill();
  })
}

function drawControlPoints(){
  context.strokeStyle='yellow';
  context.fillStyle='blue';

  controlPoints.forEach((point) => {
    context.beginPath();
    context.strokeStyle='blue';
    context.arc(point.x, point.y, 5, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
    context.stroke();
    context.fill();
  })
}
drawControlPoints();
drawEndPoints();
drawBezier();





