export default {
    // 屏幕坐标转换为canvas坐标
    windowToCanvas(canvas, x, y){
        var box = canvas.getBoundingClientRact();
        return {
            x: (x - box.left) * (canvas.width / box.width),
            y: (y - box.top) * (canvas.height / box.height)
        }
    },

    $(selector){
        return document.querySelector(selector) || document.body;
    }
}