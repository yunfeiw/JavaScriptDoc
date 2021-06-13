## 基础使用

## 创建 hello world

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="app">{{msg}}</div>

    <script>
      new Vue({
        el: "#app",
        data: {
          msg: "Hello,World",
        },
      });
    </script>
  </body>
</html>
```

- 模板
- 数据

## Vue 实例

- vm
- 数据与方法
  - \$data
    - public
  - \_xxx
    - private

## 插值

- 文本
- attribute
- 使用 js 表达式

```vue
<div id="app">
    {{msg + 'yunfei'}}
  </div>

<script>
const app = new Vue({
  el: "#app",
  data: {
    msg: "hello",
  },
});
</script>
```

## v-bind

绑定数据（表达式）到指定的属性上，`<div v-bind:参数="值/表达式"></div>`，这里的参数就是指定的属性名称。有的一些常用指令会有对应的缩写，`v-bind` 对应的缩写为：`:`

```js
<div :id="myId"></div>
```

## 事件处理

- v-on
  - 缩写：@

```vue
<div @click="handler"></div>
```

## 指令修饰符

一个指令可以包含的内容包括：

- 指令名称
- 指令值
- 指令参数
- 指令修饰符

```html
<组件 指令:参数.修饰符1.修饰符2="值" />
```

```js
Vue.directive("focus", {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el) {
    // 聚焦元素
    el.focus();
  },
});
```

## .lazy

取代 `input` 监听 `change` 事件

## .number

输入字符串转为有效的数字

## .trim

输入首尾空格过滤

## 计算属性

- 可读性

- 可缓存

```js
  computed:{
    name(){
      return this.name + 's';
    }
  }
```

## watch

当需要在数据变化时执行异步或开销较大的操作时使用

- deep
- immediate

```js
  watch:{
    msg:{
      handler(newVal,oldVal){
        // do something
      },
      immediate:true
    },
    info:{
      handler(newVal,oldVal){
        //do something
      },
      deep:true
    }
    // user:{age:18}
    "user.age"(val) {
      console.log("age", val);
      // do something
    },
  }
```

## 条件渲染

- v-if

  - v-else-if
  - v-else

- v-show

  - 控制 display

- v-if vs v-show

  - `v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

  - v-if`也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。`

  - `v-show`就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

  - 一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

## 列表渲染

v-for

- 遍历数组

- 遍历对象

  - 2 个参数
    - (Val,key)
  - 3 个参数
    - (val,key,index)

```js
  <li v-for="(user,key,index) in userInfo">
      {{user.name}} --{{user.age}} -- {{key}} --{{index}}
  </li>
```

- 带有 `v-for` 的 `<template>`

  - 循环渲染一段包含多个元素的内容

- v-for 和 v-if 一同使用

- 设置 key 属性

  - 复用
  - diff 算法优化

  默认情况下，在渲染 `DOM` 过程中使用 <u>原地复用</u> ，这样一般情况下会比较高效，但是对于循环列表，特别是依赖某种状态的列表，会有一些问题，我们可以通过 `:key` 属性，来给每个循环节点添加一个标识

## class

同样类名有数组及对象的写法：

​ 数组写法：

```js
<div :class="['box1', 'box2']"></div>
```

​ 对象写法：

```js
<div :class="{'box1': isActive, 'box2': isChecked}"></div>
```

## style

v-bind 针对样式有不同的写法 ，可以写成对象形式:

```js
<div :style=" {width: '100px', height: '100px', background: 'green' }"></div>
```

也可以写成数组形式 :

```js
<div :style="[style1, style2]"></div>
```

## 表单输入绑定

v-model 双向数据绑定（语法糖）

  ```js
  <input type="text" v-model="title" />
  ```

  ```html
  <input type='text' @input='handler' :value='content />
  ```

```
  app = new Vue({
    el:'#app',
    data:{
      content:'test'
    }，
    methods:{
      handler(e){
        this.content = e.target.value;
      }
    }
  })

```