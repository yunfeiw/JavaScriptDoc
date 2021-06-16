## 基础

## 命令式编程 与 声明式编程

- 告诉计算机怎么做（How) - 过程
- 告诉计算机要什么（what) - 结果

## 如何使用 React

### 浏览器模式

- react.js 提供 React.js 核心功能代码;如：虚拟 dom 组件

  - React.createElement(type,props,children);

```js
const h1 = React.createElement("h1", { id: 1 }, "hello world");
const p = React.createElement("p", { class: "yunfei" }, "你好");
```

- ReactDOM 提供了与浏览器交互的 DOM 功能。如：dom 渲染
  - React.render(Vnode,container[,callback])
    - element:要渲染的内容
    - container:要渲染的内容存放容器
    - callback:渲染后的回调函数

```js
<script type="text/babel">
  const main = (<main>1</main>); ReactDOM.render( main,
  document.querySelector('#root') )
</script>
```

### babel

[babel.js](https://cdn.bootcss.com/babel-standalone/6.26.0/babel.min.js)在浏览器中处理 JSX;

### JSX

JSX 是一个基于 JavaScript + XML 的一个扩展语法

### JSX 本质

- 17 之前是 转换 成 createElement 函数

  createElement(type:string,props:{},children:[])

- 17 之后是 直接编译 成 VDOM（虚拟 DOM）

- 作为值使用
- 不是字符串
- 不是 HTML
- 可以配合`js`表达式使用

```js
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "yunfei",
      arr: [1, 2, 3, 4],
      user: {
        age: 18,
      },
    };
  }

  render() {
    const { name, arr, user } = this.state;
    return (
      <div>
        {name}
        {user} //err 不能接受对象类型
        {`wang ${name}`}
        {arr.map((e) => e)}
      </div>
    );
  }
}
```

### 插值表达式

在 JSX 中可使用（表达式）嵌入表达式
表达式：产生值的一组代码的集合

- 变量
- 算数运算
- 函数调用

> 注意：分清楚 `表达式` 与 `语句`的区别。if、for、while 是语句，JSX 不支持语句

#### 各种类型内容在插值中的使用

- 注释
  {/_注释_/}
  {/_
  多行注释
  _/}

#### 输出数据类型

- 字符串、数字：原样输出；
- 布尔值、空、未定义：会被忽略；

#### 列表渲染

- 数组
- 对象

> 扩展：VDOM（virtualDOM） 和 diff

#### 条件渲染

- 三元运算符
- 与或运算符

```js
<div>
  {bool ? 1 : 2}
  {bool || 1}
  {bool && 2}
</div>
```

#### 在属性上使用表达式

JSX 中的表达式也可以使用在属性上，但是使用的时候需要注意

- 当在属性中使用`{}`时，不能使用引号包含，不要使用`引号`包含。

#### JSX 使用注意事项

- 必须有，且只有一个顶层的包含元素， - React.Fragment
- JSX 不适合 html,很多属性在编写时不一样
  - className
  - style
- 列表渲染时，必须有 key 值
- 在 jsx 所有标签必须闭合
- 组件的首字母一定大写，标签一定小写

**XSS**

为了有效的防止 XSS 注入攻击，React DOM 会在渲染的时候吧内容（字符串）进行转义，所以字符串形式的标签是不会作为 HTML 标签进行处理的。

## create-react-app - 脚手架

基于自动化的集成环境模式

### 介绍

Create React App 是一个使用 Node.js 编写的命令行工具，通过它可以帮助我们快速生成 React.js 项目，并内置了 Babel、Webpack 等工具帮助我们实现 ES6+ 解析、模块化解析打包，也就是通过它，我们可以使用 模块化 以及 ES6+ 等更新的一些特性。同时它还内置 ESLint 语法检测工具、Jest 单元测试工具。还有一个基于 Node.js 的 WebServer 帮助我们更好的在本地预览应用，其实还有更多。

这些都通过 Create React App（CRA） 帮助我们安装并配置好了，**开箱即用**

### 安装与使用

通过 npm、yarn、npx 都可以

#### 安装

##### npm

```bash
npm i -g create-react-app
```

###### yarn

```bash
yarn global add create-react-app
```

#### 使用

安装完成以后，即可使用 create-react-app 命令

```bash
create-react-app <项目名称>
# 或
npx create-react-app <项目名称>
```

### 项目目录结构说明

运行命令以后，就会在运行命令所在目录下面创建一个以项目名称为名的目录

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js  项目的入口文件
    logo.svg
```

### 命令脚本

create-react-app 同时也提供了其它一些命令来帮助我们进行开发

###### npm start

启动一个内置的本地 WebServer，根目录映射到 './public' 目录，默认端口：3000

###### npm run test

运行 Jest 测试

###### npm run jest

暴漏项目配置，操作不可逆

###### npm run build

打包应用（准备上线）

## 组件

对具有一定独立功能的数据与方法的封装，对外暴露接口，有利于代码功能的复用，且不用担心冲突问题。

### 类式组件

- 组件类必须继承 `React.Component`
- 组件类必须有 `render`方法

### 函数式组件

- 函数的名称是组件的名称
- 函数的返回值就是组件渲染的内容

### props 和 state

- props 父组件传递过来的参数
- state 组件自身状态
  - setState
  - 多个 setState 合并

### props 和 state 的区别

state 的主要作用是用于组件保存、控制、修改`自身`的可变状态，在组件内部进行初始化，也可以在组件内部进行修改，但是组件外部不能修改组件的 state

props 的主要作用是让使用该组件的父组件可以传入参数来配置该组件，他是外部传进来的配置参数，组件内部无法控制也无法修改

state 和 props 都可以决定组件的外观和显示状态。通常，props 作为不可变数据或者初始化数据传递给组件，可变状态使用 state

### React 中的事件

- 大小写问题
- this 问题

```js
constructor(){
  this.handles = this.handle.bind(this);
}
handle(){}
render(){
  const {handles} = this;
  return(
    <div onClick ={()=>this.handle()}></div>
    <div onClick ={this.handle.bind(this)}></div>
    <div onClick ={handles}></div>
  )
}
```

### VSCODE 插件

1. Vscode-styled-JSX JSX 语法高亮&autoImport
