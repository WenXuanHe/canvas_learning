// 离屏canvas
export default (width, height, imageData) => {
  let canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;
  context.drawImage(imageData, 0, 0);
  
  return canvas;
}


export const OffScreenCanvas = () => {
  const canvas = new OffscreenCanvas(100, 1);
  const ctx = canvas.getContext('2d');
  return ctx
}