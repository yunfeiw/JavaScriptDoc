### webpack 配置

### 入口文件

入口文件就是我们项目中加载的第一个文件，比如上面的 `main.js` 文件，其它文件都是通过 `import` 等方式引入的，`webpack` 会从我们指定的入口文件开始分析所有需要依赖的文件，然后把打包成一个完整文件。

### 打包配置

虽然，我们可以直接通过命令的来打包，但是推荐创建一个 `webpack.config.js` 的配置文件来实现更方便和强大的功能。

`webpack` 命令在运行的时候，默认会读取运行命令所在的目录下的 `webpack.config.js` 文件，通常我们会在项目的根目录下运行命令和创建配置文件。

我们也可以通过 `—config` 选项来指定配置文件路径：

```shell
webpack --config ./configs/my_webpack.config.js
```

通常情况下，我们的项目目录大致如下：

```txt
/
-- /dist - 项目打包后存放目录
-- /node_modules - 第三方模块
-- /src
------ css/
------ images/
------ js/
------ index.js
-- webpack.config.js
-- package.json
```

配置文件

```javascript
module.exports = {
  ...	//配置项
}
```

### mode

模式 : `"production" | "development" | "none"`

不同的模式会对 `webpack` 打包的时候进行一些对应的优化配置。

```bash
module.exports = {
  mode: 'production'
}
```

### entry

指定打包⼊口⽂文件，有三种不同的形式：`string | object | array`

一对一：一个入口、一个打包文件

```js
module.exports = {
  entry: "./src/index.js",
};
```

多对一：多个入口、一个打包文件

```js
module.exports = {
  entry: ["./src/index1.js", "./src/index2.js"],
};
```

多对多：多个入口、多打包文件

```js
module.exports = {
  entry: {
    index1: "./src/index1.js",
    index2: "./src/index2.js",
  },
};
```

### output

```js
    module.exports ={
        ...,
        output:{
            path:path.resolve(__dirname,'dist'),
            filename: "bundle.js",
		    filename: "[name].js"
        }
    }
```

- 可以指定一个固定的文件名称，如果是多入口多出口(`entry` 为对象)，则不能使用单文件出口，需要使用下面的方式
- 通过 `webpack` 内置的变量占位符：`[name]`
- https://webpack.docschina.org/configuration/output/#template-strings



## hash chunkhash contenthash

### hash

每次编译都会创建一个新的hash值, 并且所有文件的hash都是一样的，因为是同一个  compilation 生成;

### chunkhash

每个入口文件都是一个chunk，每个chunk是由入口文件与其依赖所构成;

异步加载的文件也被视为是一个chunk;

chunkhash是每次编译模块及其依赖模块构成chunk生成的c, 每个chunk的chunkhash值都不一样， 也就是说每个chunk都是独立开来的，互不影响，chunk的更新不会影响其他chunk

但是, 每个chunk都是有css与js组成, 也就是说当其中一个文件发生变化，这个chunk都会重新编译，此时contenthash就出来了。

### contenthash

针对文件内容生成不同的hash, 只有当文件内容发生变化此hash才会重新生成，此时需要利用mini-css-extract-plugin插件取提取出每个chunk的css文件，将css与js隔离开，然后将css更改后

