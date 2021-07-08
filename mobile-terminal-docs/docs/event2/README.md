## 移动端事件2

## 横竖屏检测

通过媒体查询

横屏

media orientation:landscape


## 兼容横竖屏
通过js监听 orientationchange 

window.orientationchange 90 或 -90 横屏


## 加速度检测

devicemotion

const postion =  e.devicemotion

const {x,y,z} = position

## 重力加速度

```js
const postion =  e.devicemotion
// 地球加速度
let gravityy = e.accelerationIncludingGravity;
// 解构下

const {x,y,z} = position
const {x:a,y:b,z:c} = gravityy

```






## 扩展

### 居中

```css
display:table-cell
vertical-align:middle
```

### anywhere 服务器