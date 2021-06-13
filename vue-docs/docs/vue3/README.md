## vue3

[vue3](https://github.com/vuejs/vue-next)
[vue3 rfc](https://github.com/vuejs/rfcs)

实例化方式
![实例化](/assets/img/32init.png)

## 新特性

![新特性](/assets/img/vue3新特性.png)

- Ts 支持

  更好的类型提示、校验、维护

- tree-shaking 打包时，剔除多余(未使用)的包

```js
import { a, b, c } from "utils";

a(1);
b(2);
// c 未使用 将不会被打包
```

- fragment 支持多个根节点

```html
<template>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</template>
```

- teleport 传送门

```html
<div style="position:relative;">
  <!-- to 支持 css选择器 -->
  <teleport to="body">
    <div style="position:absolute;">haha</div>
  </teleport>
</div>
```

- custom renderor

自定义渲染

- composition api

![api](/assets/img/vue3api.png)

函数 ==> option api

setup 入口函数

### ref

模板之中，自动解构 x.value (ref)
ref 值类型 number boolean string;所以使用 ref 包装实现`监听`
例子

```html
<div>{{count}}</div>
<button @click="handlerClick">点击</button>
```

### ref

```js
import { ref } from "vue";

export default {
  setup() {
    // 响应式对象
    const count = res(0); // 等价于 data(){return{}}
    // 点击
    const handlerClick = () => {
      console.log(count); //响应式对象
      console.log(conut.value); // 值 0

      conut.value = conut.value++; //更改值
    };
    return { count, handlerClick };
  },
};
```

### reactive

对象类型，`代理`直接封装即可

```html
<div>{{users.name}}</div>
<div>{{users.age}}</div>
<button @click="handlerClick">点击</button>
```

```js
import { reactive } from "vue";

export default {
  setup() {
    const users = reactive({
      name: "yunfei",
      age: 18,
    });
    const handlerClick = () => {
      console.log(count); //响应式对象

      users.age = users.age++; //更改值
    };
    return { users };
  },
};
```

### ref reactive 使用

开心就好

```js
const str = "123";
const age = 18;
```

### readonly

只读值

```js
import { readonly } from "vue";

export default {
    setup(){
        // 不可变
        const obj = readonly({
            name:'yunfei'
            age:18
        });

        return {obj}
    }
};
```

### computed 计算属性

```js
import { ref, computed } from "vue";

export default {
  setup() {
    const count = ref(1);
    const double = computed(() => count.value * 2);

    return{
      count, double;
    }
  },
};
```

### watch 监听属性

参数

watch([ item || Function], Function);

```js
import { watch, ref, reactive } from "vue";
export default {
  setup() {
    const count = ref(0);
    const color = ref("#000");
    const user = reactive({
      name: "yunfei",
      age: 18,
    });

    // 监听 value
    watch(count, (newValue, oldValue) => {
      console.log(newValue);
      console.log(oldValue);
    });

    // 监听 obj
    watch(
      () => user.age,
      (newValue, oldValue) => {
        console.log(newValue);
        console.log(oldValue);
      }
    );
    // 监听多个值 返回参数[]

    watch([count, color], (v) => {
      console.log(v); // [0,#000]
    });
  },
};
```

### watchEffect

```html
<div>{{count}}</div>
<button @click="handlerClick">点击</button>
```

```js
import { ref, watchEffect } from "vue";

export default {
  setup() {
    const count = ref(0);

    // 初始化 即执行
    watchEffect(() => {
      // 响应式依赖收集 get
      // count 变更 则执行当前函数
      console.log(count.value);
    });

    const handlerClick = () => {
      count.value = count.value++;
    };
    return {
      count,
      handlerClick,
    };
  },
};
```

## watchEffect VS watch

watch 指定`响应式`对象
watch 可获得 响应前 响应后 的值

watchEffect 隐形收集

watchEffect 自动销毁 和 手动销毁 ；返回一个函数，调用其，便会销毁

## 生命周期

![vue3生命周期](/assets/img/vue3生命周期.png)

支持多个
先注册 先执行

```js
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnMount,
  onUnMounted,
  onErrorCaptured
} from "vue";

export default {
  setup() {
      onBeforeMount(){   }
      onMounted(){   }
      onBeforeUpdate(){   }
      onUpdated(){   }
      onBeforeUnMount(){   }
      onUnMounted(){   }

  },
};
```

## 依赖注入 provide inject

父组件

```js
import { provide, inject } from "vue";

setup(){
    provide('a','a')
}

```

子组件

```js
import { inject } from "vue";
setup(){
    const a = inject('a','b'); //  参数2 为默认值；

    return {a};
}
```

## refs

绑定节点

```html
<div>
  <input type="text" ref="input" />
</div>
```

```js
import {ref,onMounted} from 'vue';
export default{
    setup(){
        const input = ref(null);
        // 组件已挂在
        onMounted(){
            console.log(input.value);//当前input节点
        }
        return {input};
    }
}
```

## compsition API VS option API

代码组织

```js
import { ref } from "vue";

function a() {
  const name = ref("yunfei");

  return { name };
}

export default {
  setup() {
    const { name } = a();

    return { name };
  },
};
```
代码复用

mixin
来源命、名冲突等问题



### toRefs

将对像转成响应式对象

```js
import {toRefs} from 'vue'

export default{
  setup(){
    const a = toRefs({
      name:'yunfei'
    })

    return {
      a
    }
  }
}

```

* setup中没有this;
* 与option api可以共用
* setup中获取不到 option api中 data函数的数据