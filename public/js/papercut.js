var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

drawTwoRacs = () => {
  context.beginPath();
  context.arc(300, 200, 150, 0, Math.PI / 180 * 360, false); // 逆时针
  context.arc(300, 200, 100, 0, Math.PI / 180 * 360, true); // 顺时针
  context.fill();
  context.shadowColor='red';
  context.shadowOffsetX=0;
  context.shadowOffsetY=0;
  context.stroke();
}

draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawTwoRacs();
}

context.fillStyle='blue';
context.strokeStyle=context.fillStyle;

