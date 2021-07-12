## 函数式编程

函数式编程是一种强调以函数使用为主的软件开发风格 ，也是一种范式。

### js 中函数式编程

- 数学中函数

  f(x) = y;

- js 中的函数

  ```js
  let a = 3;
  let add = (num) => a + num;
  console.log(add(3)); //6
  ```

- 修改 js 函数基于 数学函数

  ```js
  let add = (a, b) => a + b;
  console.log(add(3, 3)); //6
  ```

> js 中函数作为一等公民

## 纯函数

- 函数式编程基于纯函数

纯函数是对给定的输入返还相同输出的函数，没有副作用；例如

```js
let add = (v) => v++;
```

```js
test("total(2) 等于 4", () => {
  expect(total(2)).toBe(4);
});
```

#### 纯函数优势

1. 无副作用 ：可复用；
2. 可读性强
3. 可测性（jest）

嗯，我个人还是偏向 函数式编程 (_^▽^_)

## 高阶函数

高阶函数：以函数作为输入或者输出的函数被称为高阶函数(Higher-Order Function)。

高阶函数用于抽象通用问题，简而言之，高阶函数就是定义抽象。

### 声明式 和 命令式

嗯，通俗点说

声明式是 `做什么`
命令式是 `怎么做`

举个栗子

```js
const forEach = function(arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    fn(arr[i]);
  }
};

let arr = [1, 2, 3];
forEach(arr, (item) => {
  console.log(item);
});
```

上面通过高阶函数 “forEach”来抽象循环"如何"做的逻辑,直接关注 做"什么"

#### 高阶函数的缓存特性

利用函数的闭包

实现一个只执行一次的函数 - once 高阶函数

```js
const once = (fn) => {
  // 开关
  let done = false;
  return function() {
    //  判断
    if (!done) {
      fn.apply(this, fn);
    } else {
      console.log("执行过啦");
    }
    // 改变状态
    done = true;
  };
};

function test() {
  console.log("我来了");
}
let myfn = once(test);
myfn();
myfn();
```

## 函数柯里化

柯里化是把一个多参数函数转化成一个嵌套的一元函数的过程；

什么是`一元函数`?

一元函数是指函数方程式中只包含一个自变量;(你个 辣鸡！[○･｀ Д´･ ○] )

```js
y = F(x);
```

二元函数

```js
let fn = (x, y) => x + y;
```

- 柯里化过后的二元函数

```js
let fn = (x, y) => x + y;

const curry = function(fn) {
  return function(x) {
    return function(y) {
      return fn(x, y);
    };
  };
};
let myfn = curry(fn);
console.log(myfn(1)(2));
```

看的头晕（回调的方式 很 e x），如果针对多参数的情况下，return 的 function 便无法确定，所以稍微改造下;

- 多参数函数柯里化

通过递归的方式[难道你还不知道`递归`吗，我的天]

```js
const add = function(fn) {
  return function addFun(...args) {
    if (args.length < fn.length) {
      return function() {
        return addFun(...args, ...arguments);
      };
    }
    return fn(...args);
  };
};
const fn = (x, y, z, a) => x + y + z + a;

const myfn = add(fn);

console.log(myfn(1)(2)(3)(1));
```

#### 柯里化优势

- 让纯函数更”纯“，每次接受一个参数，松散解耦
- 某些语言及特定环境下只能接受一个参数
- 惰性执行（只执行一次的函数）

## 组合（composition）和管道（pipe）

组合函数：无需创建新的函数，通过基础函数解决眼前问题。

执行逻辑：从右至左组合，把运算过程组合起来。

栗子

```js
const compose = function(a, b, c) {
  return function(str) {
    return a(b(c(str)));
  };
};
```

进阶版本

```js
const compose = function(...fns) {
  return function(arg) {
    //   翻转下fns 因为执行顺序是 右-->左
    return fns.reverse().reduce((res, fn) => {
      return fn(res);
    }, arg);
  };
};

let Fun = compose(a, b, c);
```

#### pipe

与 compose 执行顺序相反 从左 至 右

```js
const pipe = function(...fns) {
  return function(arg) {
    return fns.reduce((acc, fn) => {
      return fn(acc);
    }, arg);
  };
};

let Fun = pipe(a, b, c);
```

## 扩展

### Pointfree 编程风格

概念：不适用处理的值，只合成运算过程，也就是无值风格。

- 获取所有的句号

  ```js
  const sentenceNum = (str) => str.match(/。/g);
  let str = "你好，再见。";
  console.log(sentenceNum(str));
  ```

- 统计长度

  ```js
  const countFn = (arr) => arr.length;
  ```

- 判断奇偶

  ```js
  const oddOrEven = (num) => (num % 2 === 0 ? "偶数" : "奇数");
  ```

- pointfree 风格组合函数使用:找到句号统计长度最后判断奇偶数

  ```js
  let str = "你好，再见。";
  const myfn = compose(oddOrEven, countFn, sentenceNum);
  console.log(myfn(str));
  ```

### 应用

- 函数式编程库
  lodash.js 、ramda.js 、Underscore.js

- 函数式编程在 react 中应用广泛
