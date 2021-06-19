## 基础

### 案例

```html
<canvas id="canvas"></canvas>
<script>
  // 画布
  const canvas = docuemnt.querySelector("canvas");
  // 获取webgl画笔（绘图上下文）
  const gl = canvas.getContext("webgl");
  // 指定将要用来清空绘图区的颜色
  gl.clearColor(0, 0, 0, 1);
  // 使用之前指定的颜色，清空绘图区的颜色
  gl.clear(gl.COLOR_BUFFER_BIT);
</script>
```

clearColor(r,g,b,a) 中的参数是红、绿、蓝、透明度，其定义域是[0,1]

### js 颜色 ==> webgl 颜色

```js
const rgbaCSS = "rgba(255,0,0,1)";
const reg = RegExp(/\((.*)\)/);
const rgbaStr = reg.exec(rgbaCSS)[1];
const rgb = rgbaStr.split(",").map((ele) => parseInt(ele));
const r = rgb[0] / 255;
const g = rgb[1] / 255;
const b = rgb[2] / 255;
const a = rgb[3];

gl.clearColor(r, g, b, a);
gl.clear(gl.COLOR_BUFFER_BIT);
```

在 three.js 里有一个非常完美的颜色对象-Color

使用

```js
import { Color } from "https://unpkg.com/three/build/three.module.js";

// 实例化Color 对象
const color = new Color(1, 0, 0);
color.offset HSL(0.005, 0, 0);

gl.clearColor(color.r, color.g, color.b, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
```

HSL 色相、饱和度、亮度

## webgl 坐标系

webgl 画布的建立和获取，和 canvas 2d 是一样的。

canvas 2d 画布和 webgl 画布使用的坐标系都是二维直角坐标系，只不过它们坐标原点、y 轴的坐标方向，坐标基底都不一样了。

### canvas 2d 画布的坐标系

canvas 2d 坐标系的原点在左上角。

canvas 2d 坐标系的 y 轴方向是朝下的。

canvas 2d 坐标系的坐标基底有两个分量，分别是一个像素的宽和一个像素的高，即 1 个单位的宽便是 1 个像素的宽，1 个单位的高便是一个像素的高。

![2d坐标系](/assets/img/base/d2zb.png)

### webgl 的坐标系

webgl 坐标系的坐标原点在画布中心。

webgl 坐标系的 y 轴方向是朝上的。

webgl 坐标基底中的两个分量分别是半个 canvas 的宽和 canvas 的高，即 1 个单位的宽便是半个个 canvas 的宽，1 个单位的高便是半个 canvas 的高。

![webgl坐标系](/assets/img/base/webglzb.png)

## webgl 画一个点

点是最简单的形状，是几何图形最基本的组成部分

### 绘图的基本步骤

1. 画布。

2. 画笔。

3. 绘制。

![2d画图流程](/assets/img/base/huahua.png)

### 2d 绘图

```js
// canvas 画布
const canvas = document.querySelector("canvas");
// 画笔
const ctx = canvas.getContext("2d");
// 设置笔颜色
ctx.fillStyle = "red";
// 画矩形
ctx.fillRect(20, 20, 300, 200);
```

webgl 的绘图逻辑亦是如此，只不过它更像电脑绘画，其绘画的步骤里还多了一层介质。

这层介质就是手绘板，就像这样：

1. 找一台电脑。
2. 找一块手绘板。
3. 找一支触控笔。
4. 开始画画。

![webgl画图流程](/assets/img/base/web-huahua.png)

## canvas 2d 和 webgl 绘图的差异

webgl 的绘图逻辑和 canvas 2d 的绘图逻辑有一个本质的差别。

浏览器有三大线程：

1. js 引擎线程
2. GUI 渲染线程
3. 浏览器事件触发线程

其中 GUI 渲染线程就是用于渲图的，在这个渲染线程里，有负责不同渲染工作的工人。比如有负责渲染 HTML+css 的工人，有负责渲染二维图形的工人，有负责渲染三维图形的工人。

二维图形使用 js 语言，而三维图形识别 GLSL ES 语言。两者互不通用；所以需要 “程序对象”（即 之前的画板）来做翻译

## webgl 的绘图思路

1. 浏览器里内置的 webgl 渲染引擎，负责渲染 webgl 图形，只认 GLSL ES 语言。
2. 手绘板 - 程序对象，承载 GLSL ES 语言，翻译 GLSL ES 语言和 js 语言，使两者可以相互通信。
3. 触控笔 - 通过 canvas 获取的 webgl 类型的上下文对象，可以向手绘板传递绘图命令，并接收手绘板的状态信息。
4. 开始画画 - 通过 webgl 类型的上下文对象，用 js 画画。

## webgl 的绘图步骤

1.在 html 中建立 canvas 画布

```js
<canvas id="canvas"></canvas>
```

2.在 js 中获取 canvas 画布

```js
const canvas = document.getElementById("canvas");
```

3.使用 canvas 获取 webgl 绘图上下文

```js
const gl = canvas.getContext("webgl");
```

4.在 script 中建立顶点着色器和片元着色器，glsl es

```html
<!-- 顶点着色器 -->
<script type="vertexShader" type="x-shader/x-vertex">
  void main(){
    gl_Position = vec4(0.0,0.0,0.0,1.0);
    gl_PointSize = 100.0;
  }
</script>
//片元着色器
<script id="fragmentShader" type="x-shader/x-fragment">
  void main() {
      gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
  }
</script>
```

5.在 js 中获取顶点着色器和片元着色器的文本

```js
const vsSource = document.getElementById("vertexShader").innerText;
const fsSource = document.getElementById("fragmentShader").innerText;
```

6.初始化着色器

```js
initShaders(gl, vsSource, fsSource);

function initShaders(gl, vsSource, fsSource) {
  //创建程序对象
  const program = gl.createProgram();
  //建立着色对象
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  //把顶点着色对象装进程序对象中
  gl.attachShader(program, vertexShader);
  //把片元着色对象装进程序对象中
  gl.attachShader(program, fragmentShader);
  //连接webgl上下文对象和程序对象
  gl.linkProgram(program);
  //启动程序对象
  gl.useProgram(program);
  //将程序对象挂到上下文对象上
  gl.program = program;
  return true;
}

function loadShader(gl, type, source) {
  //根据着色类型，建立着色器对象
  const shader = gl.createShader(type);
  //将着色器源文件传入着色器对象中
  gl.shaderSource(shader, source);
  //编译着色器对象
  gl.compileShader(shader);
  //返回着色器对象
  return shader;
}
```

7.指定将要用来清空绘图区的颜色

```js
gl.clearColor(0, 0, 0, 1);
```

8.使用之前指定的颜色，清空绘图区

```js
gl.clear(gl.COLOR_BUFFER_BIT);
```

9.绘制顶点

```js
gl.drawArrays(gl.POINTS, 0, 1);
```

整体代码

```html
<canvas id="canvas"></canvas>
<!-- 顶点着色器 -->
<script id="vertexShader" type="x-shader/x-vertex">
  void main() {
      gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
      gl_PointSize = 100.0;
  }
</script>
<!-- 片元着色器 -->
<script id="fragmentShader" type="x-shader/x-fragment">
  void main() {
      gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
  }
</script>
<script>
  // canvas 画布
  const canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // webgl画笔
  const gl = canvas.getContext("webgl");
  // 顶点着色器
  const vsSource = document.getElementById("vertexShader").innerText;
  // 片元着色器
  const fsSource = document.getElementById("fragmentShader").innerText;
  // 初始化着色器
  initShaders(gl, vsSource, fsSource);
  // 指定将要用来清理绘图区的颜色
  gl.clearColor(0, 0.0, 0.0, 1.0);
  // 清理绘图区
  gl.clear(gl.COLOR_BUFFER_BIT);
  // 绘制顶点
  gl.drawArrays(gl.POINTS, 0, 1);
</script>
```

## 着色器

webgl 绘图需要两种着色器：

- 顶点着色器（Vertex shader）：描述顶点的特征，如位置、颜色等。
- 片元着色器（Fragment shader）：进行逐片元处理，如光照。

### 补间动画

在两个关键帧中间需要做“补间动画”，才能实现图画的运动；插入补间动画后两个关键帧之间的插补帧是由计算机自动运算而得到的。

顶点着色器里的顶点就是补间动画里的关键帧，片元着色器里的片元就是关键帧之间以某种算法算出的插值。当然，咱们 webgl 里的片元是像素的意思。

直线

顶点着色器里的顶点就是决定这一条直线的两个点，片元着色器里的片元就是把直线画到画布上后，这两个点之间构成直线的每个像素。


## 着色器语言

webgl 的着色器语言是GLSL ES语言


- 顶点着色程序，要写在type=“x-shader/x-vertex” 的script中。

```js
<script id="vertexShader" type="x-shader/x-vertex">
    void main() {
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
        gl_PointSize = 100.0;
    }
</script>
```

- 片元着色程序，要写在type=“x-shader/x-fragment” 的script中。
```js
<script id="fragmentShader" type="x-shader/x-fragment">
    void main() {
        gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
    }
</script>
```

void main() {…… } 是主体函数。

顶点着色器中

- gl_Position 是顶点的位置;
- gl_PointSize 是顶点的尺寸;
   
名称都是固定的，不能写成别的。

片元着色器中

- gl_FragColor 是片元的颜色;

vec4()  是一个4维矢量对象。

将vec4() 赋值给顶点点位gl_Position 的时候，其中的前三个参数是x、y、z，第4个参数默认1.0，其含义我们后面会详解；

将vec4() 赋值给片元颜色gl_FragColor 的时候，其中的参数是r,g,b,a。


### 着色器初始化  

1. 建立程序对象，目前这只是一个手绘板的外壳。

```js
const shaderProgram = gl.createProgram();
```

2. 建立顶点着色器对象和片元着色器对象

   ```js
   const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
   const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
   ```
3. 将顶点着色器对象和片元着色器对象装进程序对象中，这就完成的手绘板的拼装。

```js
   gl.attachShader(shaderProgram, vertexShader);
   gl.attachShader(shaderProgram, fragmentShader);
```

4. 连接webgl 上下文对象和程序对象，就像连接触控笔和手绘板一样（触控笔里有传感器，可以向手绘板发送信号）。

```js
   gl.linkProgram(shaderProgram);
```

5. 启动程序对象，就像按下了手绘板的启动按钮，使其开始工作。
```js
gl.useProgram(program);
```

上面第二步中的建立着色对象方法loadShader()，是一个自定义的方法，其参数是(webgl上下文对象，着色器类型，着色器源文件)

- gl.VERTEX_SHADER 是顶点着色器类型;
- gl.FRAGMENT_SHADER是片元着色器类型;

```js
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
}
```
- gl.createShader(type) ：根据着色器类型建立着色器对象的方法。

- gl.shaderSource(shader, source)：将着色器源文件传入着色器对象中，这里的着色器源文件就是我们之前在script 里用GLSL ES写的着色程序。

- gl.compileShader(shader)：编译着色器对象。

