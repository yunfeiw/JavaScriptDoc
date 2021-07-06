## ECMAScript

javaScript 组成

- ECMAScript
- DOM
- BOM

![历史](/assets/img/es/histry.png)

## let 和 const

let 和 var 的差异

- let 允许声明一个在作用域限制在块级中的变量、语句或者表达式
- 块级作用域
- let 不能重复声明
- let 不会被预解析
- var 声明的变量只能是全局或者整个函数块的

[详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)

const 常量

- 常量不能重新赋值
- 不能重复声明
- 块级作用域
- const 不会被预解析

[详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const)

## 解构赋值

- 对象的解构赋值
- 数组的解构赋值
- 字符串的解构赋值

[详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

## 展开运算符

- 对象展开
- 数组展开

[详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

## Set 与 Map

Set 对象

- Set 对象的数据结构
- Set 相关属性与方法
  - size 属性
  - clear()、delete()、has()、add()

[详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

Map 对象

- Map 对象的数据结构

  - Map 相关属性与方法
  - size 属性
  - clear()、delete()、get()、has()、set()

[详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

## 函数扩展

- 箭头函数
  - 箭头函数的各种写法
  - 箭头函数的 this 问题
  - 箭头函数的不定参问题
- rest 参数设置
- 默认值设置

[详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

## 数组扩展

- Array.from()、Array.of()
- find()、findIndex()、includes()
- flat()、flatMap()

[详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

## 字符串扩展

- includes(), startsWith(), endsWith()
- repeat()
- 模版字符串

[详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)

## 对象扩展

- 属性简洁表示法
- 属性名表达式

[详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

## Symbol

symbol 是一种基本数据类型。Symbol()函数会返回 symbol 类型的值，该类型具有静态属性和静态方法。

每个从 Symbol()返回的 symbol 值都是唯一的。

属性：

Symbol.length 长度属性，值为 0。

Symbol.prototype symbol 构造函数的原型。

[详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

## Proxy

Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

```js
const p = new Proxy(target, handler);
```

#### 参数

- target

  要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。

- handler

  一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

#### 方法

- handler.getPrototypeOf()
  Object.getPrototypeOf 方法的捕捉器。
- handler.setPrototypeOf()
  Object.setPrototypeOf 方法的捕捉器。
- handler.isExtensible()
  Object.isExtensible 方法的捕捉器。
- handler.preventExtensions()
  Object.preventExtensions 方法的捕捉器。
- handler.getOwnPropertyDescriptor()
  Object.getOwnPropertyDescriptor 方法的捕捉器。
- handler.defineProperty()
  Object.defineProperty 方法的捕捉器。
- handler.has()
  in 操作符的捕捉器。
- handler.get()
  属性读取操作的捕捉器。
- handler.set()
  属性设置操作的捕捉器。
- handler.deleteProperty()
  delete 操作符的捕捉器。
- handler.ownKeys()
  Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器。
- handler.apply()
  函数调用操作的捕捉器。
- handler.construct()
  new 操作符的捕捉器。

栗子

```js
const handler = {
  get: function(obj, prop) {
    return prop in obj ? obj[prop] : 37;
  },
};

const p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b); // 1, undefined
console.log("c" in p, p.c); // false, 37
```

[详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

## Iterator 和 for...of 循环

Iterator 函数返回一个对象，它实现了遗留的迭代协议，并且迭代了一个对象的可枚举属性。

属性

Iterator.prototype[@@iterator]

返回一个函数，它返回符合迭代协议的迭代对象。

方法

Iterator.prototype.next

返回[property_name, property_value] 格式或 property_name 的下一项。 如果没有更多项，抛出 StopIteration 。

栗子

```js
var a = {
  x: 10,
  y: 20,
};
var iter = Iterator(a);
console.log(iter.next()); // ["x", 10]
console.log(iter.next()); // ["y", 20]
console.log(iter.next()); // throws StopIteration
```

> ES6 规定，默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性，或者说，一个数据结构只要具有 Symbol.iterator 属性，就可以认为是“可遍历的”（iterable）

[详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

## Generator 函数的语法

生成器对象是由一个 generator function 返回的,并且它符合可[迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)和[迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#iterator)。

栗子

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

let g = gen();
// "Generator { }"
```

[详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)

## async 函数

async 函数是什么？一句话，它就是 Generator 函数的语法糖。

async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数

栗子

```js
async function getStockPriceByName(name) {
  const symbol = await getStockSymbol(name);
  const stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName("goog").then(function(result) {
  console.log(result);
});
```

[详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction)

## Class

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过 class 关键字，可以定义类。

基本上，ES6 的 class 可以看作只是一个语法糖

ES5

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function() {
  return "(" + this.x + ", " + this.y + ")";
};
```

ES6

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return "(" + this.x + ", " + this.y + ")";
  }
}
```

注意点
（1）严格模式

（2）不存在提升

（3）name 属性

（4）Generator 方法

如果某个方法之前加上星号（\*），就表示该方法是一个 Generator 函数。

```js
class Foo {
  constructor(...args) {
    this.args = args;
  }
  *[Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo("hello", "world")) {
  console.log(x);
}
```

（5）this 的指向

类的方法内部如果含有 this，它默认指向类的实例


[详情](https://es6.ruanyifeng.com/#docs/class)
