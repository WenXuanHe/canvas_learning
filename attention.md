- canvas 默认创建300*150大小的窗口，
- 通过css设置canvas的元素大小，只会改变canvas本身元素的大小，而不会改变绘图环境， 因此总是通过canvas的width和height来设置大小
- 绘图环境的save和restore方法会将当前的绘图环境压入堆栈顶部， restore则会将堆栈顶部的弹出状态信息，因此可以嵌套使用save和restore
- toDataURL 可以把cavas转换为图
- fillText  -> params: 文字， x坐标， y坐标 ` context.fillText('hello canvas', canvas.width/2 - 150, canvas.height/2 + 15) `
- strokeText -> params: 文字， x坐标， y坐标  ` context.strokeText('hello canvas', canvas.width/2 - 150, canvas.height/2 + 15) `

- 离屏canvas: *** 把canvas隐藏在幕后，把隐藏的canvas以图片输出展示在可视区 ***
- canvas 的绘制步骤
    - 浏览器将图像绘制到一个无限大的位图当中， 绘制时遵从当前的填充模式， 描边模式， 线条样式。
    - 将图像的阴影绘制到另一个位图中
    - 阴影中像素的alpha分量乘以绘图环境的globalAlpha
    - 将有阴影的位图与经过剪辑的canvas进行图像合成
    - 将图像的每一个像素颜色分量乘以绘图环境的globalAlpha

- 矩形的绘制
    clearRect, strokeRect, fillRect
     
- 内嵌阴影  shadowOffsetX和shadowOffsetY的值为负数，会出现内嵌阴影的效果
- 剪辑区域  clip
    设置了剪辑区域，接下来在canvas中绘制的所有内容都将局限在该区域内
- 立即绘制的方法： strokeRect 和fillRect， strokeText， fillText
- 更为复杂的图像都是基于路径的——先定义一个路径再对它描边或填充
- 路径与子路径
 在某一时刻， canvas只能有一条路径存在， 然而这条路径却可以包含许多子路径。