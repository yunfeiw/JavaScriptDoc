## 使用技巧

### SCU 优化


## key 的问题

在 React ,组件每次更新时，会生成一个 `虚拟DOM`,和原有的`虚拟DOM`进行对比。

如果是批量生成的一组元素，那么React就会根据key值去做对比

**一个列表中的每一项 key 是唯一的**
**如果列表中发生顺序等操作变化，key 一定要用数据的id**

## PureComponet

PureComponent 提供了一个具有浅比较`shouldComponentUpdate`方法，其他和 Component 完全一致

## ref

- createRef()
- 注意：在 组件挂载完成之后及更新之后使用

## children

- 组件标签对之间的内容会被当做一个特殊属性 props.children 传入组件内容
- 可以自定义结构的组件的常用形式
   - children
   - 传递函数
   - 传递子组件

## dangerouslySetInnerHTML

直接设置标签的 innerHTML
