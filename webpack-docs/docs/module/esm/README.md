### ESM

从 `ECMAScript2015/ECMAScript6` 开始，`JavaScript` 原生引入了模块概念，而且现在主流浏览器也都有了很好的支持

### 独立模块作用域

一个文件就是模块，拥有独立的作用域，且导出的模块都自动处于 `严格模式`下，即：`'use strict'`

### 导出模块内部数据

使用 `export` 语句导出模块内部数据

```js
// 导出单个特性
export let name1, name2, …, nameN;
export let name1 = …, name2 = …, …, nameN;
export function FunctionName(){...}
export class ClassName {...}

// 导出列表
export { name1, name2, …, nameN };

// 重命名导出
export { variable1 as name1, variable2 as name2, …, nameN };

// 默认导出
export default expression;
export default function (…) { … }
export default function name1(…) { … }
export { name1 as default, … };

// 模块重定向导出
export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
export { default } from …;

```

### 导入外部模块数据

》 注意：导入的值是对模块数据的`引用`；^_^

导入分为两种模式

- 静态导入
- 动态导入

**静态导入**

在浏览器中，`import` 语句只能在声明了 `type="module"` 的 script 的标签中使用。

```javascript
import defaultExport from "module-name";
import * as name from "module-name";
import { export } from "module-name";
import { export as alias } from "module-name";
import { export1 , export2 } from "module-name";
import { foo , bar } from "module-name/path/to/specific/un-exported/file";
import { export1 , export2 as alias2 , [...] } from "module-name";
import defaultExport, { export [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";
```

> 静态导入方式不支持延迟加载，`import` 必须在模块的最开始位置

err 示范

```javascript
document.onclick = function() {
  // import 必须放置在当前模块最开始加载
  // import m1 from './m1.js'
  // console.log(m1);
};
```

**动态导入**
此外，还有一个类似函数的动态 `import()`，它不需要依赖 `type="module"` 的 script 标签。

关键字 `import` 可以像调用函数一样来动态的导入模块。以这种方式调用，将返回一个 `promise`。

```js
import('a').then((m)=>{
    console.log(m)
})

// 也支持 await
let m = await import('a');
```

> 通过 `import()` 方法导入返回的数据会被包装在一个对象中，即使是 `default` 也是如此

