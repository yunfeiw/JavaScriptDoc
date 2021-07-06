## class

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过 class 关键字，可以定义类。

基本上，ES6 的 class 可以看作只是一个语法糖

> 类名默认 首字母 大写

```js
class Preson {
  age = 18; // 等同于 constructor 中的 this.age=18
  constructor(name) {
    // 属性
    this.name = name;
  }

  // 方法
  getName(){
      console.log('我是：'this.name);
  }
}

const yunfei = new Preson('yunfei');
yunfei.getName();//我是：yunfei
```

### 静态方法与静态属性

```js
class Preson {
  // 静态属性
  static likeColor = "blue";
  // 静态方法
  static getSex() {
    console.log("男的");
  }
  constructor() {}
}

Preson.likeColor; // blue
Preson.getSex(); // 男的
```

> 实例不会继承的属性和方法

### 私有属性

#声明

```js
class Preson {
  #ab = "私有属性";
  constructor() {}
}
```

### 类的继承

extends 关键字

```js
class Dad {
  constructor(name) {
    this.name = name;
  }
  getName() {
    console.log("name:", this.name);
  }
}

class Son extends Dad {
  constructor(name, age) {
    super(name); // super 代表 父类的构造函数（即Dad）
    this.age = age;
  }
  getAge() {
    console.log("age", this.age);
  }
}

const yunfei = new Son("yunfei", 18);

yunfei.getName(); // yunfei

yunfei.getAge(); // 18
```

#### super 特点

- super 只能在子类中使用，可以在 constructor 及 函数或静态方法中使用
- 不能单独使用 super
- super 调用类似函数调用可以根据父类构造函数传参数
- 如果子类中没有 constructor，子类会自动调取 super()且传入参数到父类
- 子类中需要在调取 super 之后调用 this

### 抽象基类

Abstract

```js
class AbstractPerson {
  constructor() {
    if (new.target === AbstractPerson) {
      throw new Error("AbstractPerson leukemia不能实例化");
    }
  }
}

class Person extends AbstractPerson {}

const yunfei = new Person();
```

## 面向对象

面向对象思想

1. 面相过程：注重解决问题的步骤，分析问题需要的每一步，实现函数依次调用；
2. 面相对象：是一种程序设计思想。将数据和处理数据的程序封装到对象中；
3. 面相对象特性： 抽象、 继承、封装、多态

优点：提高代码的复用性及可维护性；

### 对象和类

​ 对象：具体的某个事物；(如：yunfei、LOL)

​ 类：一类事物的抽象；(如：人类、游戏)

## new

new 做了什么？

1. new 执行函数；
2. 创建空对象`obj`；
3. 将执行函数的 `prototype` 绑定到 `obj` 的原型上；
4. this 绑定到空对象，并执行函数；
5. 如果函数没有返回值，则隐式返还`obj`。反之，返回函数结果；

#### 具体实现

```js
Function.prototype.yfnew = function(...arg) {
  let obj = Object.create(this.prototype);
  let res = this.apply(obj, arg);
  return res ? res : obj;
};

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.getName = function() {
  console.log(this.name);
};

const yunfei = Person.yfnew("yunfei", 18);

yunfei.getName(); //yunfei
```

## 构造函数

在 JavaScript 中，用 new 关键字来调用的函数，称为构造函数;

如上所示的 Person 就是个构造函数

> class 的语法糖 是以构造函数来实现的

举个栗子

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

## 原型

JavaScript 中的对象有一个特殊的 [[Prototype]] 内置属性，其实就是对于其他对象的引
用。几乎所有的对象在创建时 [[Prototype]] 属性都会被赋予一个非空的值

- 通过 new 实例化出来的对象其属性和行为来自两个部分，一部分来自构造函数，另一部分来自原型。
- 当声明一个函数的时候，同时也申明了一个原型 。
- 原型本身是一个对象。
- 对象属性方法查找规则；

#### 原型构造函数及对象关系

![关系](/assets/img/class/prototypeimg.png)

#### 原型构造函数及对象关系

![关系](/assets/img/class/三者关系.png)

## 原型链

对象之间的继承关系，在 JavaScript 中是通过 prototype 对象指向父类对象，直到指向 Object 对象为止，这样就形成了一个原型指向的链条，称之为原型链

1.当访问一个对象的属性或方法时，会先在对象自身上查找属性或方法是否存在，如果存在就使用对象自身的属性或方法。如果不存在就去创建对象的构造函数的原型对象中查找 ，依此类推，直到找到为止。如果到顶层对象中还找不到，则返回 `undefined`。

2.原型链最顶层为 Object 构造函数的 prototype 原型对象，给 Object.prototype 添加属性或方法可以被除 `null` 和 `undefined` 之外的所有数据类型对象使用。

![关系](/assets/img/class/原型链.png)

### Object.prototype

所有普通的 [[Prototype]] 链最终都会指向内置的 Object.prototype

## call/apply/bind

作用：改变函数的作用域。

```js
function getName() {
  console.log(this.name);
}

let obj = { name: "yunfei" };

getName.apply(obj); // yunfei
getName.call(obj); // yunfei
getName.bind(obj)(); // yunfei
```

### 三者区别

#### 参数

apply、bind、call 第一个参数，this 指向域；

bind、call，接收参数为多参数 fn(arg1,arg2,arg3);

apply 接收两个参数，第二个参数为数组;

bind 返回一个新函数，该函数的 this 指向绑定的作用域 1

### call

```js
```

### apply

```js
```

### bind

```js
```

## 深拷贝

### 传值和传址问题

- 基本数据类型：Number、String、Boolean、Null、Undefined
- 复杂数据类型/引用数据类型:Array、Date、Math、RegExp、Object、Function 等

### JOSN 序列化的不足

如果拷贝对象包含函数，或者 undefined 等值，此方法返回的结果，会过滤掉这些数据

### 手动实现

```js
function deepCopy(obj) {
  var res = null;
  // 数据
  if (Array.isArray(obj)) {
    res = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      res.push(deepCopy(obj[i]));
    }
  } else if (
    Object.prototype.toString.call(obj).toLocaleLowerCase() ===
    "[object object]"
  ) {
    // 对象
    res = {};
    for (var key in obj) {
      res[key] = deepCopy(obj[key]);
    }
  } else {
    res = obj;
  }

  return res;
}
```
