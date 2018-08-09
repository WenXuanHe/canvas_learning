var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var canvasImage = document.querySelector('#canvasImage');


function drawGrid(context, color, stepx, stepy){

}
 
drawGrid(context, 'blue', 10, 10);

// 绘制的属性
context.font='10px sans-serif';
context.strokeStyle='blue';
context.fillStyle='red';
context.lineWidth=2;


context.strokeText("Hello", 60, 110);
context.fillText("Hello", 440, 110);
// 这两个位置相同
context.strokeText("world", 650, 110);
context.fillText("world", 650, 110);

// 绘制矩形
context.lineWidth=5;
context.beginPath();
context.rect(80, 150, 150, 100);
context.stroke();

context.beginPath();
context.rect(400, 150, 150, 100);
context.fill();

context.beginPath();
context.rect(750, 150, 150, 100);
context.stroke();
context.fill();

// 绘制圆形
context.beginPath();
context.arc(150, 370, 60, Math.PI / 180 * 0, Math.PI / 180 * 100);
context.stroke();

// 关闭的圆
context.beginPath();
context.arc(150, 550, 60, Math.PI / 180 * 0, Math.PI / 180 * 100);
context.closePath();  // 关闭路径，会绘制一个封闭的圆
context.stroke();




