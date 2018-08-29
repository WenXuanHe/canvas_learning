import Move from './move';

// 视差动画  不同的图片以不同的速度移动，会造成3d的视差效果
var canvas = $("#canvas"),
  context = canvas.getContext('2d'),
  controls = $("#controls"),

  tree = new Image(),
  nearTree = new Image(),
  grass = new Image(),
  grass2 = new Image(),
  sky = new Image(),

  paused = true,
  lastTime = 0,
  fps = 60,
  lastFpsUpdate = {
    time: 0,
    value: 0
  };

skyOffset = 0,
  grassOffset = 0,
  treeOffset = 0,
  nearTreeOffset = 0,

  TREE_VELOCITY = 20,
  NERA_TREE_VELOCITY = 40,
  SKY_VELOCITY = 8,
  GRESS_VELOCITY = 75;

function erase() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

var move = new Move(canvas.width, canvas.height, context);

move.addBg({
  offset: treeOffset,
  velocity: TREE_VELOCITY,
  image: tree
}).addBg({
  offset: nearTreeOffset,
  velocity: NERA_TREE_VELOCITY,
  image: nearTree
}).addBg({
  offset: skyOffset,
  velocity: SKY_VELOCITY,
  image: sky
}).addBg({
  offset: grassOffset,
  velocity: GRESS_VELOCITY,
  image: gress
}).addBg({
  offset: grassOffset,
  velocity: GRESS_VELOCITY,
  image: gress2
});

requestAnimationFrame(move.animate);
