## 设计模式

![设计模式](/assets/img/design-pattern/shejimoshi.jpg)

设计模式是对软件设计开发过程中反复出现的某类问题的通用解决方案。它更多的是一种指导思想和方法论，不是现成的代码

### 分类

设计模式大致可分三类

- 结构型模式
- 创建型模式
- 行为型模式

## 结构型

通过识别系统中组件间的简单关系来简化系统的设计

### 外观模式

![外观模式](/assets/img/design-pattern/wg.png)

外观模式是常见设计模式之一，为子系统中的一组接口提供一个统一的高层接口，是字系统更容易使用；

jquery 就是代表之一，将复杂的原生 DOM 操作进行了抽象和封装，消除了浏览器之间的兼容问题；

栗子：封装一个统一的 DOM 元素事件绑定/取消方法，用于箭筒不同版本的浏览器

```js
//绑定事件
function addEvent(dom, event, handler) {
  if (dom.addEventListener) {
    dom.addEventlistener(event, handler, false); //false冒泡 true 捕获
  } else if (dom.attachEvent) {
    dom.attachEvent("on" + event, handler);
  } else {
    dom["on" + event] = handler;
  }
}

// 取消事件
function removeEvent(dom, event, handler) {
  if (dom.removeEventListener) {
    dom.removeEventListener(event, handler, false);
  } else if (dom.detachEvent) {
    dom.detachEvent("on" + event, handler);
  } else {
    dom["on" + event] = null;
  }
}
```

### 代理模式

![代理模式](/assets/img/design-pattern/daili.png)

一切皆可代理，无论是现实世界还记计算机网络。

现实中的中介、律师、经纪人

计算机中也是一样的，当访问一个数据源的代价太高（占内存，初始化时间长等）或者需要增加而的逻辑又不修改对象本身是可以使用代理。

ES6 中的 Proxy 就是个例子

#### 应用场景

- 对一个对象的访问控制
- 当访问一个对象的过程中需要增额外的逻辑

#### 实现

实现代理模式需要三部分：

- Real Subject：真实对象
- Proxy：代理对象
- Subject 接口：Real Subject 和 Proxy 都需要实现的接口，这样 Proxy 才能被当成 Real Subject 的“替身”使用

```js
function StockPriceAPI() {
  // 延迟数据
  this.yfFetch = function (stock, callback) {
    console.log('Calling external API ... ');
    setTimeout(() => {
      switch (stock) {
        case 'GOOGL':
          callback('$1265.23');
          break;
        case 'AAPL':
          callback('$287.05');
          break;
        case 'MSFT':
          callback('$173.70');
          break;
        default:
          callback('');
      }
    }, 2000);
  }
}

function ProxyData(){
    // 缓存对象
    this.cache = {};
    // 真实的Api对象
    this。realApi = new yfFetch();
    // 获取数据的接口
    this.getVal = function(arg,cb){
        const data = this.cache[arg];
        if(data){
            console.log('有存储')
            cb(data)
        }else{
            // 请求数据
            this.realApi(arg).then(res=>{
                this.cache[arg] = res; //存储
                cb(res);
            })
        }
    }
}
```

## 创建型

处理对象的创建，根据实际情况使用适合的方式创建对象

### 工厂模式

![代理模式](/assets/img/design-pattern/gongchang.png)

`工厂`是一个执照其他对象的对象，制造出的对象也会随着传入工厂对象参数的不同而有所区别

#### 疑问

什么情况下 使用 工厂模式？什么情况下使用 new？

当构造函数过多不方便管理，且需要创建的对象之间纯在某些关联（同一个父类、实现同一个接口等）时，不放使用工厂模式。工厂模式提供`集中化`、`统一化`的方式，避免了分散创建对象导致的代码重复、灵活性差的问题

#### 实现

```js
function AaCar(color) {
  this.color = color;
  this.brand = "aa";
}

function BbCar(color) {
  this.color = color;
  this.brand = "bb";
}

function CcCar(color) {
  this.color = color;
  this.brand = "cc";
}

// 汽车品牌
const BRANDS = {
  aa: 1,
  bb: 2,
  cc: 3,
};
// 汽车工厂

function CarFactory() {
  this.create = function(brand, color) {
    switch (brand) {
      case BRANDS.aa:
        return new AaCar(color);
      case BRANDS.bb:
        return new BbCar(color);
      case BRANDS.cc:
        return new CcCar(color);
      default:
        break;
    }
  };
}

const carFactory = new CarFactory();
carFactory.create(BRANDS.aa, "brown");
```

使用工厂模式之后，不在需要重复引用一个个构造函数，只需引入工厂对象就可以方便创建各类对象

### 单例模式

![代理模式](/assets/img/design-pattern/danli.png)

单例模式中，实例的对象数 为 `1`；

#### 应用场景

当需要一个对象去贯穿整个系统执行某些任务时，单例模式就派上用场。除此之外的场景尽量避免单例模式的使用，因为单例模式会引入全局状态，好的系统应该避免引入过多的全局状态

#### 实现

1. 隐藏 class 的构造函数，避免多次实例化
2. 通过暴漏方法来创建/获取唯一的实例

```js
const SingleCase = (function() {
  // 构造函数
  function Yunfei() {}
  // 存储 实例化后的变量
  let wang;

  return {
    getInstance: function() {
      if (!wang) {
        // 不存在 则创建 保存
        wang = new Yunfei();
      }
      return wang;
    },
  };
})();

const a = SingleCase.getInstance();
const b = SingleCase.getInstance();

console.log(a === b); //true
```

## 行为型

用于识别对象之间常见的交互模式并加以实现。如此，增加这些交互的灵活性

### 策略模式

![代理模式](/assets/img/design-pattern/celve.png)

嗯，说实话这东西我感觉相似 外观、工厂 的 plus ♪(^∇^\*)，只不过是反着来的;

比如对象有某个行为，但是在不同的场景中，该行为有不同的是执行方式；

#### 应用场景

常见的使用场景如登录鉴权，鉴权方式主要取决于用户的登录方式是手机、邮箱、还是第三方，而登录方式也只有运行时才能获取，获取到登录方式后再动态的配置鉴权策略

所有这些鉴权应该实现统一的接口，或统一的行为模式。 Node 生态中鉴权库 passport.js 就是这样

#### 实现

```js
// 登录控制器
function LoginController() {
  this.strategy = null;
  this.setStrategy = function(strategy) {
    this.strategy = strategy; // 绑定当前登录策略
    this.login = this.strategy.login; // 绑定当前登录方法
  };
}

// 用户名 密码
function LocalStrategy() {
  this.login = ({ username, password }) => {
    console.log(username, password);
  };
}
// 手机号、验证码登录策略
function PhoneStragety() {
  this.login = ({ phone, verifyCode }) => {
    console.log(phone, verifyCode);
  };
}
// 第三方社交登录策略
function SocialStragety() {
  this.login = ({ id, secret }) => {
    console.log(id, secret);
  };
}

// 使用
const loginController = new LoginController();

// 调用用户名、密码登录接口，使用LocalStrategy
app.use("/login/local", function(req, res) {
  loginController.setStrategy(new LocalStragegy());
  loginController.login(req.body);
});

// 调用手机、验证码登录接口，使用PhoneStrategy
app.use("/login/phone", function(req, res) {
  loginController.setStrategy(new PhoneStragety());
  loginController.login(req.body);
});

// 调用社交登录接口，使用SocialStrategy
app.use("/login/social", function(req, res) {
  loginController.setStrategy(new SocialStragety());
  loginController.login(req.body);
});
```

从以上示例可以得出使用策略模式有以下优势：

- 方便在运行时切换算法和策略

- 代码更简洁，避免使用大量的条件判断

- 关注分离，每个 strategy 类控制自己的算法逻辑，strategy 和其使用者之间也相互独立

### 迭代器模式

![迭代器模式](/assets/img/design-pattern/diedaiqi.png)

ES6 中的迭代器 Iterator 都知道，迭代器用于遍历容器（集合）并访问容器中的元素，而且无论容器的数据结构是什么（数据、set、map）,迭代器接口都应该是一样的，都有需要遵循·迭代协议·

#### 优势

1. 提供一致的遍历各种数据结构的方式，而不是了解数据的内部结构
2. 提供遍历容器（集合）的能力而无需更改容器的接口

#### 实现

- hasNext():判断迭代是否结束，返回 bool 值
- next():查找并返回下一个元素

```js
const arr = ["yunfei", "难受", "哎", false];

function Iterator(items) {
  this.items = items;
  this.index = 0; // 执行第几位 下标
}
Itertor.prototypr = {
  hasNext: function() {
    return this.index < this.items.length;
  },
  next:function(){
    return this.items[this.index+=]
  }
};

// 使用

const iterator = new Iterator(item);

while(iterator.hasNext()){
  console.log(iterator.next());
}
```

#### 扩展

ES6 提供了更简单的迭代循环语法 for...of，使用该语法的前提是操作对象需要实现 可迭代协议

简单说就是该对象有个 Key 为 Symbol.iterator 的方法，该方法返回一个 iterator 对象。

比如我们实现一个 Range 类用于在某个数字区间进行迭代：

```js
function Range(start, end) {
  return {
    [Symbol.iterator]: function() {
      return {
        next() {
          if (start < end) {
            return { value: start++, done: false };
          } else {
            return { done: true, value: end };
          }
        },
      };
    },
  };
}

for (num of Range(1, 5)) {
  console.log(num);
}
// 1, 2, 3, 4
```

### 观察者模式

![观察者模式](/assets/img/design-pattern/guanchazhe.png)

观察者模式又被称为发布订阅模式（发布订阅模式更加复杂）；

原理： 被观察对象（subject）维护一组观察者（observer），当被观察对象状态改变时，通过嗲用观察者的摸个方法将这些变化通知到观察者

比如给 DOM 元素绑定事件 addEventListener()方法

```js
target.addEventListener(type, listener);
```

target 是`被观察者`，listener 是观察者

#### 实现

- subscribe() 接收一个观察者 observer 对象，使其订阅自己
- unsubscribe() 接收一个观察者 observer 对象，使其取消订阅自己
- fire() 触发事件，通知所有观察者

```js

```

### 中介者模式

### 访问者模式
