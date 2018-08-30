/**
 * 绘画师， 传递给精灵， 承载着绘画的任务
 * 
 * 绘制图片绘画师
 */
class ImagePainter{
    constructor(imageUrl){
        super();
        this.image = new Image();
        this.image.src = imageUrl;
    }

    paint(sprite, context){
        if(this.image.complete){
            context.drawImage(sprite, sprite.left, sprite.top, sprite.width, sprite.height);
        }
    }
}