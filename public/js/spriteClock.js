import Sprite from './common/sprite';
import SpriteSheetPainter from './common/SpriteSheetPainter';
import AnimationTimer from './common/AnimationTimer';

const $ = (el) => document.querySelector(el);

var canvas = $("#canvas"), 
context = canvas.getContext('2d'),

CLOCK_RADIUS = canvas.width / 2 - 15,
HOUR_HAND_TRUNCATION = 35,

ballPainter = {
    paint(sprite, context){
        var x = sprite.left + sprite.width / 2,
        y = sprite.top + spriye.height / 2,
        width = sprite.width,
        height = sprite.height,
        radius = sprite.width / 2;

        context.save();
        context.beginPath();
        context.src(x, y, radius, 0, Math.PI*2, false);
        context.clip();
        
        context.shadowColor='rgb(0,0,0)';
        context.shadowOffsetX=-4;
        context.shadowOffsetY=-4;
        context.shadowBlur = 8;

        context.fillStyle='rgba(218, 165, 32, .1)';
        context.fill();

        context.lineWidth=2;
        context.strokeStyle='rgb(100, 100, 195)';
        context.stroke();
        
        context.restore();
    }
},

// 原地踏步的行为
runInplace = {
    lastAdvance: 0,
    INTERVAL: 1000,
    execute(sprite, context, now){
        if(now - this.lastAdvance > this.INTERVAL){
            sprite.painter.advance();
            this.lastAdvance = now;
        }
    }
},
// 从左到右移动的行为
moveLeftToRight = {
    lastMove: 0,
    /**
     * 
     * @param {*} sprite 
     * @param {*} context 
     * @param {*} time 次数
     */
    execute(sprite, context, time){
        if(this.lastMove !== 0){
            sprite.left -= sprite.velocityX * ((time - this.lastMove) / 1000);

            if(sprite.left < 0){
                sprite.left = canvas.width;
            }
        }

        this.lastMove = time;
    }
},
// 限时触发的行为
moveBall = {
    during: 200,
    pushAnimationTimer: new AnimationTimer(this.during),
    execute(sprite, context, time){
        if(this.pushAnimationTimer.isRunning()){
            if(arrow === 'left') ball.left -= ball.velocityX / fps;
            if(arrow === 'right') ball.left += ball.velocityX / fps;

            if(isBallLedge()){
                // 检测时间是否过了，过了则停止
                if(this.pushAnimationTimer.isOver()){
                    this.pushAnimationTimer.stop();
                }
            }
            else{
                this.pushAnimationTimer.stop();
                ball.left = LEDGE_LEFT + LEDGE_WIDTH/2 - BALL_RADIUS;
                ball.top = LEDGE_TOP - BALL_RADIUS * 2;
            }
        }
    }
}

ball = new Sprite('ball', new SpriteSheetPainter(runnerCells), [ runInplace, moveLeftToRight]));
ball1 = new Sprite('ball', ballPainter, [ runInplace, moveLeftToRight]));
ball2 = new Sprite('ball', new SpriteSheetPainter(runnerCells), [ moveBall]));

function drawGrid(){

}

function drawHand(loc, isHour){
    var angle = (Math.PI * 2) * (loc / 60) - Math.PI / 2,
    handRadius = isHour ? CLOCK_RADIUS - HOUR_HAND_TRUNCATION : CLOCK_RADIUS;
    // TODO
    lineEnd = {
        x: canvas.width,
        y: cancas.height
    }
}
