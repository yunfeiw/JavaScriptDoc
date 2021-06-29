## mini-react

虚拟 DOM ——> diff ——> mounted

`react 16`版本 createElement

babel 将 jsx 转换成 ceateElement 函数，调用输出 vdom

`react 17` 以下；因为`run-time`是实时编译 jsx - vdom；

目录结构

```js
|—— public
|—— src
      react-dom
      react
      index


```

### createElement

创建 vdom

#### 封装 createElement

- type 类型
- props 属性
- {...any} children 子节点

```js
// 标识vdom 类型
const reactElement = Symbol("react.element");

function createElement(type, props, ...children) {
  return { $$type: reactElement, type, props, children };
}

const React = {
  createElement,
};
export default React;
```

打印 App (jsx——>vdom)

```js
// app.js
import React from "./mini-react/react";

const App = <div>hello world</div>;

console.log(App);
```

打印结果
![vdom](/assets/img/mini-react/vdom.png)

#### 模板类型处理

- 数组情况

```html
<div>
  hello world {[
  <p key="1">1</p>
  ,
  <p key="2">2</p>
  ,
  <p key="3">3</p>
  , ["a", "b", "c"]]}
</div>
```

修改

```js
// 标识vdom
const reactElement = Symbol("react.element");
// 标记string、number
const reactText = Symbol("react.text");

function createElement(type, props, ...child) {
  delete props.__self;
  delete props.__source;

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
  return { $$type: reactElement, type, props, children };
}

const React = {
  createElement,
};
export default React;
```

打印结果

![vdoms](/assets/img/mini-react/vdoms.png)

## React-dom

vdom - transform - rdom

### 主体结构

render 函数

```js
function render(tree, container, cb) {}
const ReactDOM = {
  render,
};
export default ReactDOM;
```

### 创建 dom

#### dom 类型

1. 元素
2. 文本
3. 类组件

#### 创建元素与文本

- tree vdom
- container 挂载节点
- cb 回调函数

```js
import { reactText, reactElement } from "./react";

function render(tree, container, cb) {
  const node = createNode(tree);
  container.appendChild(node);
}

const ReactDOM = {
  render,
};
export default ReactDOM;
```

```js
// 创建节点 元素 字符串 组件
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

```js
// 创建子节点 递归回调
function createChildren(parent, children) {
  children.forEach((ele) => {
    render(ele, parent);
  });
}
```

#### 添加属性 props

- style
- 事件（react 自己的`合成事件`是·基于观察者模式·实现的）

创建属性

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

### class 组件

#### component 组件

react.js 新增 class Component

```js
// class 组件

class Component {
  constructor(props) {
    this.props = props;
  }
  static isReactComponent = {}; //区分组件 或者 元素
  setState(newState) {
    // 更新流程
    if (this.isBatchUpdate) {
      // 批处理 开启 不直接更新组件
      this.nextStates.push(newState);
    } else {
      // 批处理 未开启 直接更新
      this.updater(this.props, Object.assign({}, this.state, newState));
    }
  }
}
```

#### class 组件生成的 vdom 结构

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

#### 创建 class 组件

结构以知创建 class 组件

步骤：

1. 判断是否为 class 组件
2. 依据 class 的 vdom,生成 真实 dom
3. 执行组件声明周期

- 判断 class 组件

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

#### class 批处理 setState

> setState 的同步异步在于 其使用 方式

- 在 React 时间，及相关的 React 方法中，是异步
- 在 setTimeout 等异步方法，或者 DOM 原生事件中是同步

##### 批处理

class 组件的中`react方法`、`react合成事件`调用触发时

class 组件内部会记录一个状态 batchUpdate（批处理）,值设置为 true

调用相关 参数

class 组件内部 batchUpdate（批处理）,值设置为 false

主键的一些列更显

### 组件更新


## diff

tree diff

递归向下 同层对比

element diff

1. 对比 type 是否一致 
2. 对比 文本节点内容 是否一致
3. 组件 则更新子组件
4. 如果是元素 对比props并更新 子元素

list diff
