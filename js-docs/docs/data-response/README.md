## 数据响应式

## defineProperty

Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

```js
Object.definedProperty(obj,'name',{
    configurable:true,
    enumerable:true,
    writable:true,
    get(){
        return value
    }
    set(val){
        console.log('set name')
        value = val
    }
})
```

### 参数

- configurable  默认值：false
当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。

- enumerable    默认值：false
当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。

- writable      默认值：false
当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符改变。

## proxy

- 定义  ：对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。

```js

let obj = ne Proxy(
    {name:"yunfei",age:18},
    {
        get(target,name){
            return target[name];
        }
        set(target,name,value){
            target[name] = value;
        }
    }
    
)

```


## 通过 数据响应式 实现界面更新

流程如下

![数据相应](/assets/img/data-response/2.png)


### observe 数据劫持

```js
  class YunFei {
      constructor(opt) {
        this.observe(opt.data);
        this._data = opt.data;
      }
      // 数据劫持
      observe(data) {
        let keys = Object.keys(data);

        keys.forEach(key => {
          let value = data[key];
          Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get() {
              console.log('get', key)
              return value;
            },
            set(newValue) {
              // 这里不使用 data[key] = newValue 是因为会触发 get 进入 循环中 o(╥﹏╥)o
              console.log('set', newValue)
              value = newValue;
            }
          })
        })
      }
    }

    const wang = new YunFei({
      el: '#app',
      data: {
        name: '开车'
      }
    })
```

![1](/assets/img/data-response/1.png)


### compile 编译

1. 获取 el下的所有dom
2. 通过 递归 遍历所有节点
3. 判断节点类型，更新节点的 attrib、与{{name}}d等
4. 依据上述的判断得到相应的节点，加以更新、替换


```js
 class YunFei {
      constructor(opt) {
        this.$options = opt;
        this.observe(opt.data);
        this._data = opt.data;
        this.compile();
      }
      // 数据劫持
      observe(data) {
        let keys = Object.keys(data);

        keys.forEach(key => {
          let value = data[key];
          Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get() {
              console.log('get', key)
              return value;
            },
            set(newValue) {
              // 这里不使用 data[key] = newValue 是因为会触发 get 进入 循环中 o(╥﹏╥)o
              console.log('set', newValue)
              value = newValue;
            }
          })
        })
      }

      // 编译
      compile() {
        let el = document.querySelector(this.$options.el);
        this.compileNodes(el);
      }

      compileNodes(el) {
        let childNodes = el.childNodes;
        childNodes.forEach(node => {
          // 元素
          if (node.nodeType === 1) {
            // 判断 attrs
            let attrs = node.attributes;
            [...attrs].forEach(attr => {
              let attrName = attr.name;
              let attrValue = attr.value;

              // v-model

              if (attrName == 'v-model') {
                node.value = this._data[attrValue]; // 赋值
                node.addEventListener("input", e => {
                  // console.log(e.target.value);
                  this._data[attrValue] = e.target.value;
                })

              }
            })

            // 元素节点
            if (node.childNodes.length > 0) {
              this.compileNodes(node);
            }
          } else if (node.nodeType === 3) {
            // 文本 元素
            let textContent = node.textContent;
            // 匹配 {{}}
            let reg = /\{\{\s*([^\{\}\s]+)\s*\}\}/g;
            if (reg.test(textContent)) {

              let $1 = RegExp.$1; // {{key}}

              // 更新
              node.textContent = node.textContent.replace(reg, this._data[$1])
            }
          }
        })
      }
    }

    const wang = new YunFei({
      el: '#app',
      data: {
        name: '开车'
      }
    })

```
![3](/assets/img/data-response/3.png)


#### 扩展节点类型 nodeType
![4](/assets/img/data-response/4.png)


### 响应式

observe --> compile 都已完成，接下来就是 实现 数据相应更新相应的 dom节点问题

首先我们要了解下`观察者`与`发布订阅`

#### 观察者模式

定义一个对象与其他对象之间的一种依赖关系，当对象发生某种变化的时候，依赖它的其它对象都会得到更新，一对多的关系。

举个栗子

EventTarget
```js
let EventObj = new EventTarget();
let yf = {
    run(){
        console.log('哎，生活啊')
    }
}
EventObj.addEventListener('run',yf.run);

EventObj.dispatchEvent(new CustomEvent('run'))

```
#### 发布订阅模式

**发布-订阅**是一种[消息](https://zh.wikipedia.org/wiki/消息)[范式](https://zh.wikipedia.org/wiki/范式)，消息的发送者（称为发布者）不会将消息**直接**发送给特定的接收者（称为订阅者）。而是将发布的消息分为不同的类别，无需了解哪些订阅者（如果有的话）可能存在。同样的，订阅者可以表达对一个或多个类别的兴趣，只接收感兴趣的消息，无需了解哪些发布者（如果有的话）存在。

再来个栗子

```js
// 收集
class Dep{
    constructor(){
        this.subs = []
    }
    addSub(sub){
        this.subs.push(sub)
    }
    notify(){
        this.subs.forEach(sub=>{
            sub.update();
        })
    }
}
// 订阅
class watcher{
    constructor(cb){
        this.cb = cb;
    }
    update(){
        this.cb();
    }
}



let dep = new Dep();

let yf = {
    add(){
        dep.addSub(new Watcher(()=>{
            console.log("hahaha");
        }))
    }
}
// 收集订阅者；
yf.add();


setTimeout(() => {
    // 触发
     dep.notify();
}, 1000);
```

#### 通过 EventTarget(观察者)实现

```js
<body>
  <div id="app">
    {{name}}
    <input type="text" v-model='name'>
  </div>
  <script>
    class YunFei extends EventTarget {
      constructor(opt) {
        super()
        this.$options = opt;
        this.observe(opt.data);
        this._data = opt.data;
        this.compile();
      }
      // 数据劫持
      observe(data) {
        let keys = Object.keys(data);
        let _this = this;

        keys.forEach(key => {
          let value = data[key];
          Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get() {
              console.log('get', key)
              return value;
            },
            set(newValue) {
              // 这里不使用 data[key] = newValue 是因为会触发 get 进入 循环中 o(╥﹏╥)o
              console.log('set', newValue)

              // 更新视图
              _this.dispatchEvent(new CustomEvent(key,{
                detail:newValue
              }))

              value = newValue;
            }
          })
        })
      }

      // 编译
      compile() {
        let el = document.querySelector(this.$options.el);
        this.compileNodes(el);
      }

      compileNodes(el) {
        let childNodes = el.childNodes;
        childNodes.forEach(node => {
          // 元素
          if (node.nodeType === 1) {
            // 判断 attrs
            let attrs = node.attributes;
            [...attrs].forEach(attr => {
              let attrName = attr.name;
              let attrValue = attr.value;

              // v-model

              if (attrName == 'v-model') {
                node.value = this._data[attrValue]; // 赋值
                node.addEventListener("input", e => {
                  // console.log(e.target.value);
                  this._data[attrValue] = e.target.value;
                })

              }
            })

            // 元素节点
            if (node.childNodes.length > 0) {
              this.compileNodes(node);
            }
          } else if (node.nodeType === 3) {
            // 文本 元素
            let textContent = node.textContent;
            // 匹配 {{}}
            let reg = /\{\{\s*([^\{\}\s]+)\s*\}\}/g;
            if (reg.test(textContent)) {

              let $1 = RegExp.$1; // {{key}}

              // 更新
              node.textContent = node.textContent.replace(reg, this._data[$1])
              // 注册
              this.addEventListener($1,(e)=>{
                  console.log("触发了set操作，视图更新",e);
                  let newValue = e.detail;
                  let oldValue  = this._data[$1];
                  node.textContent = node.textContent.replace(oldValue,newValue)
              })
            
            }
          }
        })
      }
    }

    const wang = new YunFei({
      el: '#app',
      data: {
        name: '开车'
      }
    })
  </script>
</body>
```

![5](/assets/img/data-response/5.png)


#### 通过 发布订阅 实现

1. 创建 发布订阅 Dep Watcher函数
2. Watcher 接受当前 监听对象、key与cb
3. 在compile阶段，创建订阅者 watcher；
4. 在onserve阶段 创建 dep 收集每个 key的订阅者；


```js
<body>
  <div id="app">
    {{name}}
    <input type="text" v-model='name'>
  </div>
  <script>
    class YunFei {
      constructor(opt) {
        this.$options = opt;
        this.observe(opt.data);
        this._data = opt.data;
        this.compile();
      }
      // 数据劫持
      observe(data) {
        let keys = Object.keys(data);
        let _this = this;

        keys.forEach(key => {
          let dep = new Dep();
          let value = data[key];
          Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get() {
              console.log('get', key)
              // 编译时 初始化 这里的控制 防止 创建多余的 watcher
              if (Dep.target) {
                dep.addSub(Dep.target)
              }

              return value;
            },
            set(newValue) {
              // 这里不使用 data[key] = newValue 是因为会触发 get 进入 循环中 o(╥﹏╥)o
              console.log('set', newValue)

              // 更新视图


              value = newValue;
            }
          })
        })
      }

      // 编译
      compile() {
        let el = document.querySelector(this.$options.el);
        this.compileNodes(el);
      }

      compileNodes(el) {
        let childNodes = el.childNodes;
        childNodes.forEach(node => {
          // 元素
          if (node.nodeType === 1) {
            // 判断 attrs
            let attrs = node.attributes;
            [...attrs].forEach(attr => {
              let attrName = attr.name;
              let attrValue = attr.value;

              // v-model

              if (attrName == 'v-model') {
                node.value = this._data[attrValue]; // 赋值
                node.addEventListener("input", e => {
                  // console.log(e.target.value);
                  this._data[attrValue] = e.target.value;
                })

              }
            })

            // 元素节点
            if (node.childNodes.length > 0) {
              this.compileNodes(node);
            }
          } else if (node.nodeType === 3) {
            // 文本 元素
            let textContent = node.textContent;
            // 匹配 {{}}
            let reg = /\{\{\s*([^\{\}\s]+)\s*\}\}/g;
            if (reg.test(textContent)) {

              let $1 = RegExp.$1; // {{key}}

              // 更新
              node.textContent = node.textContent.replace(reg, this._data[$1])
              // 注册
              // 1生成watcher 2触发watcher 收集（触发get）
              new Watcher(this._data, $1, (newValue) => {
                console.log("cb:", newValue);
                let oldValue = this._data[$1];
                node.textContent = node.textContent.replace(oldValue, newValue);
              })

            }
          }
        })
      }
    }
    // 收集器
    class Dep {
      constructor() {
        this.subs = [];
      }
      addSub(sub) {
        this.subs.push(sub);
      }
      notify(newValue) {
        this.subs.forEach(sub => {
          sub.update(newValue);
        })
      }
    }

    // 订阅者
    class Watcher {
      constructor(data, key, cb) {
        this.cb = cb;
        Dep.target = this;
        data[key]  //触发get  --->收集Watcher
        Dep.target = null;
      }
      update(newValue) {
        this.cb(newValue);
      }
    }


    const wang = new YunFei({
      el: '#app',
      data: {
        name: '开车'
      }
    })
  </script>
</body>
```

![5](/assets/img/data-response/5.png)
