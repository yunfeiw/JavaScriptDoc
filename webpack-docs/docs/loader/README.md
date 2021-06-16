## webpack loader

在 `webpack` 中，有一个很重要的特性：模块不仅仅只是 `js` 的文件，`webpack` 可以把任意文件数据作为模块进行处理，包括：非 js 文本、css、图片等等

```javascript
import txt from "./a.txt";
console.log(txt);
```

但是 `webpack` 默认情况下只能处理 `js` 模块，如果需要处理其它类型的模块，则需要使用它提供的一些其它功能

## 执行简要流程

- `loaders`：`webpack` 中非常核心的内容之一，前面我们说的非 js 类型的模块处理就靠它了。webpack 可以使用 loader 来预处理文件。这允许你打包除 JavaScript 之外的任何静态资源。你可以使用 Node.js 来很简单地编写自己的 loader。

- `plugins`：`webpack` 中另外一个核心的内容，它主要是扩展 `webpack` 本身的一些功能。插件可以运行在 `webpack` 的不同阶段（钩子 / 生命周期）。

## Loaders

https://webpack.js.org/loaders/

```js
module.exports ={
    ...,
    module:{
        rules:[
            {test:/\.txt$/},
            use:{loader: 'xxx-load'}
        ]
    }

}
```

当 `webpack` 碰到不识别的模块的时候，`webpack` 会在配置的 `module` 中进行该文件解析规则的查找

- `rules` 就是我们为不同类型的文件定义的解析规则对应的 loader，它是一个数组
- `use` 针对匹配到文件类型，调用对应的 `loader` 进行处理（执行顺序 右 -> 左）

#### 例子 raw-loader

在 webpack 中通过 import 方式导入文件内容，loader 并不是 webpack 内置的，所以首先要安装

```bash
npm install --save-dev raw-loader
```

然后在 webpack.config.js 中进行配置

```javascript
module.exports = {
  ...,
  module: {
      rules: [
      {
        test: /\.(txt|md)$/,
        use: 'raw-loader'
    	}
    ]
	}
}
```

#### 例子 file-loader

把识别出的资源模块，移动到指定的输出⽬目录，并且返回这个资源在输出目录的地址(字符串)

```bash
npm install --save-dev file-loader
```

```js
module.exports = {
    ...,
    module:{
        rules:[
            {
                test:/\.(png|jpe?g|gif)$/,
                options:{
                    // placeholder 占位符 [name] 源资源模块的名称
                    // [ext] 源资源模块的后缀
                    name: "[name]_[hash].[ext]",
                    //打包后的存放位置
                    outputPath: "./images",
                    // 打包后文件的 url
                    publicPath: './images',
                }
            }
        ]
    }
}

```

> 占位符：https://webpack.js.org/loaders/file-loader#placeholders

#### 例子 css-loader

分析 `css` 模块之间的关系，并合成⼀个 `css`

```bash
npm install --save-dev css-loader
```

```js
rules: [
  ...,
	{
		test: /\.css$/,
    use: {
      loader: "css-loader",
      options: {
  			// 启用/禁用 url() 处理
  			url: true,
  			// 启用/禁用 @import 处理
  			import: true,
        // 启用/禁用 Sourcemap
        sourceMap: false
      }
    }
	}
]
```

#### 例子 style-loader

把 `css-loader` 生成的内容，用 `style` 标签挂载到⻚面的 `head` 中

```bash
npm install --save-dev style-loader
```

```js
rules: [
  ...,
	{
		test: /\.css$/,
        use: ["style-loader", "css-loader"]
	}
]
```

同一个任务的 `loader` 可以同时挂载多个，处理顺序为：从右到左，也就是先通过 `css-loader` 处理，然后把处理后的 `css` 字符串交给 `style-loader` 进行处理

```js
rules: [
  ...,
	{
		test: /\.css$/,
    use: [
  		{
  			loader: 'style-loader',
  			options: {}
  		},
      'css-loader'
		]
	}
]
```

## 自定义 loader

目录

```
|——dist
|——loaders
    |——doc-loader
        |——index.js    //loader 名
|——node_modules
|——public
|——src
|——webpack.config.js
|——index.js
```

#### 声明 loader

loaders/doc-loader/index.js

> loader 还可以接收 options 传入的参数，详情查看 loader API，也可以使用官方提供的 loader-util 接收参数

```js
const loaderUtil = require("loader-utils");
const Makedown = require("markdown-it"); //makedown语法转换
const md = new Markdown();

module.exports = function(source) {
  const options = loaderUtil.getOptions(this);
  return `export default \`${md.render(source)}\``;
};
```

异步：loader 是一个函数自然有同步和异步的区分。使用异步的 loader 需要添加 this.async() 申明异步操作

```js
const loaderUtils = require("loader-utils");
const Makedown = require("markdown-it"); //makedown语法转换
const md = new Markdown();

module.exports = function(source) {
  const options = loaderUtils.getOptions(this);
  const callback = this.async();
  setTimeout(() => {
    let res = `export default \`${md.render(source)}\``;
    callback(null, res);
  }, 1000);
};
```

#### 使用

webpack.config.js

```js
module.exports = {
  mode: "production",
  entry: "./index.js",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "js/index.js",
    clean: true,
  },
  resolveLoader: {
    modules: ["node_modules", resolve(__dirname, "./loaders")],
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        use: "file-loader",
      },
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
      {
        test: /\.md$/,
        use: "doc-loader",
        options:{
            
        }
      },
    ],
  },
  // 注册插件
  plugins: [
    // 当我们的插件注册之后，webpack会自动调用apply 把插件放入对应的生命周期
    // new CleanWebpackPlugin()
    new HTMLWebpackPlugin({
      // 路径相对于入口文件
      template: "./public/index.html",
      filename: "public/app.html",
      title: "webpack-plugin",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
```
