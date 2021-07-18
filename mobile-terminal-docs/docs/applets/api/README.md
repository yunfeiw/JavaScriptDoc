## 常用操作

## 生命周期

1. 页面初次加载时：`onLoad`，在页面没被销毁之前只会触发 1 次。
2. 页面显示时：`onShow`，从别的页面返回到当前页面时，都会被调用。
3. 页面初次渲染完成时：`onReady`，在页面没被销毁前只会触发 1 次，在逻辑层可以和视图层进行交互。

页面显示后，随着用户的操作，还会触发其它的事件：

- 页面不可见时：`onHide`，`wx.navigateTo` 切换到其他页面、底部 tab 切换时触发。
- 返回到其它页时：`onUnload`，`wx.redirectTo` 或 `wx.navigateBack` 使当前页面会被微信客户端销毁回收时触发。

## 事件

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

## 异步处理

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


