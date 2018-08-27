import TextCursor from './common/textCursor';
import event from './event';
import TextLine from './common/textline';

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var cursor = new TextCursor();
var drawing;
var line;


function  saveDrawingSurface(){
  drawing = context.getImageData(0, 0, canvas.width, canvas.height);
}

canvas.onmousedown = function(e){
  var loc = event.windowToCanvas(canvas, e.clientX, e.clientY);
  cursor.moveCursor(context, drawing, loc)
  line = new TextLine(canvas, loc.x, loc.y);
}

document.onkeydown = () => {
  if(e.keyCode === 8 || e.keyCode === 13){
    e.preventDefault();
  }
  // 删除
  if(e.keyCode === 8){
    context.save();
    line.erase(context, drawing);
    // 移除
    line.removeCharacterBeforeCaret();
    // 移动光标
    cursor.moveCursor(context, drawing, {
      x: line.left + line.getWidth(context),
      y: line.bottom
    })
    // 绘制最新的文字
    line.draw(context);
    context.restore();
  }
}

document.onkeypress = () => {
  var key = String.fromCharCode(e.which);

  if(e.keyCode !== 8 && !e.ctrlKey && !e.metaKey){
    e.preventDefault();

    context.save();
    line.erase(context, drawing);
    line.insert(key);

    cursor.moveCursor(context, drawing, {
      x: line.left + line.getWidth(context),
      y: line.bottom
    });

    context.shadowColor='color';
    context.shadowOffsetX=1;
    context.shadowOffsetY=1;
    context.shadowBlur=2;

    line.draw(context);
    context.restore();
  }
}

saveDrawingSurface();