## BFC

BFC(Block Formatting Context)：块级格式化上下文

BFC 决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用

## 原理（渲染规则）

- BFC 元素垂直方向的边距会发生重叠。属于不同 BFC 外边距不会发生重叠
- BFC 的区域不会与浮动元素的布局重叠。
- BFC 元素是一个独立的容器，外面的元素不会影响里面的元素。里面的元素也不会影响外面的元素。
- 计算 BFC 高度的时候，浮动元素也会参与计算(清除浮动)

## 创建 BFC

- overflow 不为 visible;
- float 的值不为 none;
- position 的值不为 static 或 relative;
- display 属性为 inline-blocks,table,table-cell;
- table-caption,flex,inline-flex;
