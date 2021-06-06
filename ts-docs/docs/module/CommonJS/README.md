## CommonJS

- 基于服务端、桌面端的模块化

在早期，对于运行在浏览器端的 `JavaScript` 代码，模块化的需求并不那么的强烈，反而是偏向 服务端、桌面端 的应用对模块化有迫切的需求（相对来说，服务端、桌面端程序的代码和需求要复杂一些）。`CommonJS` 规范就是一套偏向服务端的模块化规范，它为非浏览器端的模块化实现制定了一些的方案和标准，`NodeJS` 就采用了这个规范。

**独立模块作用域**

一个文件就是模块，拥有独立的作用域

**导出模块内部数据**

通过 `module.exports` 或 `exports` 对象导出模块内部数据

```javascript
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

```javascript
// b.js
let a = require("./a");
a.x;
a.y;
```
