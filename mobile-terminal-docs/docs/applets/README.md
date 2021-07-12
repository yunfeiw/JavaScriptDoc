## 小程序

全新的连接`用户端`与`服务端`的方式

小程序可以在微信内被便捷的获取和传播

出色的用户体验

## 小程序与网页的区别

- 线程

1. 网页开发时单线程，js 线程和渲染线程是互斥的
2. 小程序有一条`js逻辑线程`和多条`渲染线程`

- DOM

1. 网页开发可以操作 DOM
2. 小程序中不能操作 DOM

- 运行环境

1. 网页是在 PC 端和移动端的浏览器上运行
2. 小程序是在 android、IOS、小程序开发工具上运行

## 优势

用户可以通过二维码、搜索、朋友的分享等方式打开

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

## 小程序宿主环境

宿主环境是微信客户端给小程序提供的一种环境 。

宿主指的就是微信客户端，也就是官方 API 里的 wx 对象。

#### 宿主环境的作用是什么？

宿主环境会把我们写的各种文件整合到一起，进行解析，然后在微信 APP 里显示出我们所看到的样子。

宿主环境可以为小程序提供微信客户端的能力，比如微信扫码，这是普通网页不具备的。

```
wxml
wxss ==> 宿主环境 ==> 界面
js
json
```

## 界面渲染原理

1. 在渲染层，宿主环境会把 WXML 转化成对应的 JS 对象，也就是虚拟 Dom。
2. 在逻辑层发生数据变更的时候，我们可以用 setData 方法把数据从逻辑层传递到渲染层。
3. 在渲染层对比虚拟 Dom 的前后差异，把差异应用在真实 Dom 上，渲染出正确的 UI 界面。

![渲染原理](/assets/img/applets/xuanran.png)

### wxml to vdom

WXML 结构实际上等价于一棵 Dom 树，即真实 Dom。

JS 对象也可以来表达 Dom 树的结构，即虚拟 Dom。

![渲染原理](/assets/img/applets/dom-vdom.png)

## App 函数

用于注册一个程序 App。

- App() 构造器必须写在项目根目录的 app.js 里。如：App({…})
- App 实例是单例对象，也是一个全局对象，就像网页里的 window 一样。
- 在其他 JS 脚本中可以使用宿主环境提供的 getApp() 方法来获取 App 实例。利用 getApp() 我们可以将数据写入全局，或者从全局读取数据。

```js
const app = getApp();
```

## 小程序运行流程

![渲染原理](/assets/img/applets/liucheng.png)

## 小程序状态

- 后台状态：用户点击小程序右上角关闭按钮，或手机的 home 键时，会离开小程序，但小程序并不会被销毁，而是进入后台状态。此时，APP 构造器参数里的 onHide 方法会被调用。
- 前台状态：用户再次点击小程序时，微信用户端会唤醒后台状态的微信小程序，微信小程序就进入了前台状态，onShow 方法会被调用。

> App 的生命周期是由用户操作主动触发的，开发者不能在代码里主动调用

## 页面组成

一个页面是分三部分组成：

- 界面：WXML、WXSS
- 配置：JSON
- 逻辑：JS

### 页面构造器 Page 函数

页面的 js 里的所有代码都是写在 Page()构造器里的。

Page 构造器接受一个 Object 参数，在 Object 中可以绑定数据，监听页面事件。

```js
Page({
  data: { text: "This is page data." },
  onLoad: function(options) {},
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  onPageScroll: function() {},
});
```

### 生命周期

1. 页面初次加载时：`onLoad`，在页面没被销毁之前只会触发 1 次。
2. 页面显示时：`onShow`，从别的页面返回到当前页面时，都会被调用。
3. 页面初次渲染完成时：`onReady`，在页面没被销毁前只会触发 1 次，在逻辑层可以和视图层进行交互。

页面显示后，随着用户的操作，还会触发其它的事件：

- 页面不可见时：`onHide`，`wx.navigateTo` 切换到其他页面、底部 tab 切换时触发。
- 返回到其它页时：`onUnload`，`wx.redirectTo` 或 `wx.navigateBack` 使当前页面会被微信客户端销毁回收时触发。

### 事件

- 下拉刷新 onPullDownRefresh

  监听用户下拉刷新事件，需要在全局或具体页面的 `json` 文件中配置 `enablePullDownRefresh` 为 true。

- 上拉触底 onReachBottom

  监听用户上拉触底事件。可以在 app.json 的 window 选项中或页面配置 `page.json` 中设置触发距离 `onReachBottomDistance` 。在触发距离内滑动期间，本事件只会被触发一次。

- 页面滚动 onPageScroll

  监听用户滑动页面事件，参数为 Object，包含 scrollTop 字段，表示页面在垂直方向已滚动的距离（单位 px）

- 用户转发 onShareAppMessage

  只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮，在用户点击转发按钮的时候会调用，此事件需要 return 一个 Object，包含 title 和 path 两个字段，用于自定义转发内容

### data 注意事项

- 用数据驱动视图渲染要用 this.setData()，而要用 this.data，这不仅无法驱动视图，还会造成数据不一致。
- 由于 `setData` 是两个线程间的通信，为了提高性能，每次设置的数据不应超过`1024KB` 。
- 不要把 data 中的任意一项的 value 设为 `undefined`，否则可能会有引起一些不可预料的 bug。

### 页面跳转

页面跳转的方式有很多种：

- 在 app.json 中用 tabBar 属性设置跳转方式
- 在 wxml 页使用导航组件 `<navigator>`跳转页面
- 在 js 中用路由 API 跳转

### 异步处理

- 小程序只有一个 JSCode 线程，页面有多个。

- 小程序切换页面时，小程序的逻辑层依旧运行在同一个 JsCore 线程中。

- 页面使用了 `setTimeout` 或者 `setInterval` 的定时器后，跳转到其他页面时，这些定时器并没有被清除，需要开发者自己在页面离开的时候进行清理。

## 自定义组件

- 小程序的宿主环境提供了一系列基础组件，如 view、text。
- 但有的时候，我们还需要自定义组件。自定义组件的名称要小写：`<yunfei-view></yunfei-view>`

### 使用

1. 在主项目下建立 components 文件夹，在其中建立 floatball 文件夹，在此文件夹上右击“新建 Component”，这样就可以建立出 json、wxml、wxss、js 四个文件。
2. 组件的 json 中设置 "component": true
3. 组件的 wxml、wxss 可以正常写。
4. 组件的 js 中的 properties 可以接受父组件属性。
5. 父组件在调用子组件时要在其 json 文件中设置 usingComponents，如：

```json  
"usingComponents": {
    "floatball":"/components/floatball/floatball"
  }
```

## 组件通信

properties

#### 父组件向子组件传递数据：属性

父组件 wxml：

```html
<yun-fei text="wang"></yun-fei>
```

子组件 js：

```js
  properties: {
    text:{type:'string',value:'haha'}
  },
```

#### 子组件向父组件传递数据：事件

在父组件调用子组件时，为其绑定事件，如：

```html
<yun-fei bind:lala="lala"></yun-fei>
```

> 建议 onClickBall 的属性名和属性值都写成一样，免得把“在父组件中使用属性值，在子组件中触发属性名”记混了。

在子组件中触发事件的方法是 triggerEvent(eventName, detail)，如 this.triggerEvent('lala',{tap:true})

## 微信 API

几乎所有小程序的 API 都挂载在 wx 对象底下（除了 App/Page 等特殊的构造器）。

小程序提供的 API 按照功能主要分为：网络、媒体、文件、数据缓存、位置、设备、界面、界面节点信息、特殊的开放接口。

### API的常见规律

- wx.on* 开头的 API 是监听某个事件发生的API接口，接受一个 Callback 函数作为参数。当该事件触发时，会调用 Callback 函数。如wx.onError()
- 后缀带Sync 的方法是同步的方法。如wx.getSystemInfoSync()
如未特殊约定，多数 API 接口为异步接口 ，都接受一个Object作为参数。如wx.getSystemInfo()
- API的Object参数一般由success、fail、complete 来接收请求结果的。如request 接口
- wx.get* 开头的API是获取宿主环
- wx.set* 开头的API是写入数据到宿主环境的接口。如wx.setNavigationBarTitle(Object object)

## 用户事件行为

touchstart	手指触摸动作开始

touchmove	手指触摸后移动

touchcancel	手指触摸动作被打断，如来电提醒，弹窗

touchend	手指触摸动作结束

tap	手指触摸后马上离开

longpress	手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发

longtap	手指触摸后，超过350ms再离开（推荐使用longpress事件代替）

transitionend	会在 WXSS transition 或 wx.createAnimation 动画结束后触发

animationstart	会在一个 WXSS animation 动画开始时触发

animationiteration	会在一个 WXSS animation 一次迭代结束时触发

animationend	会在一个 WXSS animation 动画完成时触发

### 事件捕捉和事件冒泡

bind前加上capture- 表示事件捕捉，如capture-bind:tap

若不加前缀，bind:tap 和bindtap是一回事。

![冒泡捕获](/assets/img/applets/maopao-buhuo.png)
