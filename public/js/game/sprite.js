/**
 * 最基本的精灵， 包含paint和update两种方法
 */
class Sprite{
    constructor(name, painter, behaviors=[]){
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
       
        this.translateX = 0;
        this.translateY = 0;
        this.degree = 0;
        this.color = "#ffffff";
    }

    draw(context){
        context.save();
        context.fillStyle = this.color;
        context.translate(this.translateX, this.translateY);
        // context.rotate(this.degree * Math.PI/180);
        this.paint(context)
        context.restore();
    }

    paint(context){
        this.painter && this.painter.paint(this, context)
    }

    // 判断点是否在路径中, 返回当前路径
    isMouseInGraph(context, mouse){
        this.paint(context)
        if(context.isPointInPath(mouse.x, mouse.y)){
            return this
        }else{
            return null;
        }
    }

    update(context, time){
        this.behaviors.forEach((item, i) => {
            item.execute(this, context, time);
        })
    }
}

window.Sprite = Sprite
// let sprites = [];
// //基于精灵的动画循环, 将更新和执行分开，避免冲突
// function animation(time){
//     sprites.forEach(sprite => {
//         sprite.update(context, time)
//     });

//     sprites.forEach(sprite => {
//         sprite.paint(context, time)
//     })
// }

// requestAnimationFrame(animation);