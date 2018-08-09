// 设置阴影
export default (context, color, offsetx, offsety, blur) => {
    context.shadowColor=color;
    context.shadowOffsetX=offsetx;
    context.shadowOffsetY=offsety;
    context.shadowBlur=blur;
}