## grid

```css
display:grid;
```
网格布局（Grid）是最强大的 CSS 布局方案。

它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。以前，只能通过复杂的 CSS 框架达到的效果，现在浏览器内置了。


- gri-template-rows
- gri-template-coulmns

```html

<style>
    .box {
      width: 500px;
      height: 500px;
      display: grid;
      grid-template-columns: 100px 100px;
      grid-template-rows: 200px 100px;
    }

    .item {
      background: #0a56bb;
      box-sizing: border-box;
      border: 1px solid #fff;
    }
</style>
<body>
    <div class="box">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
    </div>
</body>
```

### grid-template

grid-template-cloumns与grid-template-rows的缩写


```css
  <style>
    .box {
      width: 500px;
      height: 500px;
      display: grid;
      grid-template: 100px 200px/300px 100px;
    }

    .item {
      background: #0a56bb;
      box-sizing: border-box;
      border: 1px solid #fff;
    }
  </style>
</head>

<body>
  <div class="box">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
</body>
```


![1](/assets/img/grid/2.png)

### fr单位

fr == 占比

```css
grid-template: 1fr 80% 1fr/300px 100px ;

/* 等价于 */

grid-template: 10% 80% 10% /300px 100px ;

```

###  repeat函数

```css
grid-template-columns:repeat(3,100px);
/* 等价于 */
grid-template-columns:100px 100px 100px;
```

- auto-fill
当我们不确定 宽度为100px元素有几行的情况下，可以设置`auto-fill`实现自适应
```css
grid-template: 1fr 80% 1fr/repeat(auto-fill,100px);
```

### 控制元素 对齐方式

- justify-content   两端对齐
- align-content     水平对齐  
- grid-gap          单元格间距


```css
  <style>
    .box {
      width: 500px;
      height: 500px;
      display: grid;
      grid-template: 100px 200px/300px 100px;
      justify-content: center;
      align-content: center;
      grid-gap:10px 20px;
    }

    .item {
      background: #0a56bb;
      box-sizing: border-box;
      border: 1px solid #fff;
    }
  </style>
</head>

<body>
  <div class="box">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
</body>

```

![3](/assets/img/grid/3.png)


### 合并单元格

- grid-column-start
- grid-column-end

```html
  <style>
    .box {
      width: 500px;
      height: 500px;
      display: grid;
      grid-template: repeat(4,100px)/repeat(5,100px);
      justify-content: center;
      align-content: center;
      grid-gap:10px;
    }

    .item {
      background: #0a56bb;
      box-sizing: border-box;
      border: 1px solid #fff;
    }
    .item:nth-child(2){
      grid-column-start:2;
      grid-column-end:5;
    }
  </style>
</head>

<body>
  <div class="box">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    
  </div>
</body>
```
![3](/assets/img/grid/4.png)





### 合并单元格

- grid-column-start
- frid-coulmn-end
```css
a{
 grid-column-start:1;
 grid-coulmn-en:3;
 grid-row-start:1;
}

```
 > 轨道线 execl单元格线 下标1开始


 ```
    1   2   3   4   5
1   X   X
2
3
4
5
 ```

 ### 合并单元格 - 高级

命名
```css
 gri-template-areas: 
 'a b c d'
 'e f g h'
 'i j k l';
```

```css 
 grid-template-areas: 
 'a a c d'
 'e f g h'
 'i j k l';

```
```css
grid-area:a //合并a
```


### 剩余位置 设置

grid-auto-column:100px;
grid-auto-row:50px;


> 排列方式 从上到下 从左到右

###  局限

只能使用矩形

### 对比flex

qiang

### caniuser.com
