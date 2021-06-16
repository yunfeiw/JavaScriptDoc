## 使用技巧

### 函数组件

1. 函数组价 就是一个正常函数
2. 参数为 props
3. 函数组件中 没有 this
4. 16.7 中没有 生命周期 和 state 所以被称为 纯渲染组件 或 无状态组件
5. 标签形式调用 <Foo />

## state

sate 是不可变量，唯一修改 state 的方法是 setState，通过 setState 映射出一个新的 state；尤其是 state 是引用类型时，不要修改引用类型内的数据，要设置新的引用数据

> 传值 和 传址（引用）

## SCU 优化

shouldComponentUpdate

例子

```js
import React, { Component } from "react";

class App extends Component {
  shouldComponentUpdate(nextProps) {
    console.log(nextProps, this.props);
    // 使用setState设置引用类型值时，如果没有做新的映射，则会导致nextProps 与 this.props值相同；因为是改变了原有的值。
  }
}
```

### 更新问题

父组件更新 子组件 也更新

## key 的问题

在 React ,组件每次更新时，会生成一个 `虚拟DOM`,和原有的`虚拟DOM`进行对比。

如果是批量生成的一组元素，那么 React 就会根据 key 值去做对比

tree diff --> element diff --> children diff

例子
children diff

[a,b,c,d]

[c,b,e,d]

1. 移动 - 替换
2. 不动
3. 创建 - 替换
4. 不动

   **一个列表中的每一项 key 是唯一的**
   **如果列表中发生顺序等操作变化，key 一定要用数据的 id**

## PureComponet

PureComponent 提供了一个具有浅比较`shouldComponentUpdate`方法，其他和 Component 完全一致

```js
import {PureComponent} from 'react'

class App extends PureComponent{
   render(){
      return{
         <div>app</div>
      }
   }
}


```

## ref

- createRef()
- 注意：在 组件挂载完成之后及更新之后使用

```js
import React, { createRef, Component } from "react";

class App extends Component {
  inp = createRef();
  componentDidMount() {
    console.log(this.inp); // 原生节点
  }

  render() {
    return (
      <div>
        <input ref={this.inp} />
      </div>
    );
  }
}
```

## children

- 组件标签对之间的内容会被当做一个特殊属性 props.children 传入组件内容
- 可以自定义结构的组件的常用形式
  - children
  - 传递函数
  - 传递子组件

```js
class App extends Component{
   render(){
      return()
      <Child>
         <p>1</p>
         <p>2</p>
         <p>3</p>
      </Child>
   }
}
class Child extends Component{
   render(){
      return (
         <div>
            child
            {this.props.children} // p1,p2,p3
         </div>
      )
   }
}
```

## dangerouslySetInnerHTML

接收值为对象
对象下有 \_html 属性，值为 插入标签
直接设置标签的 innerHTML

```js
const Div ='<div>1223</div>'
class App extends Component{

   render(){
      return()
      <div dangerouslySetInnerHTML={{
            _html:Div
         }}>
      </div>
   }
}
```
