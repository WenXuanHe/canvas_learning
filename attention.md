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
- 更为复杂的图像都是基于路径的——先定义一个路径再对它描边或填充 ———— beginPath:canvas中的绘制方法（如stroke, fill），都会以“上一次beginPath”之后的所有路径为基础进行绘制
- closePath 的意思不是结束路径，而是关闭路径，它会试图从当前路径的终点连一条路径到起点，让整个路径闭合起来。但是，这并不意味着它之后的路径就是新路径了
- 在某一时刻， canvas只能有一条路径存在， 然而这条路径却可以包含许多子路径。beginPath可以开始一段新路径
- 非0环绕规则  子区域发出一条射线，与顺时针相交+1，与逆时针相交-1， 结果不为0则填充， 为0则不填充
- 当使用arc向子路径中增加子路径时， 需将上一条子路径的终点和所画圆弧相连
- rect() 方法总是按照顺时针创建矩形， 不能控制方向
- moveTO 和lineTo
- 线段端点的绘制， lineCap: butt(默认)|round|square
- 线段连接点， lineJoin: round|bevel|miter（默认） miterLimit 可以控制连接点的夹角
- 