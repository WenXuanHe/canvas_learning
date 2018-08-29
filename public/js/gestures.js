import { windowToCanvas } from "./event";

// 用户拖拽鼠标时， 记录下鼠标按下以及松开 的时间和位置， 等到拖拽过程技术的鼠标松开事件发生后， 
// 程序的didThrow方法会使用一个简单的等式计算出本次用户手势中， 鼠标光标的移动速度， 如果速度够快， 判断用户扔出。

var canvas = $("#canvas"),
  context = canvas.getContext('2d'),

  animating = false,
  dragging = false,
  mousedown = null,
  mouseup = null;

  function didThrow(){
    var elapsedTime = mouseup.time - mousedown.time;
    var motion = Math.abs(mouseup.x - mousedown.x) + Math.abs(mouseup.y - mousedown.y);

    return (motion / elapsedTime * 10) > 3;
  }

  canvas.onmousedown = function(e){
    var mouse = windowToCanvas(e.clientX, e.clentY);
    mousedown = {
      x: mouse.x,
      y: mouse.y,
      tiem: new Date().getTime()
    }
  }

  canvas.onmouseup = function(e){
    var mouse = windowToCanvas(e.clientX, e.clentY);
    mouseup = {
      x: mouse.x,
      y: mouse.y,
      tiem: new Date().getTime()
    }

    if(didThrow()){
      // animate
    }
  }