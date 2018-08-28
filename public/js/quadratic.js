var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

context.fillStyle='blue';
context.strokeStyle='yellow';

context.shadowColor='rgba(50, 50, 50, 1.0)';
context.shadowOffsetX=2;
context.shadowOffsetY=2;
context.shadowBlur=4;

context.lineWidth=20;
context.lineCap='round';

context.beginPath();
context.moveTo(120.5, 130);

context.quadraticCurveTo(150.8, 130, 106.6, 150.5);
context.quadraticCurveTo(190, 250, 210.5, 160.5);
context.quadraticCurveTo(240, 100.5, 290, 70.5);

context.stroke();





