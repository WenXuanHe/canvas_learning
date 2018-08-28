export default class TextCursor{
  constructor(width=2, fillStyle='rgba(0,0,0,.5)'){
    super();
    this.width = width;
    this.fillStyle = fillStyle;
    this.left = 0;
    this.top = 0;
    this.blinkingINterval;
    this.BLINK_ON = 500;
    this.BLINK_OFF = 500;
  }

  getHeight(context){
    var h = context.measureText('M').width;
    return h + h/6;
  }

  createPath(context){
    context.beginPath();
    context.rect(this.left, this.top, this.width, this.getHeight(context));
    
  }

  draw(context, left, bottom){
    context.save();
    this.left = left;
    this.top = bottom - this.getHeight(context);

    this.createPath(context);

    context.fillStyle=this.fillStyle;
    context.fill();
    
    context.restore();
  }

  // 光标的嚓除，可以用getImageData来抓取当前canvas的快照，再绘制光标后再回复
  erase(context, imagedata){
    context.putImageData(imagedata, 0, 0, this.left, this.top, this.width, this.getHeight(context));
  }

  // 光标闪烁
  blinkCursor(context, imagedata){
    
    this.blinkingINterval = setInterval(e => {
      this.erase(context, imagedata);
      setTimeout(() => {
        this.draw(context, this.left, this.top + this.getHeight(context))
      }, this.BLINK_OFF)
    }, this.BLINK_ON + this.BLINK_OFF)
  }

  moveCursor(context, imagedata, loc){
    this.erase(context, imagedata);
    this.draw(context, loc.x, loc.y);
    this.blinkCursor(context, imagedata);
  }

}