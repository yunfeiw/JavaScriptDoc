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
webgl画布的建立和获取，和canvas 2d是一样的。

canvas 2d 画布和webgl 画布使用的坐标系都是二维直角坐标系，只不过它们坐标原点、y 轴的坐标方向，坐标基底都不一样了。

### canvas 2d画布的坐标系


canvas 2d 坐标系的原点在左上角。

canvas 2d 坐标系的y 轴方向是朝下的。

canvas 2d 坐标系的坐标基底有两个分量，分别是一个像素的宽和一个像素的高，即1个单位的宽便是1个像素的宽，1个单位的高便是一个像素的高。


![2d坐标系](assets/img/base/2d-zb.png)


### webgl的坐标系

webgl坐标系的坐标原点在画布中心。

webgl坐标系的y 轴方向是朝上的。


webgl坐标基底中的两个分量分别是半个canvas的宽和canvas的高，即1个单位的宽便是半个个canvas的宽，1个单位的高便是半个canvas的高。