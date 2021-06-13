## 组件基础

![组件](/assets/img/components.png)

## 组件注册

- 局部注册
- 全局注册

```js
const Foo = {
  template: `
        <div>
            foo
        </div>
    `,
  // data不能是对象
  data() {
    return {};
  },
  methods: {},
};

const Bar = {
  template: `<div>Bar</div>`,
};

//全局注册

Vue.Component("Bar", Bar);

// 局部注册
export default {
  components: {
    Foo,
  },
  data() {
    return {};
  },
};
```

组件的`data`不能是对象的原因是，因为对象是`引用类型`，如果使用，则引用该组件的 data 都会受到影响。

## 生命周期 life

![生命周期](/assets/img/lifecycle.png)

### 组件创建

- beforeCreate

实例刚在内存中创建出来，还没有初始化 data 和 methods，只包含一些自带额生命周期函数

- created

实例已经在内存中创建完成，此时 data 和 methods 已经创建完成

### 组件挂载

- beforeMount

此时已经完成了模版的编译，只是还没有渲染到界面中去

- mounted

模版已经渲染到了浏览器，创建阶段结束

### 组件更新

- beforeUpdate

界面中的数据还是旧的，但是 data 数据已经更新，页面中 data 还没有同步

- updated

页面重新渲染完毕，页面中的数据和 data 保持一致

### 组件销毁

- beforeDestroy

执行该方法的时候，Vue 的生命周期已经进入销毁阶段，但是实例上的各种数据还出于可用状态

- destroyed

组件已经全部销毁，Vue 实例已经被销毁，Vue 中的任何数据都不可用

### 特殊周期（keep-alive）

- activated

被 keep-alive 缓存的组件激活时调用。

- deactivated

被 keep-alive 缓存的组件停用时调用。

### 组件嵌套 - 生命周期

```js
const Bar = {
  template: "<div>Bar</div>",
  beforeCreate() {
    console.log("bar-before-create");
  },
  created() {
    console.log("bar-created");
  },
  beforeMount() {
    console.log("bar-before-mounted");
  },
  mounted() {
    console.log("bar-mounted");
  },
};

const Foo = {
  components: { Bar },
  template: `<div>
      Foo
      <Bar />
    </div>`,
  beforeCreate() {
    console.log("Foo-before-create");
  },
  created() {
    console.log("Foo-created");
  },
  beforeMount() {
    console.log("Foo-before-Mount");
  },
  mounted() {
    console.log("Foo-mounted");
  },
};
// 打印结果遵循`洋葱模型`;

Foo - before - create;
Foo - created;
Foo - before - Mount;

bar - before - create;
bar - create;
bar - before - mounted;
bar - mounted;

Foo - Mount;
```

## props

props : [Array || Object]

### Array

```js
const Foo = {
  props: ["name"],
  template: "<div>{{name}}</div>",
};
```

### function

```js
const Foo = {
  props: {
    default:'yunfei',   // 默认值
    validator(v){       // 校验
      // do something
      return v
    },
    type:String         // 值 类型
  },
  template:'<div>{{name}}</div>',
  data(){
    return{}
  },
  mounted(){
    this.$props.name = 'wang; //err props是不可改的，遵循 单向数据流
  }
};
```

### 传入一个对象的所有 property

```js
  const obj = {
    name:'yunfei',
    age:18
  }

  <Foo v-bind='obj'/>
  //等同于
  <Foo v-bind:name='obj.yunfei' v-bind:age='obj.18' />

```

### 合并

对于绝大多数 attribute 来说，从外部提供给组件的值会替换掉组件内部设置好的值。所以如果传入 type="text" 就会替换掉 type="date" 并把它破坏！庆幸的是，class 和 style attribute 会稍微智能一些，即两边的值会被合并起来，从而得到最终的值：

### 禁用 Attribute

```js
Vue.component("my-component", {
  inheritAttrs: false,
  // ...
});
```

## $emit

```vue
//template
<html>
  <body>
    <div id="app">
      <Foo @add="handleAdd" @cut="handleCut" />
    </div>
  </body>
</html>

const Foo ={ template:`
    <div>
      <button @click='add'>新增</button>
      <button @click='cut'>减少</button>
    </div>
    `, 
  methods:{ 
    add(){ this.$emit('add','+1') }, 
    cut(){ this.$emit('cut','-1') } 
  }
} 

const app = new Vue({ 
  el:'#app', 
  components:{Foo}, 
  data:{}, 
  methods:{
    handleAdd(v){ console.log(v) }, 
    handlerCut(v){ console.log(v) } 
  } 
})
```

## .snyc

在有些情况下，我们可能需要对一个 prop 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且在父组件和子组件两侧都没有明显的变更来源。

这也是为什么我们推荐以 update:myPropName 的模式触发事件取而代之。举个例子，在一个包含 title prop 的假设的组件中，我们可以用以下方法表达对其赋新值的意图：

```vue
<Foo :title.sync="name" />
// 等价于
<Foo :title="name" @update:title="name = $event"></Foo>

// Foo.vue this.$emit('upload:title','yunfei');
```

> 注意带有 .sync 修饰符的 v-bind 不能和表达式一起使用 (例如 v-bind:title.sync=”doc.title + ‘!’” 是无效的)。取而代之的是，你只能提供你想要绑定的 property 名，类似 v-model

> 将 v-bind.sync 用在一个字面量的对象上，例如 v-bind.sync=”{ title: doc.title }”，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。

## v-model

input + value 的语法糖

默认使用 input,value

```js
<Foo v-model="show" />;

// Foo.vue

const Foo = {
  props: ["value"], //默认
  template: `
      <div v-show="value">
        Foo
        <button @click="handleClose">X</button>
      </div>
    `,
  methods: {
    handleClose() {
      this.$emit("input", false); //默认
    },
  },
};
```

使用 model 改写

```js
<Foo v-model="show" />;

// Foo.vue

const Foo = {
  props: ["visible"], // 使用
  model: {
    props: "visible", // 改写
    event: "close", // 改写
  },
  template: `
      <div v-show="value">
        Foo
        <button @click="handleClose">X</button>
      </div>
    `,
  methods: {
    handleClose() {
      this.$emit("close", false); // 使用
    },
  },
};
```

## slot 插槽

- Props：

  name - string，用于命名插槽。

- Usage：

  slot 元素作为组件模板之中的内容分发插槽。
  slot 元素自身将被替换。

```js
<div>
  <Foo>yunfei</Foo>
</div>

const Foo = {
  template:`
    <div>
      Foo
      <slot></slot>
    </div>
  `
};
```

### 具名插槽

```vue
<div>
  <Foo>
      <template v-slot='head'>
        yunfei
      </template>

      <template v-slot='footer'>
        yunfei
      </template>

      // 缩写 #
      <template #two>
        yunfei
      </template>
  </Foo>
</div>
; const Foo = { template: `
<div>
      Foo
      <slot name='head'></slot>
      <slot name='footer'></slot>
      <slot name='two'></slot>
    </div>
`, 
};
```

### 作用域插槽

```js
// current-user
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>


<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>

```

## minxin

mixins 选项接收一个混入对象的数组。这些混入对象可以像正常的实例对象一样包含实例选项，这些选项将会被合并到最终的选项中，使用的是和 Vue.extend() 一样的选项合并逻辑。也就是说，如果你的混入包含一个 created 钩子，而创建组件本身也有一个，那么两个函数都会被调用。

Mixin 钩子按照传入顺序依次调用，并在调用组件自身的钩子之前被调用。

- 示例

```js
const mixin = {
  data(){
    return{
      x:1,y:2
    }
  },
  created() {
    console.log(2);
  },
};

const app = new Vue({
  created() {
    console.log(1);
  },
  mixins: [mixin],
});

// console

1  2
```

> mixin 的问题

1. 来源不清晰 x,y
2. 命名冲入问题 a:{x,y} mixin:{x,y}

## directive 自定义指令

```js
Vue.directive("focus", {
  bind(el, binging) {
    el.focus();
  },
  inserted(el) {
    el.focus();
  },
});
```

### 钩子函数

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。

unbind：只调用一次，指令与元素解绑时调用。

接下来我们来看一下钩子函数的参数 (即 el、binding、vnode 和 oldVnode)。

### 指令钩子函数会被传入以下参数：

el：指令所绑定的元素，可以用来直接操作 DOM。

binding：一个对象，包含以下 property：

name：指令名，不包括 v- 前缀。

value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。

oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。

expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。

arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。

modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。