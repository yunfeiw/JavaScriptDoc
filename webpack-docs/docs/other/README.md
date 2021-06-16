## webpack other

## sourceMap

我们实际运行在浏览器的代码是通过 `webpack` 打包合并甚至是压缩混淆过的代码，所生成的代码并不利于我们的调试和错误定位，我们可以通过 `sourceMap` 来解决这个问题，`sourceMap` 本质是一个记录了编译后代码与源代码的映射关系的文件，我们可以通过 `webpack` 的 `devtool` 选项来开启 `sourceMap`

> ###### Tip
>
> 验证 devtool 名称时， 我们期望使用某种模式， 注意不要混淆 devtool 字符串的顺序， 模式是： `[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map`.

```js
module.exports = {
  mode: 'production',
  devtool: 'source-map',
  ...
}
```

首先，编译后会为每一个编译文件生成一个对应的 `.map` 文件，同时在编译文件中添加一段对应的 `map` 文件引入代码

```js
//# sourceMappingURL=xx.js.map
```

```css
/*# sourceMappingURL=xx.css.map*/
```

同时，现代浏览器都能够识别 `sourceMap` 文件，如 `chrome`，会在 `Sources` 面板中显示根据编译文件与对应的 `map` 文件定位到源文件中，有利于我们的调试和错误定位

## Code Spliting

将代码分割到多个不同的 bundle(打包后)文件中，可以通过按需加载等方式对资源进行加载，使用合理的情况下可以极大影响加载速度。

### 入口起点

通过设置多个入口文件的方式实现最简单的代码分割

```js
entry: {
  index: "./src/index.js",
  list: "./src/list.js",
},
output: {
  path: resolve(__dirname, "../dist"),
  // 多入口文件的filename不能写死名称，需要通过[name]配置
  filename: "js/[name].js",
}
```

### 防止重复

通过设置 dependOn 配置多个模块之间的共享

```js
entry: {
  index: {
    import: "./src/index.js",
    dependOn: "axios",
  },
  list: {
  	import: "./src/list.js",
  	dependOn: "axios",
  },
  axios: "axios",
},
```

>当你选择使用代码分割时，webpack可能会受[启发式](https://webpack.js.org/plugins/split-chunks-plugin/#defaults)的在多个chunk中复制依赖模块。如果发生了这种事情，这时您有可能得到相同模块的多个实例，他们之间的状态将会很难保证同步。

>当然，您可以通过设置 [`optimization.runtimeChunk`](https://webpack.js.org/configuration/optimization/#optimizationruntimechunk)为`“single”`进行解决 。这会将Webpack的运行时模块加载程序移到它自己的包中，而不是内联到每个条目中，从而创建一个全局注册表，允许在条目之间共享代码分割的模块。这并不能阻止Webpack在入口点之间复制模块代码，但它可以防止Webpack在运行时创建同一模块的两个实例，同时减少为给定页面加载模块所需的HTTP请求数。

>`runtimeChunk: "single"`是对于确保模块实例化正确所必须的，它默认是禁用状态，这在[Webpack代码分割指南](https://webpack.js.org/guides/code-splitting/)中记载着。

>尽管我们可以在webpack中对每个页面配置多入口，但我们应当避免像`entry: { page: ['./analytics', './app'] }`这样的多入口使用多引入的情况。这会让我们在使用`async`属性的`script`标签时获得更好的优化以及保证其一致的执行顺序。

### SplitChunksPlugin

将公共的依赖模块提取到已有的入口chunk文件或新的chunk文件当中

```js
entry: {
  index: "./src/index.js",
  list: "./src/list.js",
},
optimization: {
  splitChunks: {
    // async表示只从异步加载得模块（动态加载import()）里面进行拆分
    // initial表示只从入口模块进行拆分
    // all表示以上两者都包括
    chunks: "all",
  },
}
```

```js
// 默认配置
optimization: {
  splitChunks: {
    chunks: 'async',
    minSize: 20000,
    minRemainingSize: 0,
    minChunks: 1,
    maxAsyncRequests: 30,
    maxInitialRequests: 30,
    enforceSizeThreshold: 50000,
    cacheGroups: {
      defaultVendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        reuseExistingChunk: true,
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
      },
    },
  },
},
```

## 动态导入

通过`import()`动态导入模块，可以通过内联注释对chunk进行一些配置

[模块方法 | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/api/module-methods/#magic-comments)

```js
import(/* webpackChunkName: 'data', webpackPreload: true*/ './data')
	.then(data => {
		console.log(data);
	})
```

## 预加载/预获取

通过内联注释`webpackPrefetch`和`webpackPreload`两种资源提示告知浏览器对资源进行不同的加载处理

```js
const data = import(/* webpackChunkName: 'data', webpackPreload: true */ './data.js')
const data = import(/* webpackChunkName: 'data', webpackPrefetch: true */ './data.js')
```


> 与 prefetch 指令相比，preload 指令有许多不同之处：
>
> - preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
> - preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
> - preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
> - 浏览器支持程度不同。

## 外部扩展

通过externals配置在输出的bundle中排除某些依赖，这些依赖将会在用户环境中所包含。

```js
externals: 
  lodash: '_'
},
```

## tree shaking

将上下文中的dead-code移除，就像摇树上的枯叶使其掉落一样

```js
optimization: {
  usedExports: true,
}
```