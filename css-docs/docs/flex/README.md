## flex

[flex 教程-阮一峰](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

### 父元素

- flex-direction: row | row-reverse | column | column-reverse;

用来控制子项整体布局方向，是从左往右还是从右往左，是从上往下还是从下往上

- flex-wrap: nowrap | wrap | wrap-reverse;

用来控制子项整体单行显示还是换行显示，如果换行，则下面一行是否反方向显示

- flex-flow: <‘flex-direction’> || <‘flex-wrap’>

是 flex-direction 和 flex-wrap 的缩写

- justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;

属性决定了水平(主轴)方向子项的对齐和分布方式

- align-items: stretch | flex-start | flex-end | center | baseline;

子项们相对于 flex 容器在垂直方向上的对齐方式

- align-content: stretch | flex-start | flex-end | center | space-between | space-around | space-evenly;

针对多行子项们相对于 flex 容器在垂直方向上的对齐方式

### 子元素

order: < integer >;

order 用于调整子项的排列顺序，值 越大 排序位置越靠后；

- flex-grow:< number > 默认值为 1

扩展的意思，扩展的是 flex 子项所占的宽度，扩展所占的空间就是除去元素外的剩余的空白间隙

- flex-shrink:< number > 默认值为 1

收缩的意思，主要处理当 flex 容器空间不足时，单个元素的收缩比例

- flex-basis:< length > | auto 默认值是 auto

  定义了在分配生育空间之前元素的默认大小。相当于对浏览器提前烤制我要占据多大的空间

- flex: nonde | auto | [<'flex-grow'><'flex-shrink'>? || <'flex-basis'> ]

  flex 属性是 flex-grow，flex-shrink 和 flex-basis 的缩写

- align-self:auto | flex-start | flex-end | center | baseline | stretch

> align-self:baseline 兼容性不好,在视图中较难显示

### 问题

父元素 设置为 display:flex 后，默认 子元素 会`收缩`；所以导致为子元素（整体宽度大于 父容器时）分配的宽度不能正确展示；

如下

```html
<style>
    * {
      margin: 0;
      padding: 0;
    }

    #box {
      width: 100vw;
    }

    ul {
      display: flex;
    }

    li {
      list-style: none;
      height: 100px;
    }

    li:nth-child(1) {
      width: 500px;
      background: red;
    }

    li:nth-child(2) {
      width: 200px;
      background: blue;
    }

    li:nth-child(3) {
      width: 700px;
      background: yellow;
    }

    li:nth-child(4) {
      width: 1000px;
      background: gray;
    }
  </style>
</head>

<body>
  <div id='box'>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</body>
```

![问题1](/assets/img/layout/wenti1.png)

解决方案 为父元素 添加浮动属性

```css
ul {
  display: flex;
  float: left;
}
```
![问题1](/assets/img/layout/wenti2.png)
