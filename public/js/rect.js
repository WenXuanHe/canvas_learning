var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// 创建线性渐变
var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop(0.25, 'blue');
gradient.addColorStop(0.5, 'white');
gradient.addColorStop(0.75, 'purple');
gradient.addColorStop(1, 'yellow');

// 创建放射性渐变
var radialGradient = context.createRadialGradient(canvas.width/2, canvas.height, 10, anvas.width/2, 0, 100);
gradient.addColorStop(0.25, 'blue');
gradient.addColorStop(0.5, 'white');
gradient.addColorStop(0.75, 'purple');
gradient.addColorStop(1, 'yellow');

// 'miter | bevel | round'
context.lineJoin='round';
context.lineWidth=30;

context.font='sans-serif';
context.fillText("Click", 175, 40);
context.strokeStyle='#dddddd';
context.strokeRect(75, 100, 200, 200);

context.fillRect(325, 100, 200, 200);
context.fillStyle = gradient;

context.canvas.onmousedown = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}



