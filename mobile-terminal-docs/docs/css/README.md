## css

grid

gri-template-rows
gri-template-coulmns

```css
gri-template-coulmns:repeat(3,100px)
gri-template-coulmns:repeat(3,100px)

/* 1fr 占比 */

缩写
```css
gri-template:1fr 80% 1fr/repeat(3,100px):(auto-fill,100px)
```

父级宽度不确定

子级 100px

尽量放多个 子级
```css
gri-template:1fr 80% 1fr/repeat(3,100px):(auto-fill,100px)
```

### 控制纵横方向

```css
justify-content:space-betwen;
alin-content:center;
```
### 纵横 间距控制
上下间距 都是10px
```css
frid-gap:10px;
```

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
