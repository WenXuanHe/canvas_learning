/**
 * 绘画师， 传递给精灵， 承载着绘画的任务
 * 
 * 绘制图片绘画师
 */
class ImagePainter{
    constructor(imageUrl){
        if(typeof imageUrl === 'string'){
            this.image = new Image();
            this.image.src = imageUrl;
        }else{
            this.image = imageUrl
        }
    }

    paint(sprite, context){
        if(this.image.complete){
            context.beginPath();
            context.drawImage(this.image, sprite.left, sprite.top, sprite.width, sprite.height);
            
        }
    }

}

window.ImagePainter = ImagePainter