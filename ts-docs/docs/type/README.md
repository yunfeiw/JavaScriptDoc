## 类型系统

- 类型
  数据是有格式（类型）的
  程序是可能有错误的
  动态类型语言 & 静态类型语言
  静态类型语言的优缺点
  动态类型语言
- 类型系统
  类型标注
  类型检测
  类型标注
  基础的简单的类型标注
  基础类型
  空和未定义类型
  对象类型
  数组类型
  元组类型
  枚举类型
  无值类型
  Never 类型
  任意类型
  未知类型
  函数类型

## 什么是类型

    程序 = 数据结构 + 算法 = 各种格式的数据 + 处理数据的逻辑

## 数据类型

    数字、布尔值、字符
    数组、集合

## 动态类型语言 & 静态类型语言

#### 动态类型语言

程序运行期间才做数据类型检查的语言，如：JavaScript

#### 静态类型语言

程序编译期间做数据类型检查的语言，如：Java

## 静态类型语言的优缺点

优点

    程序编译阶段（配合IDE、编辑器甚至可以在编码阶段）即可发现一些潜在错误，避免程序在生产

    环境运行了以后再出现错误

    编码规范、有利于团队开发协作、也更有利于大型项目开发、项目重构

    配合IDE、编辑器提供更强大的代码智能提示/检查
    代码即文档

缺点

    麻烦

    缺少灵活性

## 什么是类型系统

类型系统包含两个重要组成部分

1. 类型标注（定义、注解） - typing

2. 类型检测（检查） - type-checking

#### 类型检测

对数据类型进行检测

#### 类型标注

类型标注就是在代码中给数据（变量、函数（参数、返回值））添加类型说明，当一个变量或者函数（参数）等被标注以后就不能存储或传入与标注类型不符合的类型

例：

```javascript
数据载体: 类型;
```

## 基础的简单的类型标注

    - 基础类型
    - 空和未定义类型
    - 对象类型
    - 数组类型
    - 元组类型
    - 枚举类型
    - 无值类型
    - Never 类型
    - 任意类型
    - 未知类型（Version3.0 Added）

## 基础类型

基础类型包含：string，number，boolean

```js
let n: number = 1;
let is: boolean = true;
let title: string = "yunfei";
```

空和未定义类型

因为在 Null 和 Undefined 这两种类型有且只有一个值，在标注一个变量为 Null 和 Undefined 类型，那就表示该变量不能修改

```js
let a: null;

a = null; // yes
a = 1; // no
```

- null 和 undefined 是所有类型的子类型。

```js
let a: number;
// ok
a = null;
```

> 指定 strictNullChecks 配置为 true ，可以有效的检测 null 或者 undefined ，避免很多常见问题，如 undefined.toFixed(0);

#### 对象类型

内置对象类型

在 JavaScript 中，有许多的内置对象，比如：Object、Array、Date……，我们可以通过对象的构造函数 或者 类 来进行标注

```js
let a: object = {};
// 元组标注 <number>
let arr: Array<number> = [1, 2, 3];
let d1: Date = new Date();
```

自定义对象类型

- 字面量标注

```js
let a: { username: string, age: number } = {
  username: "yunfei",
  age: 18,
};
// ok
a.username;
a.age;
// error
a.gender;
```

> 优点 : 方便、直接

> 缺点 : 不利于复用和维护

- 接口

```js
interface Person {
  username: string;
  age: number;
}
let a: Person = {
  username: "yunfei",
  age: 18,
};
// ok
a.username;
a.age;
// error
a.gender;
```

> 优点 : 复用性高
> 缺点 : 接口只能作为类型标注使用，不能作为具体值，它只是一种抽象的结构定义，并不是实体，没有具体功能实现

- 定义 类 或者 构造函数

```js
    class Person {
    constructor(public username: string, public age: number) {
    }
    }
    // ok
    a.username;
    a.age;
    // error
    a.gender;
```

> 优点 : 功能相对强大，定义实体的同时也定义了对应的类型

> 缺点 : 复杂，比如只想约束某个函数接收的参数结构，没有必要去定一个类，使用接口会更加简单

#### 扩展

```js
let a: string;
a = "1";
// error String有的，string不一定有（对象有的，基础类型不一定有）
a = new String("1");
let b: String;
b = new String("2");
// ok 和上面正好相反
b = "2";
```

## 数组类型

TypeScript 中数组存储的类型必须一致，所以在标注数组类型的时候，同时要标注数组中存储的数据类型

#### 使用泛型标注

```js
// <number> 表示数组中存储的数据类型
let arr: Array<number> = [];
// ok
arr.push(18);
// error
arr.push("yunfei");
```

#### 简单标注

```js
let arr: string[] = [];
// ok
arr.push("yunfei");
// error
arr.push(18);
```

---

## 元组类型

元组类似数组，但是存储的元素类型不必相同，但是需要注意：

初始化数据的个数以及对应位置标注类型必须一致

越界数据必须是元组标注中的类型之一（标注越界数据可以不用对应顺序 - 联合类型）

```js
let data: [string, number] = ["yunfei", 18];
// ok
data.push(100);
// ok
data.push("100");
// error
data.push(true);
```

---

## 枚举类型

枚举的作用组织收集一组关联数据的方式，通过枚举我们可以给一组有关联意义的数据赋予一些友好的
名字

```js
enum HTTP_CODE {
    OK = 200,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED
};
// 200
HTTP_CODE.OK;
// 405
HTTP_CODE.METHOD_NOT_ALLOWED;
// error
HTTP_CODE.OK = 1;

```

注意事项：

- key 不能是数字
- value 可以是数字，称为 数字类型枚举，也可以是字符串，称为 字符串类型枚举，但不能是其它值，默认为数字：0
- 枚举值可以省略，如果省略，则：
  1. 第一个枚举值默认为：0
  2. 非第一个枚举值为上一个数字枚举值 + 1
- 枚举值为只读（常量），初始化后不可修改

#### 字符串类型枚举

枚举类型的值，也可以是字符串类型

```js
enum URLS {
    USER_REGISETER = '/user/register',
    USER_LOGIN = '/user/login',
    // 如果前一个枚举值类型为字符串，则后续枚举项必须手动赋值
    INDEX = 0
}
```

注意：如果前一个枚举值类型为字符串，则后续枚举项必须手动赋值

> 小技巧：枚举名称可以是大写，也可以是小写，推荐使用全大写（通常使用全大写的命名方式来
> 标注值为常量）

## 无值类型

表示没有任何数据的类型，通常用于标注无返回值函数的返回值类型，函数默认标注类型为： void

```js
function fn(): void {
  // 没有 return 或者 return undefined
}
```

> 在 strictNullChecks 为 false 的情况下， undefined 和 null 都可以赋值给 void ，但是当 strictNullChecks 为 true 的情况下，只有 undefined 才可以赋值给 void

## Never 类型

当一个函数永远不可能执行 return 的时候，返回的就是 never ，与 void 不同， void 是执行了
return ， 只是没有值， never 是不会执行 return ，比如抛出错误，导致函数终止执行

```js
function fn(): never {
  throw new Error("error");
}
```

## 任意类型

有的时候，我们并不确定这个值到底是什么类型或者不需要对该值进行类型检测，就可以标注为 any
类型

```js
let a: any;
```

- 一个变量申明未赋值且未标注类型的情况下，默认为 any 类型
- 任何类型值都可以赋值给 any 类型
- any 类型也可以赋值给任意类型
- any 类型有任意属性和方法

注意：标注为 any 类型，也意味着放弃对该值的类型检测，同时放弃 IDE 的智能提示

> 小技巧：当指定 noImplicitAny 配置为 true ，当函数参数出现隐含的 any 类型时报错

## 未知类型

unknow，3.0 版本中新增，属于安全版的 any，但是与 any 不同的是：

- unknow 仅能赋值给 unknow、any
- unknow 没有任何属性和方法

## 函数类型

在 JavaScript 函数是非常重要的，在 TypeScript 也是如此。同样的，函数也有自己的类型标注格式

- 参数
- 返回值

```js
//函数名称( 参数1: 类型, 参数2: 类型... ): 返回值类型;
function add(x: number, y: number): number {
  return x + y;
}
```

## 总结

- 类型标注语法
- 基础类型标注

  字符串、数字、布尔值、空、未定义

- 非基础类型标注

  对象、数组

- 特殊类型

  元组、枚举、无值类型、Never 类型、任意类型、未知类型

- 函数基本标注
