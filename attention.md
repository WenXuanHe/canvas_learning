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
- quadraticCurveTo 贝塞尔曲线 params:cpx, cpy, x, y   曲线的控制点和曲线的锚点
- bezierCurzeTo
- pointInPath
- 线段端点的绘制， lineCap: butt(默认)|round|square
- 线段连接点， lineJoin: round|bevel|miter（默认） miterLimit 可以控制连接点的夹角


- measureText是根据当前的字型来计算来计算字符串宽度的。且measureText返回的值不一定精确。
- 文本居中-- textAlign和textBaseline
- 在圆弧周围绘制文本 1. 计算圆弧周围每个字符的绘制坐标， 2，将坐标系平移到绘制地址， 3. 将坐标系选择PI/2 - angle 度 4.填充字符或描边
- 要想嚓除文本， 必须替换掉整个canvas
- 


- drawImage 在图像未被加载完前不会绘制，一般在onload里执行；图像绘制的效果受制于阴影， 剪辑区域和图像合成
- 三种参数传递形式
- drawImage(source, dx, dy) 
- drawImage(source, dx, dy, dw, dh)  // 会根据目标区域进行缩放
- drawImage(source, sx, sy, sw, sh, dx, dy, dw, dh)
- 可以在canvas范围外绘制图像，浏览器会忽略canvas范围外那部分图像，但可以通过平移canvas的坐标系来让背景中的一部分显示出来
- 离屏canvas——通常用来存放临时的图像信息， 使用putImageData和脏矩形技术对图像局部渲染：由于getImageData十分消耗性能，所以在检测鼠标按下时就调用一次getImnageData，得到canvas全部形象，在鼠标移动时，则调用putImageData将矩形框选择的那一块复制到canvas。
- putImageData(image, dx,dy,dirtyx, dirtyy, dirtyWidth, dirtyHeight)， 且putImage不受全局属性影响


- 背景移动——通过translate 坐标系来实现
- 视差动画——对补贴的图像，以不通的速度移动， 可以产生3d视差动画

### 动画制作指导原则
- 使用requestAnimationFrame
- 业务逻辑的更新和动画的绘制区分开
- 使用“基于时间的运动”来协调动画的播放速度
- 用剪切区域或图像复制技术将复杂的背景图像恢复到屏幕上
- 可以使用离屏canvas来提升绘制速度