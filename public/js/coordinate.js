var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var AXIS_MARGIN = 40, 
// 坐标原点
AXIS_ORIGIN = {
  x: AXIS_MARGIN, y: context.canvas.height - AXIS_MARGIN
},
// 坐标上限
AXIS_TOP = AXIS_MARGIN,
// 坐标最右
AXIS_RIGHT = canvas.width - AXIS_MARGIN,

// 横坐标间隔
HORIZONTAL_TICK_SPACING = 10,
// 纵坐标间隔
VERTICAL_TICK_SPACE = 10,

// 横坐标长度
AXIS_WIDTH = AXIS_RIGHT - AXIS_ORIGIN.x,
// 纵坐标长度
AXIS_HEIGHT = AXIS_ORIGIN.y - AXIS_TOP,

// 刻度的个数
NUM_VERTICAL_TICKS = AXIS_HEIGHT / VERTICAL_TICK_SPACE,
NUM_HORIZONTAL_TICKS = AXIS_WIDTH / HORIZONTAL_TICK_SPACING,

TICK_WIDTH= 10,
TICKS_LINEWIDTH = 0.5,
TICKS_COLOR = 'blue',

AXIS_LINEWIDTH = 1.0,
AXIS_COLOR = 'red';

drawAxes = () => {
  context.save();
  context.strokeStyle=AXIS_COLOR;
  context.lineWidth=AXIS_LINEWIDTH;
  drawHorizontalAxis();
  drawVerticalAxis();
  drawVerticalAxisTicks();
  drawHorizontalAxisTicks();
}

drawHorizontalAxis = () =>{
  context.beginPath();
  context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
  context.lineTo(AXIS_RIGHT, AXIS_ORIGIN.y);
  context.stroke();
}

drawVerticalAxis = () =>{
  context.beginPath();
  context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
  context.lineTo(AXIS_ORIGIN.x, AXIS_TOP);
  context.stroke();
}

drawVerticalAxisTicks = () => {
  var deltaX;
  for(var i =0; i < NUM_VERTICAL_TICKS; i++){
    context.beginPath();
    if(i % 5 === 0) deltaX = TICK_WIDTH;
    else deltaX = TICK_WIDTH / 2;
    context.moveTo(AXIS_ORIGIN.x - deltaX, AXIS_ORIGIN.y - i * VERTICAL_TICK_SPACE);
    context.lineTo(AXIS_ORIGIN.x + deltaX, AXIS_ORIGIN.y - i * VERTICAL_TICK_SPACE);
  }
}

drawHorizontalAxisTicks = () => {
  var deltaY;
  for(var i =0; i < NUM_VERTICAL_TICKS; i++){
    context.beginPath();
    if(i % 5 === 0) deltaY = TICK_WIDTH;
    else deltaY = TICK_WIDTH / 2;
    context.moveTo(AXIS_ORIGIN.x + i * VERTICAL_TICK_SPACE, AXIS_ORIGIN.y - deltaY);
    context.lineTo(AXIS_ORIGIN.x + i * VERTICAL_TICK_SPACE, AXIS_ORIGIN.y + deltaY);
  }
}

drawAxes();