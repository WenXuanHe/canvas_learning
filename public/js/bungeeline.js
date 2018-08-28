import {drawingSurface, windowToCanvas, $, drawLine} from './event';

var canvas = $('#canvas');
var context = canvas.getContext('2d'),
eraseAllButton = $('#eraseAllButton'),
strokeStyleSelect = $('#strokeStyleSelect'),
guideWireCheckbox = $('#guideWireCheckbox'),
mousedown = {},
rubberbandRect={},
dragging = false,
guidewires = guideWireCheckbox.checked;
const {saveDrawingSurface, restoreDrawingSurface} = drawingSurface(context);

// 更新选择矩形的大小和位置信息
function updateRubberbandRectangle (loc) {
    // 矩形大小
    rubberbandRect.width = Math.abs(loc.x - mousedown.x);
    rubberbandRect.height = Math.abs(loc.y - mousedown.y);
    // 矩形左侧坐标
    rubberbandRect.left  = loc.x > mousedown.x ? mousedown.x : loc.x;
    // 矩形上侧坐标
    rubberbandRect.top = loc.y > mousedown.y ? mousedown.y : loc.y;
}

// 画线条
function drawRubberbandShape(loc){;
    drawLine(context, mousedown, loc);
}

function updateRubberband (loc){
    updateRubberbandRectangle(loc);
    drawRubberbandShape();
}

function drawHorizontalLine(y){
    drawLine(context, {
        x:0, 
        y:y + 0.5
    }, {
        x: context.canvas.width, 
        y: y + 0.5
    })
}

function drawVerticalLine (x) {
    drawLine(context, {
        x: x+0.5,
        y: 0
    }, {
        x: x+0.5,
        y: context.canvas.height
    })
}

// 画导向线
function drawGuideWires(x, y){
    context.save();
    context.strokeStyle='rgba(0, 0, 230, 0.4)';
    context.lineWidth=0.5;
    drawVerticalLine(x);
    drawHorizontalLine(y);
    context.restore();
}

function drawDashLise(){
    
}

canvas.onmousedown = function(e){
    var loc = windowToCanvas(e.clientX, e.clientY);
    e.preventDefault();
    saveDrawingSurface();
    // 起点坐标
    mousedown.x = loc.x;
    mousedown.y = loc.y;
    // 可以拖动
    dragging = true;
}

canvas.onmousemove = function(e){
    var loc;
    if(dragging){
        e.preventDefault();
        loc = windowToCanvas(e.clientX, e.clientY);
        restoreDrawingSurface();
        updateRubberband(loc);

        if(guidewires){
            drawGuideWires();
        }
    }
}

canvas.onmouseup = (e) => {
    loc = windowToCanvas(e.clientX, e.clientY);
    restoreDrawingSurface();
    updateRubberband(loc);
    dragging = false;
}


