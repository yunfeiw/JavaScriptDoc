### UMD

严格来说，`UMD` 并不属于一套模块规范，它主要用来处理 `CommonJS`、`AMD`、`CMD` 的差异兼容，是模块代码能在前面不同的模块环境下都能正常运行

```javascript
(function M(root, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    // Node, CommonJS-like
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    // AMD 模块环境下
    define(factory);
  }
})(this, function() {
  // $ 要导入的外部依赖模块
  function sayHi() {
    console.log("hi");
  }

  // 模块导出数据
  return {
    sayHi,
  };
});
```
