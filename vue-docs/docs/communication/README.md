## 组件通信

组件树
![组件树](/assets/img/vue-components.png)

## 父子组件通信

![父子组件通信](/assets/img/父子组件通信.png)

### props emit

父组件

```html
<!-- parent.vue -->
<div>
  <child :name="name" @add="add"></child>
</div>
```

```js
// parant.js
export default {
  components: { Child },
  data() {
    return {
      name: "yunfei",
      val: 0,
    };
  },
  methods: {
    add(v) {
      this.val = v;
    },
  },
};
```

子组件

```html
<!-- child -->
<div>
    {{name}}
    <button @click='add'>add</div>
</div>
```

```js
export default {
  props: ["name"],
  methods: {
    add() {
      this.$emit("add", 2); // 调用父组件方法
    },
  },
};
```

### ref parent children

- `$ref` 获取当前组件实例  
   需要注册

- `$paranet` 获取当前组件父组件实例
- `$children` 获取子组件集合

  组件间结构保证不变

  父组件

```html
<!-- parent.vue -->
<div>
  {{age}}
  <button @click="handlerName">子组件名</button>
  <button @click="getChildren">子组件集合</button>
  <child ref="child"></child>
</div>
```

```js
// parant.js
export default {
  components: { Child },
  data() {
    return {
      age: 1,
    };
  },
  methods: {
    handlerName(v) {
      this.$refs.child.getName("yunfei"); //传参
    },
    getChildren() {
      console.log(this.$children); // Array[item,....]
    },
    setAge(v) {
      this.age = v;
    },
  },
};
```

子组件

```html
<!-- child -->
<div>
  child
</div>
```

```js
export default {
  methods: {
    getName(v) {
      console.log("child", v); // child,yunfei
    },
    getParent() {
      this.$parent.setAge = 18; // 调用父组件 方法
    },
  },
};
```

## 多层级父子组件通信

![多层级父子组件通信](/assets/img/多层级父子组件通信1.png)

### provide inject

组件库开发使用

参数

- provide: Object || Function

- inject: Array || object

父组件

```js
// parent.vue
<div>
  <child-a ref="child"></child-a>
</div>;

// parant.js
export default {
  components: { ChildA },
  data() {
    return {};
  },
  provide: {
    name: "yunfei",
  },
  //   provide(){             //Fucntion写法
  //       return {
  //           p:this        //通过 p 来调用自身方法
  //       }
  //   },
  methods: {},
};
```

子组件 A

```js
//childA
<div>
  childA
  <childB />
</div>;

export default {
  components: { childB },
  methods: {},
};
```

子组件 B

```js
//childB
<div>
  {{ name }}
  childB
</div>;

export default {
  methods: {},
  inject: ["name", "that"], //注入 父组件provide
};
```

数据传输流程 parent => child-a => child-b

无法逆向传输或调用 采用`收集`方式解决

父组件

```js
export default {
  components: {
    ChildA,
  },
  data() {
    return {
      echildren: [],
    };
  },

  provide() {
    return {
      p: this,
      title: "from provide title",
    };
  },

  methods: {
    addChild(child) {
      // 先收集所有的子组件
      // 组件库里面会经常用到
      this.echildren.push(child);
    },
    geteChildren() {
      console.log(this.echildren);
    },
  },
};
```

子组件 B

```js
export default {
  inject: ["title", "p"],
  mounted() {
    this.p.addChild(this); //收集 子组件B
  },
};
```

### attr

![多层级父子组件通信](/assets/img/多层级父子组件通信2.png)

条件： 子组件中未定义 `props`;则可以在 `this.$attrs` 中获取到

缺点：真实 dom 上 会有对应的 attributer 上;解决方案：`inheritAttr:false`

```html
<div name="yunfei"></div>
```

父组件

```html
<div>
  <child-a :name="name"></child-a>
</div>
```

```js
export default {
  components: { ChildA },
  data() {
    return { name: "yunfei" };
  },
  methods: {},
};
```

子组件 A

```js
<div>
  childA
  <child-b v-bind="$attr" />
</div>;

export default {
  components: { childB },
  methods: {},
  mounted() {
    console.log(this.$attrs); //{name:'yunfei}
  },
};
```

子组件 B

```js
<div>childB</div>;

export default {
  methods: {},
  mounted() {
    console.log(this.$attrs); //{name:'yunfei}
  },
};
```

应用：button 按钮的 可选状态 disable

### listener

获取组件的监听事件

父组件

```html
<div>
  <child-a @a="a" @b="b" />
</div>
```

```js
export default{
    components:{ChildA}
    methods:{
       a(){},
       b(){},
    }
}
```

子组件

```html
<div>child-a</div>
```

```js
export default {
  mounted() {
    console.log(this / $listeners); //{a,b}
  },
};
```

## 非关系组件通信

![非关系组件通信](/assets/img/vue-components.png)

### event bus

```js
// bus.js
import Vue from "vue";

// new Vue
export const bus = new Vue();

// bus
// vue3 -> $on $emit off once
```

组件 A

```js
import { bus } from "../bus.js";

export default {
  create() {
    // 注册
    bus.$on("haha", this.a);
    // 注销
    bus.$off("haha", this.a);
  },
  methods: {
    a() {},
  },
  mounted() {},
};
```

组件 B

```js
import { bus } from "../bus.js";

export default {
  mounted() {
    bus.$emit("haha"); //触发
  },
};
```

## vuex

[vuex](https://vuex.vuejs.org/zh/)

```js
npm install vuex
```

项目结构

```js
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```

### state

### getters

### mutations

### actions

### modules

```js
import Vuex from "vuex";
import Vue from "vue";
console.log(Vuex);

// 安装插件
Vue.use(Vuex);

// new store
const store = new Vuex.Store({
  state: {
    age: 18,
    username: "yunfei",
  },
  mutations: {
    // 都是同步的！！！
    changeAge(state, payload) {
      console.log(state);
      console.log(payload);
      state.age = payload.age;
    },
  },

  actions: {
    // 异步 都给我放到这里
    changeAge({ commit }, payload) {
      const { age } = payload;
      setTimeout(() => {
        //异步逻辑之后呢
        commit("changeAge", {
          age,
        });
      }, 2000);
    },
  },

  getters: {
    // 全局的计算属性
    tenYearsOld(state) {
      return state.age + 10;
    },
  },
});

export default store;
```
