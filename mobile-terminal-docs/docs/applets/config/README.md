
## 基础

## 代码组成

![目录](/assets/img/applets/dir.png)

- JSON 配置
- WXML 模板
- WXSS 样式
- JS 脚本

## JSON 配置

JSON 是一种数据格式,在小程序中，JSON 扮演的静态配置的角色。

常见的 json 配置文件有 3 种：

- 小程序配置 app.json：做全局配置
- 页面配置 page.json：对小程序具体页面的配置
- 工具配置 project.config.json：对开发者工具的个性化配置

> 注意：小程序无法在运行过程中去动态更新 JSON

### 扩展 - JSON 语法

- JSON 文件都是被包裹在一个大括号{} 中
- JSON  中无法使用注释
- 键名需要双引号” ” 包裹
- 键值之间有冒号 : 分隔
- 键值对之间用逗号 , 分隔
- JSON 的值只能是以下几种数据格式：
  - 数字，包含浮点数和整数
  - 字符串，需要包裹在双引号中
  - Bool 值，true 或者 false
  - 数组，需要包裹在方括号中 []
  - 对象，需要包裹在大括号中 {}
  - Null

## WXML 模板

微信标记语言，结合小程序的基础组件、事件系统，可以构建出页面

创建 WXML 文件的方法：在 app.json 中的“pages/index/index” 上新增一行 “pages/wxml/index” ，便会自动创建 WXML 文件。

### 组件

- 组件是视图层的基本组成单元。
- 组件自带一些功能与微信风格一致的样式。
- 一个组件通常包括 开始标签 和 结束标签，属性 用来修饰这个组件，内容 在两个标签之内

`<view></view>`, `<image></image>`, `<button></button>`等

## 语法

### 数据绑定

WXML 通过 {{ 变量名 }} 来映射 js 里的 data 数据。

> 注意 变量名是大小写敏感；没有被定义的变量的或者是被设置为 undefined 的变量不会被同步到 wxml 中

栗子

```html
<text id="{{id}}">{{msg}}</text>

data: {      id:1,      msg:'haha' }
```

#### `{{}}`

{{}} 具有两种功能：动态渲染、逻辑运算。

{{}} 中除了变量名，还可以放置数字、字符串，并且做一些逻辑运算。

常见的逻辑运算的语法：

- 算数运算
- 字符串拼接
- 三元运算

### 条件逻辑

在 WXML 里有一套 if、elif、else 组合。

```html
<text wx:if="{{name==='a'}}">……</text>
<text wx:elif="{{name==='b'}}">……</text>
<text wx:else>……</text>
```

`<block>`可以一次性判断多个组件标签。

```html
<block wx:if="{{true}}">
  <view>……</view>
  <view> …… </view>
</block>
```

### 列表渲染

WXML 使用 wx:for 渲染列表，默认数组的当前项的变量名为 item，下标名为 index。

```html
<view wx:for="{{food}}" wx:key="id">
  <text>{{item.name}}</text>
</view>
```

> 唯一标志符

- wx:key 是列表中每一个项目的唯一的标识符。
  这个标志符可以提高 wxml 动态渲染的效率。比如列表数据中的某一项数据发生改变时，微信会根据唯一标志符，找找到 wxml 列表中与此条数据对应的项目，然后只对此项目进行渲染。
- wx:key 的赋值方式

```html
列表项目的属性
<view wx:for="{{objectArray}}" wx:key=“attr" > {{……}} </view>

列表项目自身
<view wx:for="{{numberArray}}" wx:key="*this" > {{……}} </view>

```

### 模板扩展

wxml 中的重复性元素，可以制作成模板，从而方便批量修改。

```html
<!-- template 模板需要设置name -->
<template name="hotel">
  <text>{{name}}：</text>
  <text wx:for="{{person}}" wx:key="id">{{index?'、':''}}{{item.name}}</text>
</template>

<!-- 使用模板时，is 指定其使用的模板，data 指定模板数据 -->
<template is=“hotel” data=“{{name:'yunfei',person}}"></template>

```

## wxss

WXSS（WeiXin Style Sheets）是小程序的样式语言，用于描述 WXML 的组件的视觉效果。WXSS 就相当于网页里的 css

> 单位为 rpx；一个单位的 rpx 是手机宽度的 1/750，所以设计图纸应为 750px；

### 样式类型

- 项目公共样式：app.wxss，它会作用到小程序的每个页面。
- 页面样式：与 app.json 注册过的页面同名且位置同级的 WXSS 文件。
- 内联样式：在 wxml 中，写在标签的 style 属性里的样式
- 其它样式：可以被项目公共样式和页面样式引用的样式，比如模板文件里的样式。
  > 注：小程序中不需要考虑样式文件的请求数量，不用像前端那样合并 css 文件。

### wxss 使用注意点

- wxss 拥有相对的尺寸单位 rpx，一个单位的 rpx 是手机宽度的 1/750
- 外联样式可用@import 导入
- background-image 里的图片为网络图片时，其图片所在网络的域名要经过微信许可（https）。
- position 为 absolute 的元素，需要 position 为 fixed 的容器。（这是由小程序的文档流中不存在 window、document 对象导致的）

### wxss 选择器

- 类
- id
- 属性
- 伪类选择器
  - ::after
  - ::before

![权重](/assets/img/applets/quanzhong.png)

## js

### 作用域

- 小程序的作用域同 NodeJS 比较相似。
- 在一个文件中声明的变量和函数只在该文件中有效。
- 因此，在不同的文件中可以声明相同名字的变量和函数，不会互相影响。

### 模块化

es6 中模块化语法可以应用于小程序中

```js
// 模块A
export default class A {
  constructor(name) {
    this.name = name;
  }
}
// 在index.js 中引入A 模块
import A from "./A.js";
Page({
  data: {
    fruit: new A("yunfei"),
  },
});

```