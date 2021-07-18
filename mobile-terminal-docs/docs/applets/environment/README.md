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