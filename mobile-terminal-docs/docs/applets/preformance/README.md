## 性能优化

## 小程序的启动

![小程序的启动](/assets/img/applets/preformance.png)

## 分包加载

采用分包时，小程序的代码包有两种：

- 一个`主包`，包含小程序启动时会马上打开的页面代码和相关资源。
- 多个`分包`，包含其余的代码和资源。


app.json 中的配置

```json
{
  "pages":["pages/index/index","pages/logs/logs"],
  "subPackages": [
    {
      "root": "packageA",
      "pages": [“pages/apple/apple"]
    }, {
      "root": "packageB",
      "pages": ["pages/banana/banana"]
    }
  ]
}
```

### 代码包的大小限制

单个分包/主包大小不能超过 2M

整个小程序所有分包大小不超过 20M


### 注意
> 精简代码，去掉不必要的WXML结构和未使用的WXSS。
> 减少在代码包中直接嵌入的资源文件。
> 压缩图片，使用适当的图片格式。

#### Page 构造器

页面的多次显示，并不会使得这个页面的JS文件被执行多

`wx.navigateTo` 方法会重新实例化目标页面的Page构造器。

`wx.navigateBack` 方法不会重新实例化目标页面的Page构造器，但它会销毁当前页面。


## 页面层级


视图层内，小程序的每一个页面都独立运行在一个页面层级上

小程序启动时仅有一个页面层级，每次调用wx.navigateTo，都会新建一个页面层级；

wx.navigateBack会销毁一个页面层级，并且不会再重新实例化返回页的Page构造器。

在小程序启动前，微信会提前准备好一个页面层级用于展示小程序的首页。

每当一个页面层级被用于渲染页面，微信都会提前开始准备一个新的页面层级，使得每次wx.navigateTo 跳转页面时都能够尽快展示一个新的页面。

## 数据通信

- 逻辑层向视图层发送页面数据（setData）
- 视图层向逻辑层反馈数据和用户事件 (data-key、bind:*)

## 提高数据更新速度

### js

- 多次setData合并成一次setData调用
- 数据通信的性能与数据量正相关，数据字段不在界面中展示，且数据结构比较复杂或包含长字符串，则不应使用setData来设置这些数据。
- 与界面渲染无关的数据最好不要设置在data中，可以考虑设置在page对象的其它字段下。

### wxml

- 去掉不必要的事件绑定（WXML中的bind和catch），从而减少通信的数据量和次数。
- 不要在节点的data前缀属性中放置过大的数据，因为事件绑定时需要传输target和currentTarget的dataset


## 小程序基础库版本的兼容

在小程序管理后台设置“基础库最低版本设置”，可以达到不向前兼容的目的
