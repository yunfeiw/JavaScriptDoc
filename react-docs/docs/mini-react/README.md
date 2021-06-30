## mini-react

> 注意：因为 react 17 采用实时编译[jsx-vdom],所以本示例仅适合 react 16 及以下版本

## 前言

react 用于生成 vdom；

react-dom 将生成的 vdom，渲染对应的界面（如：浏览器、app、桌面端）；

知道两者区别，便于我们实现接下来的操作；

## react

在开始前我们要知道什么是`JSX`；

JSX 本质上就是个对象，是通过 react.createElement 方法生成的 vdom;

```jsx
const Foo = <div className="yunfei">Foo</div>;

React.createElement("div", { className: "yunfei" }, "Foo");
```

### babel

babel 在 react 中的角色是，调用 React.createElement 方法，将`JSX`解析完成后的数据，传递给该方法，生成 vdom

### react 中的方法

通过 babel 可以，react.js 中需要提供 createElement 方法；

在创建 class 组件时,还需要提供一个继承类 ·Component·;

```js
import React, { Component } from "react";

class App extends Component {}
```

综上所述 react 提供了 createElement 方法 与 Component 类；

```js
// 标识vdom 类型
const reactElement = Symbol("react.element");
/**
- type 类型
- props 属性
- {...any} children 子节点
*/
function createElement(type, props, ...children) {
  return { $$type: reactElement, type, props, children };
}

// 类组件
class Component {
  constructor(props) {
    this.props = props;
  }
  static isReactComponent = {}; // 区分组件 或者 元素
  setState(newState) {} // setState 方法
}

const React = {
  createElement,
};
export default React;
```

接下来我们来看下 App 转换成 vnode 后，打印出来的结果

```js
// app.js
import React from "./mini-react/react";

const App = <div>hello world</div>;

console.log(App);
```

打印结果
![vdom](/assets/img/mini-react/vdom.png)

### 复杂的 JSX

针对 文本类型 和 数组 的特殊处理，便于之后的 mounted 做好预设

```js
<div>
  hello world
  {[<p key="1">1</p>, <p key="2">2</p>, <p key="3">3</p>, ["a", "b", "c"]]}
</div>
```

react.js

```js
// 标识vdom
const reactElement = Symbol("react.element");
// 标记string、number
const reactText = Symbol("react.text");

function createElement(type, props, ...child) {
  delete props.__self;
  delete props.__source;
  // 这里的 key 在 diff时使用
  let key = props.key;
  delete props.key;

  let children = child.flat(Infinity);
  // 处理 string 与 number（react中是在 react-dom处理的）

  children = children
    .map((e) => {
      if (typeof e == "object") {
        return e;
      } else if (typeof e == "string" || typeof e == "number") {
        // 封装
        return { $$typeof: reactText, type: "textNode", inner: e };
      } else {
        return null;
      }
    })
    .filter((e) => e);
  return { $$type: reactElement, key, type, props, children };
}
```

打印下

![vdoms](/assets/img/mini-react/vdoms.png)

接下来我们看看 react-dom 做了什么

## React-dom

```js
import ReactDOM from "react-dom";
import App from "./app";

ReactDOM.render(App, document.querySelector("#root"));
```

如上所示 react.dom 提供了 render 方法；接收参数 vnode 和 根节点；

### 主体结构

参数

- tree vdom
- container 挂载节点
- cb 回调函数

```js
function render(tree, container, cb) {}
const ReactDOM = {
  render,
};
export default ReactDOM;
```

### 创建 dom

根据 vnode 生成相应 节点

节点类型

1. 元素
2. 文本
3. 类组件

因为 vnode 是个树形结构，所以采用`递归`方式创建节点

#### 创建元素与文本

```js
function render(tree, container, cb) {
  const node = createNode(tree); // 创建节点
  container.appendChild(node); // 挂载节点
}

const ReactDOM = {
  render,
};
export default ReactDOM;
```

- createNode

此函数用来创建 元素 [标签|文本] || [<p>|text]

通过 判断 \$\$type 来进行生成对应节点

```js
import { reactText, reactElement } from "./react";

function createNode(vnode) {
  let node;
  // 元素
  if (vnode.$$type === reactElement) {
    node = document.createElement(vnode.type);
    // 创建子节点
    createChildren(node, vnode.children);
  } else if (vnode.$$type === reactText) {
    node = document.createTextNode(vnode.inner);
  }
  return node;
}
```

- createChildren

循环子节点 并 调用 render 函数

```js
// 创建子节点 递归回调
function createChildren(parent, children) {
  children.forEach((ele) => {
    render(ele, parent);
  });
}
```

#### 添加属性 props

```js
import React from "./mini-react/react";
import ReactDOM from "./mini-react/react-dom";

const App = (
  <div>
    hello world
    <div
      style={{
        width: "200px",
        height: "200px",
        border: "2px solid #000",
      }}
    ></div>
    <button
      onClick={() => {
        alert(1);
      }}
    >
      点击
    </button>
  </div>
);
console.log(App);
ReactDOM.render(App, document.querySelector("#root"));
```

属性有哪些

- style
- 事件（react 自己的`合成事件`是·基于观察者模式·实现的）

* createProps

创建属性，通过循环遍历 props 来创建

```js
function createProps(node, props) {
  for (let p in props) {
    // 样式
    if (p === "style") {
      for (let st in props["style"]) {
        node["style"][st] = props["style"][st];
      }
    } else if (EVENTS.includes(p)) {
      // 绑定事件
      node[p.toLocaleLowerCase()] = props[p].bind(undefined); //改变指针
    }
  }
}
```

- createNode

更改 createNode 方法，添加 创建 props 函数

```js
// 创建节点 元素 字符串 组件
function createNode(vnode) {
  let node;
  // 元素
  if (vnode.$$type === reactElement) {
    node = document.createElement(vnode.type);

    // 创建属性 add
    createProps(node, vnode.props);
    // 创建子节点
    createChildren(node, vnode.children);
  } else if (vnode.$$type === reactText) {
    node = document.createTextNode(vnode.inner);
  }
  return node;
}
```

### 挂载 class 组件

首先打印下 class 组件的 vnode;

- index.js

```js
import React from "./mini-react/react";
import ReactDOM from "./mini-react/react-dom";

class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "wang",
    };
  }
  render() {
    const { name } = this.state;
    return <div>Foo：{name}</div>;
  }
}

const App = (
  <div>
    hello world
    <Foo />
    <div
      style={{ width: "200px", height: "200px", border: "2px solid #000" }}
    ></div>
    <button
      onClick={() => {
        alert(1);
      }}
    >
      点击
    </button>
  </div>
);
console.log(App);
ReactDOM.render(App, document.querySelector("#root"));
```

打印出的 class Foo vdom 结构 如下
![classvdom](/assets/img/mini-react/classvdom.png)

#### 思路

1. 判断是否为 class 组件
2. 依据 class 的 vdom,生成 真实 dom
3. 执行组件声明周期

- 判断 class 组件

修改 createNode 函数，依据 class 组件继承`Component`类的`isReactComponent`属性进行判断

```js
// 创建节点 元素 字符串 组件
function createNode(vnode) {
  let node;
  // 元素
  if (vnode.$$type === reactElement) {
    if (typeof vnode.type === "string") {
      node = document.createElement(vnode.type);
      // 创建属性
      createProps(node, vnode.props);
      // 创建子节点
      createChildren(node, vnode.children);
    } else {
      if (vnode.type.isReactComponent) {
        node = createCmp(vnode);
      }
    }
  } else if (vnode.$$type === reactText) {
    node = document.createTextNode(vnode.inner);
  }
  return node;
}
```

- 依据 class 的 vdom,生成 真实 dom

新增 createCmp 函数

```js
// 创建组件
function createCmp(vCmp) {
  // 实例化 class
  let Cmp = new vCmp.type(vCmp.props); //传参 props
  // 获取 vdom
  const vnode = Cmp.render();
  // 生成 节点
  let node = createNode(vnode);

  return node;
}
```

- 执行组件声明周期

新增 stateFromProps 与 componentDidMount 方发

```js
// class 组件 props 映射 到 state
function stateFromProps(cmp, props, state) {
  // 判断当前是否存在此方法
  return cmp.type.getDerivedStateFromProps
    ? cmp.type.getDerivedStateFromProps(props, state)
    : {};
}

// class 组件 ComponentDidMount
function didMount(cmp) {
  if (cmp.componentDidMount) {
    cmp.componentDidMount();
  }
}
```

修改 createCmp 函数

```js
// 创建组件
function createCmp(vCmp) {
  // 实例化 class

  let Cmp = new vCmp.type(vCmp.props); //传参 props
  // 生命周期
  let nextState = stateFromProps(vCmp, vCmp.props, Cmp.state);
  // 合并状态
  if (nextState) {
    Object.assign(Cmp.state, nextState);
  }
  // 获取 vdom
  const vnode = Cmp.render();
  // 生成 节点
  let node = createNode(vnode);

  // 组件 mounted (react解决方案 微任务 事件队列)使用 setTimeout 替换
  setTimeout(() => {
    didMount(Cmp);
  });

  return node;
}
```

结果
![classres](/assets/img/mini-react/classres.png)

### 实现批处理 setState

> setState 的同步/异步在于其使用方式

- 在 React 时间，及相关的 React 方法中，是异步
- 在 setTimeout 等异步方法，或者 DOM 原生事件中是同步

> 批处理原理

1. 批处理在，组件提供的`方法`、`合成事件`中发生

2. 发生时，组件内部会记录一个状态值`批处理`（batchUpdate）,默认值为`true`

3. 执行方法（生命周期、事件）

4. 在调用`setState`方法时，判断当前`批处理`是否开启；

- 开启状态，则将状态值，添加至`状态队列`中
- 关闭状态，直接更新组件

5. 方法执行完成后，`批处理`状态值设置为 `false`

6. 合并`状态队列`中的状态

7. 更新组件

#### 改造 createCmp

```js
// 创建组件
function createCmp(vCmp) {
  // 实例化 class

  let Cmp = new vCmp.type(vCmp.props); //传参 props
  // 生命周期
  let nextState = stateFromProps(vCmp, vCmp.props, Cmp.state);
  // 合并状态
  if (nextState) {
    Object.assign(Cmp.state, nextState);
  }
  // 获取 vdom
  const vnode = Cmp.render();
  // 生成 节点
  let node = createNode(vnode);

  /** 声明 更新组件函数 */
  Cmp.updater = (nextProps, nextState) => {
    // shouldComponentUpdate
    let prevProps = Cmp.props;
    let prevState = Cmp.state;
    Cmp.props = nextProps;
    Cmp.state = nextState;

    // 生成 新的 vdom
    let newNode = Cmp.render();
    console.log(newNode);
    // diff 操作
    diff(vnode, newNode);
  };

  // 组件 mounted (react解决方案 微任务 事件队列)使用 setTimeout 替换
  setTimeout(() => {
    // didMount(Cmp)
    batchUpdate(Cmp, didMount, [Cmp]);
  });

  return node;
}
```

#### 创建 batchUpdate

批处理函数

```js
// 批处理
function batchUpdate(Cmp, fn, args, $this) {
  Cmp.isBatchUpdate = true; // 批处理开启
  Cmp.nextStates = []; // 任务队列
  fn.apply($this, args); // 执行
  Cmp.isBatchUpdate = false; // 批处理关闭
  // 合并状态值
  let nextState = Object.assign({}, Cmp.state);

  Cmp.nextStates.forEach((state) => {
    Object.assign(nextState, state); //合并任务队列中的状态
  });

  // 更新组件
  Cmp.updater(Cmp.props, nextState); // 此方法在 创建组件node时 声明
}
```

#### 改造 component

设置 setState 方法，实现批处理

```js
class Component {
  constructor(props) {
    this.props = props;
  }
  static isReactComponent = {}; // 区分组件或者元素
  setState(newState) {
    // 进入更新流程
    if (this.isBatchUpdate) {
      //如果当前的批处理状态是打开的，不直接更新组件
      this.nextStates.push(newState);
    } else {
      // 当前批处理流程未打开，直接更新组件
      this.updater(this.props, Object.assign({}, this.state, newState));
    }
  }
}
```

## diff

对比 oldTree 与 newTree;所需对比的类型如下：

- tree diff
- element diff
- list diff

tree diff 遵循策略：

<font color='#662'>同层对比</font>

![tc](/assets/img/mini-react/tc.jpg)

<font color='#662'>递归向下</font>

![kc](/assets/img/mini-react/kc.png)

element diff 对比策略如下：

1. 对比 type 是否一致
2. 对比 文本节点内容 是否一致
3. 组件 则更新子组件
4. 如果是元素 对比 props 并更新 子元素

list diff

### 实现 diff

```js
function diff(oldTree, newTree) {
  diffNode(oldTree, newTree);
}
```

diff 节点

```js
function diffNode(oldNode, newNode) {
  if (oldNode.type !== newNode.type) {
    // 判断类型 - 不同替换
  } else if (oldNode.$$type === reactText) {
    // 判断文本 - 不同替换
    if (oldNode.inner !== newNode.inner) {
      // 更新文本内容
    }
  } else if (oldNode.$$type === reactElement) {
    // 组件 ？
    if (oldNode.type.isReactComponent) {
      // 更新子组件
      updateCmp(oldNode, newNode);
    } else {
      // 对比 props
      diffProps(oldNode.props, newNode.props);
      // 递归子级
      diffChildren(oldNode.children, newNode.children);
    }
  } else {
    console.error("diff异常！");
  }
}
```

diff 属性

```js
function diffProps(oldProps = {}, newProps = {}) {
  for (let k in nextProps) {
    if (typeof nextProps[k] === "object") {
      diffProps(oldProps[k], nextProps[k]);
    } else if (k in oldProps) {
      if (oldProps[k] !== nextProps[k]) {
        console.log(k, "属性值有变化");
      }
    } else {
      console.log(k, "新增属性");
    }
  }

  for (let k in oldProps) {
    if (!(k in newProps)) {
      console.log(k, "删除属性");
    }
  }
}
```

diff 子组件

```js
function diffChildren(oldChildren, newChildren) {}
```

更新组件

更新组件需要拿到当前·组件实例·所以修改 createCmp 方法

```js
function createCmp(vCmp){
    let Cmp = new vCmp.type(vCmp.props);
    ...
    vCmp.Cmp = Cmp; //记录
    ...
}
```

```js
function updateCmp(oldNode, newNode) {
  // 更新组件
  oldCmp.props = oldCmp.props;
  return oldCmp.Cmp.updater(newCmp.props,oldCmp.Cmp.state);

}
```

### diffChildren

该方法较为复杂，因为 children 可能发生 新增、删除、移动等情况

并且 diffChildren(oldChildren, newChildren) 的两个参数值是数组结构

为了便于 diff 将其 转换为 对象结构

提供方法 getKeys

这里的 属性 key 是在 react.createElement 中 Porps 提供的；

```js
function getKeys(child) {
  let key = {};
  child.forEach((item, index) => {
    let { key } = item;
    key = key !== undefined ? key : "RC" + index;
    key = key;
    keys[key] = item;
    keys[key].index = index; // 记录 index 便于 对 元素顺序的比对
  });
}
```

> 值得注意的是，在对象 key 为数字时 { 2:2, 1:1, 4:4 },遍历该对像时，打印的结果是 1:1 , 2:2, 4:4;
> 所以针对 key 数字的对象，打印结果会按照 key 进行排序;
> 想解决这个问题 要注意 保证不是 数字（ 如： 'w'+1）;

如果 key 是纯数字，则会导致 diff 是 节点 对比顺序发生问题

修改 diffChildren 方法

```js
function diffChildren(oldChildren, newChildren) {
  let oldChild = getKeys(oldChildren);
  let newChild = getKeys(newChildren);

  for (let k in newChild) {
    if (oldChild[k]) {
      // 新 旧 节点都存在 进行深层次比对
      diffNode(oldChild[k], newChild[k]);
    } else {
      // 新增 节点
    }
  }

  for (let k in oldChild) {
    if (!newChild[k]) {
      // 老节点被删除
    }
  }
}
```

#### 检测 children 顺序改变？

正常情况下， 后一位的索引值，应该不小于前一位的；

如果，元素的位置没有发生改变，那我们拿原生更新的前索引值，去做对比，也应该符合后一位的索引值不小于前一位的索引值

```
perv: a(0), b(1), c(2), d(3)
next: b, a, e, d, f, c

声明一个变量，记录上一位的索引值.
lastIndex = 0;

1. 找到 b ,b 更新前的索引值为 1，符合规则，b 位置没有变化，更新 lastIndex = 1
2. 找到 a ,a 更新前的索引值为 0，不符合规则，a 的位置变化，
3. 找到 e ,这是新增节点，跳过 e
4. 找到 d ,d 更新前的索引值为 3，符合规则，d 位置没有变化，更新 lastIndex = 3
5. 找到 f ,这是新增节点，跳过 f
6. 找到 c ,c 更新前的索引值为 2，不符合规则，说明位置有变化

```

依照 此流程 可以将变化的元素搜集出来；如 移动（a,c）、新增（e、f）

修改 diffChildren 的 `if(oldChild[k])`的判断

```js
function diffChildren(oldChildren, newChildren) {
  let oldChild = getKeys(oldChildren);
  let newChild = getKeys(newChildren);

  let lastIndex = 0; // 标识 上一位 索引位置

  for (let k in newChild) {
    if (oldChild[k]) {
      // 新 旧 节点都存在 进行深层次比对
      diffNode(oldChild[k], newChild[k]);

      if (lastIndex > oldChild[k].index) {
        // 位置发生变化
      } else {
        // 位置没有变化
        lastIndex = oldChild[k].index;
      }
    } else {
      // 新增 节点
    }
  }

  for (let k in oldChild) {
    if (!newChild[k]) {
      // 老节点被删除
    }
  }
}
```
