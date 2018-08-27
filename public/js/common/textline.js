export default class TextLine {
  constructor(canvas, x, y) {
    super();
    this.text = "";
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.circle = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 200
    }

    this.left = x;
    this.bottom = y;
    this.caret = 0;

  }

  insert(text){
    this.text = this.text.substr(0, this.caret) + text + this.text.substr(this.caret);
    this.caret += text.length;
  }

  removeCharacterBeforeCaret(){
    if(this.caret === 0){
      return;
    }

    this.text = this.text.substring(0, this.caret - 1) + this.text.substring(this.caret);

    this.caret--;
  }

  getWidth(context) {
    return context.measureText(this.text).width;
  }

  getHeight(context){
    var h = context.measureText('M').width;
    return h + h/6;
  }

  draw(context){
    context.save();
    context.textAlign='start';
    context.textBaseline='bottom';
    
    context.strokeText(this.text, this.left, this.bottom);
    context.fillText(this.text, this.left, this.bottom);

    context.restore();
    
  }

  erase(context, imageData){
    context.putImageData(imageData, 0, 0);
  }

  // 沿着圆弧绘制文本
  drawCircularText(str, startAngle, endAngle) {
    // 半径
    var radius = this.circle.radius;
    // 单个字符的角度
    var anglrDecrement = (startAngle - endAngle) / (str.length - 1);
    var angle = parseFloat(startAngle);
    var index = 0;
    var character;

    this.context.save();
    this.context.fillStyle = "";
    this.context.strokeStyle = 'color';
    this.context.font = '10px sans-serif';

    while (index < str.length) {
      // 单个字符
      character = str.charAt(index);
      this.context.save();
      this.context.beginPath();
      // translate到每一个字符处
      this.context.translate(this.circle.x + Math.cos(angle) * radius, this.circle.y - Math.sin(angle) * radius);
      // 再旋转
      this.context.rotate(Math.PI / 2 - angle);
      // 绘制
      this.context.fillText(character, 0, 0);
      this.context.strokeText(character, 0, 0);
      angle -= anglrDecrement;
      index++;
      this.context.restore();
    }
  }
}