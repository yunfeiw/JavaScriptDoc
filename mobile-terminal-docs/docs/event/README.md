## 移动端事件

- 指间操作
- 横竖屏检测
- 加速度检测

## 指间操作

首先看下 PC 端和移动端的事件

### PC 端

```js
const box = document.querySelector("#box");

box.onmousedown = function() {
  console.log("mousedown");
};
box.onmousemove = function() {
  console.log("mousemove");
};
box.onmouseup = function() {
  console.log("mouseup");
};
```

事件效果

1. 鼠标在元素上移动 mousemove
2. 鼠标按下 moushdown
3. 鼠标抬起 mouseup

### 移动端事件

```js
const box = document.querySelector("#box");

box.ontouchstart = function() {
  console.log("touchstart");
};

box.ontouchmove = function() {
  console.log("touchmove");
};

box.ontouchend = function() {
  console.log("touchend");
};
```

事件效果

1. 手指在元素身上按下 touchStart
2. 手指在屏幕中移动 touchMove (在此之前手指必须在元素身上按下，不管移动的时候手指是否在元素身上)
3. 手指在屏幕中抬起 touchEnd (在此之前，手指必须在元素身上按下，不管抬起的时候手指是否在元素身上)

### 移动端事件对象

```js
const box = document.querySelector("#box");

box.ontouchstart = function(e) {
  console.log(e);
};
```

![事件对象](/assets/img/event/eventobj.png)

- touches [] 当前屏幕中的手指列表
- targetTouches [] 当前元素身上的手指列表
- changedTouches [] 触发当前事件的手指列表
  - 当前手指按下的位置等信息

### 注意

1. 移动端中同时支持`pc`事件与`移动端`事件

2. 移动端事件比较于 PC 端`先执行`，PC 端事件的执行会延迟一段时间

   - 移动端在点击元素时，会立即执行元素上的`touch`事件，同时记录点击的坐标点
   - 等`touch`事件执行完成之后，会在 `此`坐标中，查找元素，并执行元素升上的 mouse 事件（300ms）
   - mouse 事件和 touch 事件可以不在同一个元素身上，只在乎这两个元素是否在同一个坐标点

举个栗子

```js
box.onmousedown = function() {
  console.log("click");
};

box.ontouchstart = function() {
  console.log("touch");
};

// 打印

touch;
click;
```

延时 300ms 执行下看看

```js
box.onmousedown = function() {
  console.log("click");
};

box.ontouchstart = function() {
  setTimeout(() => {
    console.log("touch");
  }, 300);
};

// 打印

click;
touch;
```

> 上述问题 引发经典问题 _事件点透_

## 问题 事件点透

```html
<style>
  .box {
    width: 500px;
    height: 500px;
    background: rgba(0, 200, 145, 0.6);
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
<body>
  <div class="box" id="box"></div>
  <span data-href="http://yunfei.ltd">yunfei.ltd</span>

  <script>
    box.ontouchstart = function() {
      this.style.display = "none";
    };
  </script>
</body>
```

点击 yunfei.ltd 的上方遮罩后，遮罩隐藏，同时触发 pc 端的 click 事件（`a标签的href属性即为click事件`），跳转至 yunfei.ltd;

#### 解决方案

1. 不在移动端使用 pc 端事件（包括 a 标签）

```html
<body>
  <div class="box" id="box"></div>
  <span data-href="http://yunfei.ltd">yunfei</span>

  <script>
    box.ontouchstart = function() {
      this.style.display = "none";
    };

    document.ontouchstart = function(ev) {
      let target = ev.target;
      let dataset = target.dataset;
      if (dataset.hasOwnProperty("href")) {
        window.location.href = dataset.href; //通过location.href跳转
      }
    };
  </script>
</body>
```

2. 延时 300ms 执行

```html
<body>
  <div class="box" id="box"></div>
  <a href="http://yunfei.ltd">yunfei</span>

  <script>
    box.ontouchstart = function() {
        setTimeout(()=>{
            this.style.display = "none";
        },300)
    };
  </script>
</body>
```

3. 阻止默认事件（使用较多）

```html
<body>
  <div class="box" id="box"></div>
  <a href="http://yunfei.ltd">yunfei</span>

  <script>
   box.ontouchstart = function(ev){
        this.style.display = 'none';
        ev.preventDefault();
    }

    // 阻止 document默认事件 bad 大于 ok
    document.addEventListener('touchstart',function(ev){
        ev.preventDefault();
    },{passive:false})
  </script>
</body>
```

## 指间事件坐标

在做指间操作时，要理解坐标啊 w(ﾟ Д ﾟ)w

![坐标](/assets/img/event/zuobiao.png)

### 指间操作栗子

拖拽效果

pc 端

```html
<style>
    * {
      margin: 0;
      padding: 0;
    }

    #box {
      width: 100px;
      height: 100px;
      border: 1px solid;
    }
  </style>
</head>

<body>

  <div id="box"></div>
  <script>
    const box = document.querySelector('#box')
    box.onmousedown = function (e) {
      const {  offsetX,  offsetY } = e
      document.onmousemove = function (ev) {
        const {  clientX,  clientY  } = ev;
        // 当前元素位置 需要 减去 鼠标与元素的 偏移量
        box.style.transform = `translate(${clientX-offsetX}px,${clientY-offsetY}px)`;
        ev.preventDefault();
      }

      box.onmouseup = function () {
        document.onmousemove = null
      }
    }
  </script>
</body>

```

移动端

> 移动端下 无法取得 `offset`,所以需要我们自己计算 [ 当前手指的坐标 - 当前元素的 坐标]

```html
<style>
    * {
      margin: 0;
      padding: 0;
    }

    #box {
      width: 100px;
      height: 100px;
      border: 1px solid;
    }
  </style>
</head>

<body>

  <div id="box"></div>
  <script>
    const box = document.querySelector('#box')
    let offsetX,offsetY;

    box.ontouchstart = function(e){
      // 当前元素坐标
      const {left,top} = box.getBoundingClientRect();
      // 手指坐标
      const {pageX,pageY} = e.changedTouches[0]
      // 计算偏移量
      offsetX = pageX - left;
      offsetY = pageY - top;
    }
    box.ontouchmove = function(ev){
      const {pageX,pageY} = ev.changedTouches[0];

      box.style.transform = `translate(${pageX-offsetX}px,${pageY-offsetY}px)`;
      ev.preventDefault();//移动端有弹性效果
    }
  </script>
</body>

```

### 幻灯片

```html
<head>
  <style>
    body {
      margin: 0;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .box {
      width: 100vw;
      overflow: hidden;

      .list {
        display: flex;
        float: left;
        transition: 0.5s;

        .item {
          img {
            width: 100vw;
            vertical-align: top;
          }
        }
      }
    }
  </style>
</head>
<body>
  <div class="box">
    <ul class="list">
      <li class="item"><img src="img/img01.png" /></li>
      <li class="item"><img src="img/img02.png" /></li>
      <li class="item"><img src="img/img03.png" /></li>
      <li class="item"><img src="img/img04.png" /></li>
      <li class="item"><img src="img/img05.png" /></li>
    </ul>
  </div>

  <script>
    // 选题：做无缝滚动
    let list = document.querySelector(".list");

    let startPoint = 0; //手指按下时手指的位置
    let transX = 0; // 手指移动的距离
    let startX = 0; //手指按下时元素的位置
    let lastX = 0; //移动过后，元素的位置

    let viewWidth = window.innerWidth;
    let prop = 0.3; //比例
    let now = 0; //当前是第几张

    list.ontouchstart = function(ev) {
      let touch = ev.changedTouches[0];
      startPoint = touch.pageX;
      startX = lastX;
    };

    list.ontouchmove = function(ev) {
      let touch = ev.changedTouches[0];
      transX = touch.pageX - startPoint;
      lastX = startX + transX;

      this.style.transition = "none";
      this.style.transform = `translateX(${lastX}px)`;

      ev.preventDefault(); //移动端有弹性效果
      //手指当前的位置  减去  手指按下时的位置 = 手指移动的距离 + 元素原来的位置 = 元素当前的位置
    };

    list.ontouchend = function(ev) {
      if (Math.abs(transX) > viewWidth * prop) {
        now -= transX / Math.abs(transX);
      }
      lastX = -now * viewWidth;
      this.style.transition = "0.5s";
      this.style.transform = `translateX(${lastX}px)`;
      transX = 0;
    };
  </script>
</body>
```

## 横竖屏检测

- 媒体查询 orientation
- 事件监听 orientationchange

### landscape

通过使用 orientation:landscape

```html
<style>
    * {
      margin: 0;
      padding: 0;
    }

    html,
    body {
      height: 100%;
    }

    .content {
      width: 100vw;
      height: 100vh;
    }

    .box {
      width: 100px;
      height: 200px;
      background: red;
    }

    @media all and (orientation:landscape) {
      .box {
        width: 200px;
        height: 100px;
        background: blue;
      }
    }
  </style>
</head>

<body>
  <div class="content">
    <div class="box"></div>
  </div>
</body>
```

- orientationchang 事件

```html
  <style>
    * { margin: 0; }
    html, body { height: 100%;}

    .content { width: 100vw; height: 100vh; }

    .box {
      width: 400px;
      height: 500px;
      background: red;
    }

    .active {
      width: 500px;
      height: 300px;
      background: blue;
    }
  </style>
</head>

<body>
  <div class="content">
    <div class="box"></div>
  </div>
  <script>
    let box = document.querySelector('.box');
    window.addEventListener('orientationchange',function(){
      console.log(window.orientation)

      switch(window.orientation){
        case 90:
        case -90:
          box.classList.add('active');
          break;
        default:
        box.classList.remove('active');
      }
    })
  </script>
</body>
```

## 加速度检测

监听 window 事件 `devicemotion`

```html
<div class="box"></div>

<script>
  let box = document.querySelector(".box");
  window.addEventListener("devicemotion", function(ev) {
    let motion = ev.acceleration; //当前手机的加速度；
    let { x, y, z } = motion;
    box.innerHTML = `
            x轴：${x.toFixed(2)}<br>
            y轴：${y.toFixed(2)}<br>
            z轴：${z.toFixed(2)}
        `;
  });
</script>
```

### 例子 晃动的小球

```html
<meta name="viewport" content="width=device-width">
    <style>
        html,body{
            height: 100vh;
        }
        body{
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .box{
            width: 100px;
            height: 100px;
            background: #0a6999;
            font-size: 50px;
        }
    </style>
</head>
<body>

<div class="box"></div>

<script>
    let box = document.querySelector('.box');
    window.addEventListener('devicemotion',function(ev){
        let motion = ev.acceleration  //当前手机的加速度；
        let {x,y,z} = motion;
        box.style.transform = `translate3d(${x*6}px,${y*6}px,${z*6}px)`;
    })
</script>

</body>
```

### 重力加速度

accelerationIncludingGravity 当前手机的重力加速度

```html
<div class="box"></div>

<script>
  let box = document.querySelector(".box");
  window.addEventListener("devicemotion", function(e) {
    let motion = e.acceleration; // 当前手机加速度
    let gravity = e.accelerationIncludingGravity; //重力加速度

    let { x, y, z } = motion;
    let { x: a, y: b, z: c } = gravity;
    box.innerHTML = `
            x轴：${a.toFixed(2)}<br>
            y轴：${b.toFixed(2)}<br>
            z轴：${c.toFixed(2)}
        `;
  });
</script>
```

### 栗子 移动的小方块

```html
<style>
        html,body{
            height: 100vh;
        }
        body{
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .box{
            width: 100px;
            height: 100px;
            background: #0a6999;
            font-size: 50px;
        }
    </style>
</head>
<body>

<div class="box">

</div>

<script>
    let box = document.querySelector('.box');
    let tx = 0, ty = 0;//当前方块位置
    window.addEventListener('devicemotion',function(ev){
        let motion = ev.acceleration  //当前手机的加速度；
        let gravity = ev.accelerationIncludingGravity;//当前手机的重力加速度
        let {x,y,z} = motion;
        let {x:a,y:b,z:c} = gravity;

        a -= x;
        b -= y;
        // 注意下手机的 坐标系
        tx -= a;
        ty += b;

        box.style.transform = `translate(${tx}px,${ty}px)`;
    })
</script>
```

![坐标](/assets/img/event/zuobiao2.png)

## 兼容

- 加速度的取值 ios 和安卓是相反的
- ios9 之后，必须用 https 才能调用传感器 页面必须使用 https 协议，才能给你权限调用传感器
- ios12.2 之后，用户必须在设备中打开"动作与方向的访问权限"
- ios13 之后，ios 要求使用"动作与方向的访问权限",必须用户授权
- ios14 之后，动作与方向的访问权限必须用户手动触发，而且找不到修改入口
