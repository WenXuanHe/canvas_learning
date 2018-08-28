// deviceWidthCssPixels = image.width / canvas.width;
// deviceHeightCssPixels = image.height / canvas.height;
// 把image中一部分区域——rubber区域绘制出来
export default (context,  image, rubber, deviceWidthCssPixels, deviceHeightCssPixels) => {
  context.putImageData(image, 0, 0, rubber.left, rubber.top, rubber.width * deviceWidthCssPixels, rubber.height * deviceHeightCssPixels);
}