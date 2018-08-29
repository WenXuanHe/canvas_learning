// 背景移动
export default class move{
  constructor(width, height, context){
    super();
    this.fps = 0;
    this.lastTime = 0;
    this.width = width;
    this.height = height;
    this.context = context;
    this.bgs = [];
  }

  addBg(offset, velocity, image){
    this.bgs.push({
      offset,
      velocity,
      image
    });

    return this;
  }

  erase(){
    this.context.clearRect(0, 0, this.width, this.height);
  }

  caculateFps(now){
    this.fps = 1000 / (now - this.lastTime);
    this.lastTime = now;
    this.fps;
  }

  animate(now){
    if(now === undefined){
      now = +new Date();
    }
  
    this.caculateFps(now);
    this.erase();
    this.draw();
  
    requestAnimationFrame(animate);

  }

  draw(){
    for(var i = 0; i < this.bgs.length; i++){
      let item = this.bgs[i];
      this.context.save();
      this.offset = item.offset < this.width ? item.offset + item.velocity / this.fps : 0;
      this.context.translate(item.offset, 0);
      // 同一幅图绘制两次，图的左侧和右侧可以无缝连接
      this.context.drawImage(item.image, 0, 0);
      this.context.drawImage(item.image, item.image.width, 0);
      this.context.restore();
    }
  }
}
