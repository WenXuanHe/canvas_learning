// 精灵动画制作器， 在一定时间后切换绘画师，实现复合动画
class SpriteAnimator{
    constructor(painters, callBack){
        super();
        this.painters = painters;
        this.callBack = callBack;
        this.duraing = 1000;
        this.startTime = 0;
        this.index = 0;
    }

    end(sprite, originalPainter){
        sprite.animating = false;
        if(this.callBack) this.callBack(sprite);
        else sprite.painter = originalPainter;
    }

    start(sprite, duration){
        var endTime = +new Date() + duration,
        period = duration / this.painters.length,
        animator = this,
        originalPainter = sprite.painter,
        lastUpdate = 0;


        this.index = 0;
        sprite.animating = true;
        sprite.painter = this.painters[this.index];

        requestAnimationFrame(function spriteAnimatorAnimate(time) {
            if(time < endTime){
                if(time - lastUpdate > period){
                    sprite.painter = animator.painters[++animator.index];
                    lastUpdate = time;
                }
                requestAnimationFrame(spriteAnimatorAnimate)
            }else{
                animator.end(sprite, originalPainter);
            }
        })
    }
}