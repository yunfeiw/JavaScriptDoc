### AMD/CMD

因为 CommonJS 规范一些特性（基于文件系统，同步加载），它并不适用于浏览器端，所以另外定义了适用于浏览器端的规范

`AMD(Asynchronous Module Definition)`

https://github.com/amdjs/amdjs-api/wiki/AMD

浏览器并没有具体实现该规范的代码，我们可以通过一些第三方库来解决

#### requireJS

https://requirejs.org/

```javascript
// 1.html
<script
  data-main="scripts/main"
  src="https://cdn.bootcss.com/require.js/2.3.6/require.min.js"
></script>
```

**独立模块作用域**

通过一个 `define` 方法来定义一个模块，并通过该方法的第二个回调函数参数来产生独立作用域

```javascript
// scripts/Cart.js
define(function() {
  // 模块内部代码
});
```

**导出模块内部数据**

通过 `return` 导出模块内部数据

```javascript
// scripts/Cart.js
define(function() {
  return class Cart {
    add(item) {
      console.log(`添加商品：${item}`);
    }
  };
});
```

**导入外部模块数据**

通过前置依赖列表导入外部模块数据

```javascript
// scripts/main.js
// 定义一个模块，并导入 ./Cart 模块
define(["./Cart"], function(Cart) {
  let cart = new Cart();
  cart.add({ name: "iphoneXX", price: 1000000 });
});
```

#### `requireJS` 的 `CommonJS` 风格

`require.js` 也支持 `CommonJS` 风格的语法

**导出模块内部数据**

```javascript
// scripts/Cart.js
define(["require", "exports", "module"], function(require, exports, module) {
  class Cart {
    add(item) {
      console.log(`添加商品：${item}`);
    }
  }
  exports.Cart = Cart;
});
// 忽略不需要的依赖导入
define(["exports"], function(exports) {
  class Cart {
    add(item) {
      console.log(`添加商品：${item}`);
    }
  }
  exports.Cart = Cart;
});
// 如果是依赖的导入为：require, exports, module，也可以省略依赖导入声明
define(function(require, exports, module) {
  class Cart {
    add(item) {
      console.log(`添加商品：${item}`);
    }
  }
  exports.Cart = Cart;
});
```

**导入外部模块数据**

```javascript
// scripts/main.js
define(["./Cart"], function(Cart) {
  let cart = new Cart();
  cart.add({ name: "iphoneXX", price: 1000000 });
});
```
