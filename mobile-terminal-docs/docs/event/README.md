## 移动端事件

touch

与PC端不同


栗子

```js
box.onmousedown = function(){
    console.log('mousedown')
}
box.onmousemove = function(){
    console.log('mousemove')
}
box.onmouseup = function(){
    console.log('mouseup')
}
```

PC端`move`、`down`、`up`事件在

```js
box.ontouchStart = function(){
    console.log('ontouchdown')
}
box.ontouchmove = function(){
    console.log('ontouchmove')
}
box.ontouchEnd = function(){
    console.log('ontouchup')
}

```

> 移动端 同时支持 鼠标 触摸 两种事件
> 触摸事件 比 鼠标事件执行 速度快

执行机制



移动端 点击 元素，立即执行元素的touch事件，同时记录点击的坐标点等touch事件执行完成之后，会再此坐标中，查找元素

> BUG 事件点透

href == 点击事件

解决方案

1. 不在移动端使用 pc端事件（包括a标签）
2. 延时300ms执行
3. 阻止默认事件

