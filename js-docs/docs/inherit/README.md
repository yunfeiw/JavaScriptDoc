## 继承与行为委托

## 什么是继承

定义 父、子两个类，子类继承父类后。子类会包含父类行为，也可以重写所有继承父类的行为甚至定义新行为；

举个栗子

```js
class Parent {
  constructor(props) {
    this.age = props;
  }
  getAge() {
    console.log(this.age);
  }
}
class Son extends Parent {
  constructor(option) {
    super(option.age);
    this.name = option.name;
  }
  getName() {
    console.log(this.name);
  }
}

var yunfei = new Son({ name: "王", age: 18 });
yunfei.getName(); //王
```

## 继承的特性

## 继承的实现方式

### 类式继承

通过原型链实现

```js
// 父类
function Super() {
  this.val = "O(∩_∩)O哈哈~";
}
Super.prototype.getVal = function() {
  console.log(this.val);
};

// 子类
function Sub() {
  this.name = "嘻嘻嘻";
}
// 子类继承父类
Sub.prototype = new Super();
// 子类添加方法

Sub.prototype.getName = function() {
  console.log(this.name);
};
```

> 注意执行顺序；子类继承父类时，要在 子类添加方法前执行，否则会因为更改 prototype 导致该方法丢失

使用

```js
const yunfei = new Sub();

yunfei.getVal(); //'O(∩_∩)O哈哈~'
yunfei.getName(); //嘻嘻嘻
```

#### 扩展 instanceof

可以通过`instanceof`来检测对象的原型链中是否存在右侧函数的原型(Foo.prototype);进而判断出继承的关系

```js
yunfei instanceof Super; // true
yunfei instanceof Sub; // true
Sub instanceof Super; // false
Sub.prototype instanceof Super; // true
```

> Object 是所有对象的实例

#### 类式继承的缺点

- 子类通过其原型 prototype 对父类实例化，继承了父类。所以父类中共有属性是`引用类型`；就会被所有子类的实例·公用。
- 因为是通过子类的原型 prototype 实例化实现的，所以在创建父类的时候，无法对其`传参`

### 构造函数继承

```js
// 父类
function Super(id) {
  this.arr = [1, 2, 3, 4];
  this.id = id;
}
Super.prototype.consoleArr = function() {
  console.log(this.arr);
};
// 子类
function Sub(id) {
  Super.call(this, id); //继承父类
}

const a1 = new Sub(1);
const a2 = new Sub(2);
```

通过 call 更改父构造函数的作用域来实现继承；

#### 构造函数式继承的缺点

- 因为通过 call 实现继承，没有通过 prototype 实现，导致父类的 prototype 上的方法没有实现`继承`。所以需要在构造函数内声明方法，导致实例化时造成不必要的开销。并且违背了代码`代码复用`的原则。

### 组合式继承

类式继承通过子类的原型 prototype 对父类实例化来实现的

构造函数继承是通过在子类的构造函数作用环境中执行一次父类的构造函数实现的

集成以上两点，就是组合式继承

```js
// 父类
function Super(name) {
  this.name = name;
  this.arr = [1, 2, 3, 4];
}
Super.prototype.getName = function() {
  console.log(this.name);
};
// 子烈
function Sub(name, age) {
  Super.call(this, name); //继承父类属性
  this.age = age;
}
// 继承父类原型
Sub.prototype = new Super();
// 子类方法
Sub.prototype.getAge = function() {
  console.log(this.age);
};
```

#### 组合式继承的缺点

- 哎 call 执行一次；prototype 又执行一次；调用两次，太难了

### 原型式继承

借助 原型 prototype 可以根据已有的对象穿件一个新对象，同时不必创建新的自定义对象类型

```js
function inheritObject(o) {
  // 过渡函数对象
  function F() {}
  // 过渡对象的原型继承 父对象
  F.prototype = o;
  // 返回过渡函数对象的实例
  return new F();
}
```

简单来说 他是对 `类式继承`的一个封装；

同样道理 `类式继承`的问题它同样存在

```js
const arr = [1, 2, 3, 4];
const newArr1 = inheritObject(arr);
newArr1.push(5);
console.log(newArr1); //[1,2,3,4,5]

const newArr2 = inheritObject(arr);

console.log(newArr2); //[1,2,3,4,5]
```

> 引用类型的数据 共享啦啦啦

他的进阶版 寄生式继承

### 寄生式继承

通过这样的方式，我们可以对创建的对象添加新的属性和方法

```js
const obj = { name: "yunfei", arr: [1, 2, 3, 4, 5] };
function creatObj(obj) {
  let o = new ineritObject(obj);
  // 扩展方法
  o.getName = function() {
    console.log(123);
  };

  return o;
}
```

### 寄生组合式继承

组合式继承，有个致命的问题是，子类不是父类的实例，而子类原型是父类的实例；通过寄生组合式继承可以解决

```js
function inheritPrototype(sub, super) {
  // 复制父类原型
  let p = inheritObject(super.prototype);
  // 修正因重写子类原型导致子类的constructor属性被修改
  p.constructor = sub;
  // 设置子类原型
  sub.prototype = p;
}
```

> 注意，我们需要继承的仅仅是父类的 prototype,因为父类的构造函数在子类的构造函数中，我们已经调用过了。 w(ﾟ Д ﾟ)w;

> 同时我们还要修正 p 的 prototype，来指向子类。

```js
// 父类
function Super(name) {
  this.name = name;
  this.arr = [1, 2, 3, 4];
}
Super.prototype.getName = function() {
  console.log(this.name);
};
// 子类
function Sub(name, age) {
  // 构造函数继承
  Super.call(this, name);
  this.age = age;
}
// 寄生式继承父类原型
inheritPrototype(Sub, Super);
// 子类新增方法
Sub.prototype.getAge = function() {
  console.log(this.age);
};
```

![寄生组合](/assets/img/inherit/jishenzuhe.png)

最后 instanceof 也可以正常使用

```js
Sub instanceof Super; //true
```

## 行为委托

行为委托认为对象之间是兄弟关系，互相委托，而不是父类和子类的关系

JavaScript 的[[Prototype]] 机制本质上就是行为委托机制

### 前言

[[Prototype]] 机制就是指对象中的一个内部链接引用另一个对象

如果在第一个对象上没有找到需要的属性或者方法引用，引擎就会继续在 [[Prototype]]关联的对象上进行查找。

同理，如果在后者中也没有找到需要的引用就会继续查找它[[Prototype]]，以此类推。这一系列对象的链接被称为“原型链”。

换句话说，JavaScript 中这个机制的本质就是对象之间的关联关系

### 简单的实现

```js
Task = {
  setID: function(ID) {
    this.id = ID;
  },
  outputID: function() {
    console.log(this.id);
  },
};
// 让 XYZ 委托 Task
XYZ = Object.create(Task);
XYZ.prepareTask = function(ID, Label) {
  this.setID(ID);
  this.label = Label;
};
XYZ.outputTaskDetails = function() {
  this.outputID();
  console.log(this.label);
};
// ABC = Object.create( Task );
// ABC ... = ...
```

在这段代码中，Task 和 XYZ 并不是类（ 或者函数 ），它们是对象。XYZ 通过 Object.create(..) 创建，它的 [[Prototype]] 委托了 Task 对象;

> 这种编码风格称为“对象关联”（OLOO，objects linked to other objects）。

JavaScript 中就是没有类似“类”的抽象机制。

> 在 API 接口的设计中，委托最好在内部实现，不要直接暴露出去。在之前的例子中我们并没有让开发者通过 API 直接调用 XYZ.setID()

### 注意

1. 互相委托（禁止）
   你无法在两个或两个以上互相（双向）委托的对象之间创建循环委托。如果你把 B 关联到 A 然后试着把 A 关联到 B，就会出错
2. 调试

### 优势

- 对象关联风格的代码显然更加简洁，因为这种代码只关注一件事：对象之间的关联关系
- 对象关联可以更好地支持关注分离（separation of concerns）原则
