## webpack

[官网](https://webpack.docschina.org/)

![webpack](/assets/img/webpack.png)

webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。当 webpack 处理应用程序时，它会在内部构建一个 依赖图(dependency graph)，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 bundle。

## 打包流程

1. 读取 webpack 的配置参数；
2. 启动 webpack，创建 Compiler 对象并开始解析项目；
3. 从入口文件（entry）开始解析，并且找到其导入的依赖模块，递归遍历分析，形成依赖关系树；
4. 对不同文件类型的依赖模块文件使用对应的 `Loader` 进行编译，最终转为 Javascript 文件；
5. 整个过程中 webpack 会通过发布订阅模式，向外抛出一些 `hooks`，`Plugins`通过监听这些关键的事件节点，执行插件任务进而达到干预输出结果的目的。

