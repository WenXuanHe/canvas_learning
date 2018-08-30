/**
 * 最基本的精灵， 包含paint和update两种方法
 */
class Sprite{
    constructor(name, painter, behaviors=[]){
        super();
        this.name = name;
        this.painter = painter;
        this.behaviors = behaviors;
        this.top = 0;
        this.left = 0;
        this.width = 10;
        this.height = 10;
        this.velocityX = 0;
        this.velocityY = 0;
        this.visible = true;
        this.animating = false;
    }

    paint(context){
        this.painter && this.painter(context)
    }

    update(context, time){
        this.behaviors.forEach((item, i) => {
            item.execute(this, context, time);
        })
    }
}


let sprites = [];
//基于精灵的动画循环, 将更新和执行分开，避免冲突
function animation(time){
    sprites.forEach(sprite => {
        sprite.update(context, time)
    });

    sprites.forEach(sprite => {
        sprite.paint(context, time)
    })
}

requestAnimationFrame(animation);