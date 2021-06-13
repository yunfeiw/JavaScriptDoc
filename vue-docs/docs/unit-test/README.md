## vue 单元测试

[Vue cli](https://cli.vuejs.org/zh/) [Vue Test Utils](https://vue-test-utils.vuejs.org/zh/)

## vue cli

功能丰富

对 Babel、TypeScript、ESLint、PostCSS、PWA、单元测试和 End-to-end 测试提供开箱即用的支持。

CLI 之上的图形化界面
通过配套的图形化界面创建、开发和管理你的项目。

### 安装

```sh
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

### 创建

#### 命令

```sh
vue create my-project
# OR
vue ui
```

#### 图形化界面

```sh
vue ui
```

## 安装插件

每个 CLI 插件都会包含一个 (用来创建文件的) 生成器和一个 (用来调整 webpack 核心配置和注入命令的) 运行时插件。当你使用 vue create 来创建一个新项目的时候，有些插件会根据你选择的特性被预安装好。如果你想在一个已经被创建好的项目中安装一个插件，可以使用 vue add 命令：

```sh
    vue add eslint
```

## Preset

一个 Vue CLI preset 是一个包含创建新项目所需预定义选项和插件的 JSON 对象，让用户无需在命令提示中选择它们。

在 vue create 过程中保存的 preset 会被放在你的 home 目录下的一个配置文件中 (~/.vuerc)。你可以通过直接编辑这个文件来调整、添加、删除保存好的 preset。

这里有一个 preset 的示例：

```JSON
{
  "useConfigFiles": true,
  "cssPreprocessor": "sass",
  "plugins": {
    "@vue/cli-plugin-babel": {},
    "@vue/cli-plugin-eslint": {
      "config": "airbnb",
      "lintOn": ["save", "commit"]
    },
    "@vue/cli-plugin-router": {},
    "@vue/cli-plugin-vuex": {}
  }
}
```

## Vue Test Utils

本文档基于 Vue2.x，新版本文档请移步至[这里](https://next.vue-test-utils.vuejs.org/guide/)

### jest

安装 Jest 和 Vue Test Utils：

\$ npm install --save-dev jest @vue/test-utils
然后我们需要在 package.json 中定义一个单元测试的脚本。

```json
// package.json
{
  "scripts": {
    "test": "jest"
  }
}
```

在 Jest 中处理单文件组件
为了告诉 Jest 如何处理 \*.vue 文件，我们需要安装和配置 vue-jest 预处理器：

```sh
npm install --save-dev vue-jest
```

接下来在 package.json 中创建一个 jest 块：

```json
{
  // ...
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      // 告诉 Jest 处理 `*.vue` 文件
      "vue"
    ],
    "transform": {
      // 用 `vue-jest` 处理 `*.vue` 文件
      ".*\\.(vue)$": "vue-jest"
    }
  }
}
```

### jest 例子

是否相等

```js
test("equal", () => {
  const objA = {
    name: "yunfei",
  };
  const objB = {
    name: "wang",
  };

  //not
  expect(objA).not.toEqual(objB);
});
```

目录结构

```
    | tests

        index.test.js

    index.js

    package.json

```

用例

```js
    // index.js

    function add(x,y){
        return x+y;
    }
    const a = 1;
    const b = 2;
    const c = add(a,b);

    console.log(c)
    module.exports =t add;

    // /test/index.test.js

    const add = require('../index.js');

    describe("add",()=>{
        // 测试数据
        const a = 1;
        const b = 2;

        // 验证 -> then
        // jest
        // toBe -> 匹配器
        const r = add(a,b);
        expect(r).toBe(2);
    })
```

### vue jest 例子

目录

```
| src

 | components

        TodoItem.vue

    App.vue

    main.js

| tests

    | unit

        TodoItem.spec.js
```

```vue
// TodoItem.vue 内容
<template>
  <div>
    {{ todo.content }}
    <button id="removeBtn" @click="removeTodo">X</button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["todo"],
  methods: {
    removeTodo() {
      this.$emit("remove", this.todo.id);
    },
  },
};
</script>
```

```js
// TodoItem.spec.js

import { mount } from "@vue/test-utils";
import TodoItem from "../../src/components/TodoItem.vue";

// input
// - props
// - click -》 用户的交互
// - slot

// output
// - emit
// - render view
// - call other function -> axios

describe("TodoItem", () => {
  // if test
  it("nput props && output render view", () => {
    const warpper = mount(TodoItem, {
      propsData: {
        todo: {
          content: "haha",
        },
      },
    });
  });
  // 工具方法
  expect(wrapper.text()).toContain("haha");

  it("input click && output event", () => {
    const warpper = mount(TodoItem, {
      propsData: {
        todo: {
          content: "haha",
          id: 1,
        },
      },
    });
    // click
    // get click btn
    // selector
    wrapper.get("#removeBtn").trigger("click");
    wrapper.get("#removeBtn").trigger("click");

    expect(wrapper.emitted("remove")[0]).toEqual([1]);
  });
});
```
