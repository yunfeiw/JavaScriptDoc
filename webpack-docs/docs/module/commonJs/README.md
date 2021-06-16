### CommonJS（适用于服务端）

在早起前端对于模块化并没有什么规范，反而是偏向服务端的应用有更强烈的需求，CommonJS 规范就是一套偏向服务端的模块化规范，NodeJS 就采用了这个规范。

**独立模块作用域**

一个文件就是模块，拥有独立的作用域

**导出模块内部数据**

通过`module.exports` 或 `exports` 对象导出模块内部数据；

```js
// a.js
let a = 1;
let b = 2;

module.exports = {
  x: a,
  y: b,
};
// or
exports.x = a;
exports.y = b;
```

**导入外部模块数据**

通过 `require` 函数导入外部模块数据

》 注意：导入的值是对模块数据的`拷贝`；[○･｀ Д´･ ○]

```js
// b.js
let a = require("./a");
a.x;
a.y;
```
