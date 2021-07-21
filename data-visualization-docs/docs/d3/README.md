## d3 

有点过时了 o(╥﹏╥)o

[d3](https://d3js.org/) [github api](https://github.com/d3/d3/blob/master/API.md
)

![d3](/assets/img/d3.jpg)

## 介绍

D3.js（D3或Data-Driven Documents）是一个使用动态图形进行资料可视化的JavaScript程序库。与W3C标准兼容，并且利用广泛实现的SVG、JavaScript和CSS标准，改良自早期的Protovis程序库。与其他的程序库相比，D3对视图结果有很大的可控性。

> 本质上也是 数据 驱动 视图

### 发展
D3是2011年面世的，同年的8月发布了2.0.0版。到2018年4月，D3已被更新到了5.5.0版[1]。

### 应用

1. D3 是一个基于 web 标准的 JavaScript 可视化库。 
2. D3 可以借助 `SVG`, `Canvas` 以及 `HTML` 将你的数据生动的展现出来
3. D3 善长于可视化，而不止于可视化，还提供了数据处理、数据分析、DOM 操作等诸多功能。
4. D3 更接近底层，与 g2、echarts 不同，d3 能直接操作 svg，所以拥有极大的自由度，几乎可以实现任何 2d 的设计需求。


## dom操作

dom相关的操作 与 `jq`类似，但又不尽相同。


#### 选择器

- css选择器
- dom对象选择 （对dom对象的封装）

例子
```html
<body>
  <div id="main"></div>
  <script src="https://lib.baomitu.com/d3/6.2.0/d3.js"></script>
  <script>

    const main = d3.select('#main');//这里的 id
    console.log(main);
  </script>
</body>
```

#### 方法

- 单选 select()  单选  
- 多选 selectAll() 多选 
- 时间监听 on() [事件的绑定与`jq`相差无几] 

例子 select selectAll
```html
<body>
  <div id="main"></div>
   <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
  </ul>
  <script src="https://lib.baomitu.com/d3/6.2.0/d3.js"></script>
  <script>

    const main = d3.select('#main');//这里的 select
    console.log(main);
    // 设置属性
    const svg = main.append('svg').attr('width', '100%');
    console.log(svg);

    // 设置所有 li 的class为 yf
    d3.selectAll('li').attr('class','yf')

  </script>
</body>
```

> 注意 d3 是支持 链式操作的；对于 append 等（新增）操作 其下一个元素是 append 的元素；attr（设置属性）等操作则是本身

例子 on（事件绑定）
```html
 <div id="main" style="height: 100vh;"></div>
  <script src="https://lib.baomitu.com/d3/6.2.0/d3.js"></script>
  <script>

    const main = d3.select('#main')
    const svg = main.append('svg').attr('width', '100%').attr('height', '100%');;

    const circle = svg.append('circle').attr('cx',100).attr('cy',100).attr('r',50)

    // 绑定事件
    circle.on('mouseover',()=>{
    //   attr 填充（fill）颜色
      circle.attr('fill','red')
    })

    circle.on('mouseout',()=>{
      circle.attr('fill','#000000')
    })
    </script>
```

> fill 关键字  填充
> 颜色 与css 支持一样 （颜色名称 red）、（16进制值  #ffffff）、（rgb（255，0, 0））

##### 扩展 d3中的委托

```html
<head>
  <style>
    .yf{
      background: red;
    }
  </style>
</head>

<body>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
  </ul>
  <script src="https://lib.baomitu.com/d3/6.2.0/d3.js"></script>
  <script>
    const ul = d3.select('ul')
    ul.on('click',({target})=>{
      d3.select(target).attr('class','yf')
    })

  </script>
```
![d32](/assets/img/d3/d32.png)

#### 过滤 filter

- nth-child(even)  css3选择器
- ()=>{} 回调函数





### 设置元素样式

### 设置元素内容

### 增删元素





















## api

- 选择元素

css 选择器
dom选择器

- 方式

单选 select
多选 selectAll



- 设置class

classed(class, true/false) 新增 删除


## 注意

链式操作

cont.append('p').text('我是188')

## svg 与 d3

d3优势对 svg的操作 == 否则 jq 就可以替换 

## svg


version 版本

xmlns 命名空间

width height

viewBox 0 0 400 400 元素 位置 尺寸 （相机）

```css
svg{
    background:red;
}

```

### rect
rect  矩形 

    width   宽
    height  高
    fill    填充色

    x
    y

```html

<svg>
    <rect>
    </rect>
</svg>

```

### circle 圆




### svg 坐标系

移动方式

你在一个窗口前看外面的风景（焦点）


想想一个 窗口 

眼睛的移动位置

哈哈

### rect坐标系

正常移动




### path 路径

```
<path p="
    M
    300 300
    L
    500 300
"

    fill='none'
    stroke='#000'
    stroke-width='4'
    stroke-dasharray='10'

></path>

```


M 点

L 线

