## 颜色与纹理


图形光栅化的意思就是把图形转成片元。

webgl 并不是一个三维引擎（三维是通过矩阵实现的），它就是一个光栅化引擎。


1. 多attribute变量
2. 光栅化原理
3. 贴图

## 第一章 多attribute变量

### 1-多attribute变量的概念

问题：如何一次性绘制三个不同颜色的点。

```html
<script id="fragmentShader" type="x-shader/x-fragment">
      precision mediump float;
      uniform vec4 u_FragColor;
      void main(){
          gl_FragColor=u_FragColor;
      }
</script>
```


- js


```js
const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
gl.uniform4f(u_FragColor, 1, 0, 1, 1);
```

这种方式只会绘制三个同样颜色的点。

那我们若想给这三个点不同的颜色，就需要再建立一个接收颜色数据的attribute 变量。
