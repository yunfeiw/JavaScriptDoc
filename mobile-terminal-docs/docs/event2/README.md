## 移动端事件 2

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

![坐标](/assets/img/event2/zuobiao.png)

## 兼容

- 加速度的取值 ios 和安卓是相反的
- ios9 之后，必须用 https 才能调用传感器 页面必须使用 https 协议，才能给你权限调用传感器
- ios12.2 之后，用户必须在设备中打开"动作与方向的访问权限"
- ios13 之后，ios 要求使用"动作与方向的访问权限",必须用户授权
- ios14 之后，动作与方向的访问权限必须用户手动触发，而且找不到修改入口
