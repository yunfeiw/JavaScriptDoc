## webpack 基础

## 安装

`webpack` 是一个使用 `Node.js` 实现的一个模块化代码打包工具。所以，我们需要先安装 webpack，安装之前需要搭建好 `Node.js` 环境

```shell
 npm install -D webpack webpack-cli
```

> 注：不推荐全局安装

`webpack-cli` : 提供 webpack 命令、工具，类似 `create-react-app`

`webpack` : webpack 代码，类似 `react`

## 使用

```bash
./node_modules/.bin/webpack

// 查看版本
./node_modules/.bin/webpack -v
```

也可以编辑 `package.json` 的 `scripts` 来简化输入

```json
// package.json
{
	...,
	"scripts": {
		"start": "webpack"	// scripts 中可以定位到 ./node_modules/.bin/ 目录下
	}
}
```

> `scripts` 中使用 `test`、`start`、`restart`、`stop` 命名的时候，可以在调用的时候省略 `run`，即直接 `npm start`

当然，还可以使用更加方便的方式：

```bash
npx webpack
```

通过 `npx` 也可以帮助我们定位命令到 `./node_modules/.bin/` 目录下

> 注：npm5.2+ 增加，如果没有，可以使用 npm i -g npx 来安装


## 打包命令

```bash
webpack ./js/index.js
```

上面命令会使用 `webpack` 默认的一些配置对模块文件进行打包，并把打包后的文件输出到默认创建的 `./dist` 目录下，打包后的文件名称默认为 `main.js`。

模块文件打包以后，就可以在不支持 es6 模块语法的浏览器环境下引入使用了。

**打包文件分析**

- 把分散的模块文件打包到一个文件中，不需要外部引入了
- 内置了一个小型模块加载器(类似 `requireJS`)，实现了打包后的代码隔离与引用
