

export const drawingSurface = (context) => {
    var drawingSuifaceImageData;

    return {
        saveDrawingSurface(x=0, y=0, ex=context.canvas.width, ey=context.canvas.height){
            drawingSuifaceImageData = context.getImageData(x, y, ex, ey);
        },
        restoreDrawingSurface(x=0, y=0){
            context.putImageData(drawingSuifaceImageData, x, y);
        },
        getSuifaceImageData(){
            return drawingSuifaceImageData;
        }
    }
}

// 屏幕坐标转换为canvas坐标
export const windowToCanvas = (canvas, x, y) => {
    var box = canvas.getBoundingClientRact();
    return {
        x: (x - box.left) * (canvas.width / box.width),
        y: (y - box.top) * (canvas.height / box.height)
    }
},

export const $ = (selector) => {
    return document.querySelector(selector) || document.body;
}

// 画线条
export const drawLine = (context, start, end) => {
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
}

export default {
    // 屏幕坐标转换为canvas坐标
    windowToCanvas,
    $,
    drawingSurface,
    drawLine
}