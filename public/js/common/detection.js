export default{
    // 边界检测判断法
    ballWillHitLedge (ledge){
        var ballRight = ball.left + ball.width,
        ledgeRight = ledge.left + ledge.width,
        ballBottom = ball.top + ball.height,
        nextBallBottomEstimate = ballBottom + ball.velocityY / fps;

        return ballRight > ledge.left && ball.left < ledgeRight &&
        ballBottom < ledge.top && nextBallBottomEstimate > ledge.top;
    },

    // 外接圆判断法
    isBallInBucket(){
        var ballCenter = {
            x: ball.left + BALL_RADIUS,
            y: ball.top + BALL_RADIUS
        }

        distance = Math.sqrt(
            Math.pow(bucketHitCenter.x - ballCenter.x, 2) + 
            Math.pow(bucketHitCenter.y - ballCenter.y, 2)
        )

        return distance < BALL_RADIUS + bucketHitRadius;
    },

    // 碰到墙壁即弹回
    handleEdgeCollisions(){
        var bbox = getBoundingBox(ball),
        right = bbox.left + bbox.width,
        bottom = bbox.top + bbox.height;

        if(right > canvas.width || bbox.left < 0){
            // 把速度取相反值
            velocityX = -velocityX;

            if(right > canvas.width){
                // 超过了，把超过的部分去掉
                ball.left -= right - canvas.width;
            }

            if(bbox.left < 0){
                ball.left -= bbox.left;
            }
        }

        if(bottom > canvas.height || bbox.top < 0){
            velocityY = -velocityY;

            if(bottom > canvas.height){
                boll.top -= bottom - canvas.height;
            }

            if(bbox.top < 0){
                ball.top -= bbox.top;
            }
        }
    },

    // 光线判断法
    isBallInBucket(){
        return {
            intersectionPoint: {
                x: 0,
                y: 0
            },

            isBallInBucket(){
                if(lastBallPosition.left === ball.left || lastBallPosition.top === ball.top){
                    return;
                }

                var x1 = lastBallPosition.left,
                var y1 = lastBallPosition.top,
                // TODO
            }
        }
    }
}