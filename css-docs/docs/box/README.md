## 盒模型

![css](/assets/img/box/box1.png)

所有 HTML 元素可以看作盒子

盒模型又称框模型（Box Model）,包含了元素内容（content）、内边距（padding）、边框（border）、外边距（margin）几个要素

## 标准模型与 IE 模型区别

根据 W3C 的规范，元素内容占据的空间是由 width 属性设置的，而内容周围的 padding 和 border 值是另外计算的

不幸的是，IE5.X 和 6 在怪异模式中使用自己的非标准模型。这些浏览器的 width 属性不是内容的宽度，而是`内容`、`内边距`和`边框`的宽度的总和。

### 标准模型

![css](/assets/img/box/box2.png)

### IE 模型

![css](/assets/img/box/box3.png)

### box-sizing

css3 新增的属性 box-sizing: content-box | border-box

- 标准模型：content-box；
- IE 模型：border-box；
