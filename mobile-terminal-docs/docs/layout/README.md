## 移动端布局

### 为什么要适配？

浏览器 移动端切换
![1](/assets/img/layout/liulanqi.png)

在没有做适配的清下，浏览器如下显示

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
    <title>移动端</title>
  </head>
  <body>
    hello yunfei!
  </body>
</html>
```

![2](/assets/img/layout/no-shipei.png)

> 默认 980px 是针对没有 做移动端适配的界面，进行良好的展示

### 前提

1. 视口

```css
<meta name='viewport' content='width=device-width' />
```

设备与页面的宽度相等；

解决看不清楚问题；（1920 --> 1360 页面元素 锯齿状态）

![3](/assets/img/layout/shipei1.png)

#### user-scalable=no

移动端有`双指缩放`功能，页面不需要，可以使用 user-scalable=no 来禁用

```css
<meta name='viewport' content='width=device-width,user-scalable=no' />
```

#### initial-scale

默认缩放比 initial-scale=1;(某些机型会缩放)

```css
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0">

```

> 响应式的前提 也是 视口的设置

媒体查询 media

```css
<head>
    <style>
        .box{
            width: 300px;
            height: 200px;
            background: #000;
        }

        @media all and (min-width:1000px) and (max-width:1200px) {
            .box{
                background: red;
            }
        }

        @media all and (min-width:600px) and (max-width:800px) {
            .box{
                background: blue;
            }
        }
    </style>
</head>
<body>
    <div class="box"></div>
</body>
```

代表 [bootstrap](https://www.bootcss.com/) 没啥人用了 (艹皿艹 )

### 像素比 dpr

![4](/assets/img/layout/dpr.png)

手机分辨率极高（ ip-X 2436\*1125），但显示的像素宽度是 375px;

像素比（dpr）： 物理像素 / 逻辑像素；

举个例子

电脑 1920\*1080 物理像素； 值是 `像素点`

可调整成 1660*900 1440*800 这些就是逻辑像素

使用`多个` 像素点代表`一个`像素点

```
A   A
         ——    A
A   A
```

像素比 1

```
A : A
```

像素比 2

```
A   A
        :   A
A   A

```

像素比 3

```
A   A   A

A   A   A   :   A

A   A   A
```

> 1 像素问题

`像素比3`的情况下 1px 是由 9px 来显示的，所以显示效果很粗 o(_￣︶￣_)o

```html
<head>
  <meta charset="UTF-8" />
  <title>Title</title>
  <meta
    name="viewport"
    content="width=device-width,user-scalable=no,initial-scale=1"
  />
  <style>
    .box {
      width: 200px;
      height: 1px;
      background: #0a3b98;
      transform: scale(1, 0.333333);
      font-size: 4px;
    }
  </style>
</head>
<body>
  <div class="box">爱回收丢</div>
</body>
```

- 解决 1
  缩放

```css
transform: scale(1, 0.333333);
```

scale 接收一到两个参数

一个参数：X 轴方向的缩放比和 Y 轴方向的缩放比是一样的

两个参数：第一个参数代表 X 轴方向，第二个参数代表 Y 轴方向

> 扩展 1：文字的大有限定，可以通过 scale 来实现
> 扩展 2：PC 端 装饰字体 12px, 正文 16；移动端 装饰 20px，正文 26-28px

- 解决 2 initial-scale
  全局缩放

```html
<meta
  name="viewport"
  content="width=device-width,user-scalable=no,initial-scale=0.333"
/>
```

> 问题 影响大，众多 元素 都会受到影响；性能消耗加大，造成卡顿

## 适配

### 如何实现 宽度为页面 50%的元素

```css
.box {
  width: 50%;
}
```

不靠谱 (_^▽^_)，因为有嵌套在·父元素·下的情况；

## vw vh

- 方法 1 vw

  vw 1vw = 屏幕宽度的百分之一
  vh 1vh = 屏幕高度的百分之一

> 可以做移动端适配，但要计算比值

```css
.box {
  width: 50vw;
}
```

```css
width: calc(80vw / 750);
height: calc(80vw / 750);
```

> 雪碧图 - 控制好 position

> 轮播图 - PC 图片周围渐变; 移动不需要

#### 扩展 sass

缩放比

```
750px  100vw   1vw = 7.5px
80px = ?vw  80/7.5
```

```scss
.box {
  width: (80/7.5) * 1vw;
  height: (80/7.5) * 1vw;
}
```

编译后

```css
.box {
  width: 10.6666666667vw;
  height: 10.6666666667vw;
}
```

- 方法 2

## rem

em: 当前元素的 font-size 的大小

rem r root 根元素的 font-size 的大小

举个栗子

```css
.box {
  width: 100px;
  height: 100px;
  background: #0a3b98;
  /*font-size: 2em;!* 40px *!*/
  /*width: 2em;  !* 80px *!*/
}
```

将 html font-size 设为 10vm

```css
html {
  font-size: 10vm;
}
```

图纸为 750px,那么可知

750px = 10rem 1rem = 75px 【相当于我们把整个页面分成了 10 份】

80px = ?rem 80/75 1.2rem

再来个李子

25 份

750 = 25rem 1rem = 30px

80px = ?rem 80/30

> 等比缩放；设置好比值，计算每份大小，计算页面元素占用份数

## sass 与 rem

定义份数 25 份

```js
<script>
  let rootel = document.documentElement; let viewWidth = window.innerWidth;
  rootel.style.fontSize = viewWidth/25 + 'px';
</script>
```

设置 scss

```scss
$rem: 30; //  750/25 = 30

body {
  margin: 0;
}

.menu {
  height: 277rem / $rem;
  display: flex;
  flex-wrap: wrap;

  .item {
    width: 80rem / $rem;
    height: 136rem / $rem;
    margin: 0 35rem / $rem;
    background: #0aa5e2;
  }
}
```

编译后

```css
body {
  margin: 0;
}

.menu {
  height: 9.2333333333rem;
  display: flex;
  flex-wrap: wrap;
}

.menu .item {
  width: 2.6666666667rem;
  height: 4.5333333333rem;
  margin: 0 1.1666666667rem;
  background: #0aa5e2;
}
```

## flex

[flex教程-阮一峰](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

```
 flex-direction: row | row-reverse | column | column-reverse;
/*用来控制子项整体布局方向，是从左往右还是从右往左，是从上往下还是从下往上。*/

flex-wrap: nowrap | wrap | wrap-reverse;
/*用来控制子项整体单行显示还是换行显示，如果换行，则下面一行是否反方向显示。*/

flex-flow: <‘flex-direction’> || <‘flex-wrap’>
/*是flex-direction和flex-wrap的缩写*/

justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
/*属性决定了水平(主轴)方向子项的对齐和分布方式*/

align-items: stretch | flex-start | flex-end | center | baseline;
/*子项们相对于flex容器在垂直方向上的对齐方式*/

align-content: stretch | flex-start | flex-end | center | space-between | space-around | space-evenly;
/*针对多行子项们相对于flex容器在垂直方向上的对齐方式*/

```

缩写 flex


#### flex-grow 搜收缩

```html
<style>
ul{
  width:500px;
  display:flex;
  flex-direction:row;
}
li:nth-child(3){
  flex-grow:0;
}
</style>
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>5</li>
</ul>
```


  
### 子元素

order 用于调整子项的排列顺序，值 越大  排序位置越靠后；

align-self:baseline 兼容性不好
## 扩展

UI 工具
[蓝湖](https://lanhuapp.com/)
[摹客](https://app.mockplus.cn/)

### css

#### 声明全局变量

声明方式 `--`

读取方法 `var` 函数

```css
:root {
  --Colors: red;
}

.box: {
  color: var(--Colors);
}
````
### 圣杯布局

