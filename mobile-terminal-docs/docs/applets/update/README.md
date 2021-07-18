## 更新与迭代


## 小程序基础库

小程序的组件、API其实都属于`小程序基础库`。

基础库的职责是处理`数据绑定`、`组件系统`、`事件系统`、`通信系统`等一系列框架逻辑，让整个小程序有序的运作起来。

小程序的基础库是JavaScript编写的，它可以被注入到渲染层和逻辑层运行。

渲染层注入的基础库叫做`WebView基础库`。

逻辑层注入的基础库叫做`AppService基础库`。

小程序的基础库是内置在微信客户端里的，这样做的好处有两点：

- 降低业务小程序的代码包大小。
- 基础库中的Bug 可以由官方统一修复，无需修改小程序的代码包

## 基础库版本号
小程序基础库版本号使用 semver 规范，格式为 Major.Minor.Patch，如2.3.1
- Major：重大特性发布时提升1位
- Minor：月度发布时提升1位
- Patch：版本修正时提升1位

通过`wx.getSystemInfo()`或者`wx.getSystemInfoSync()`方法获取小程序基础库版本号：

```js
let info = wx.getSystemInfoSync()
console.log("小程序基础库版本号为：" + info.SDKVersion)
```