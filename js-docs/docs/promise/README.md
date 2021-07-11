## Promise

`Promise` 是 `JavaScript` 异步编程的一种解决方案

`Promise`底层是 `C语言` 实现的；依据其特性实现一个简易的 Promise

## init

Promise 有三种状态 [[PromiseState]]

- pending 挂起
- fulfilled 成功（完成）
- rejected 失败（拒绝）

Promise 的结果值存储在字段 [[PromiseResult]]中，初始值为 undefined;

![状态](/assets/img/promise/state.png)

通过这些可以实现 Promise 的初始状态

```js
class YfPromise {
  constructor() {
    this["[[PromiseState]]"] = "pending";
    this["[[PromiseResult]]"] = undefined;
  }
}
```

### 实现 result 与 reject

```js
const example = new Promise((result, reject) => {
  result(1); // reject(2)
});
```

Promise 的参数是一个 Function;该 Function 返回两个方法

- result 完成函数 参数 promise 的值
- reject 拒绝函数 参数 promise 的值

```js
class YfPromise {
  constructor(handle) {
    this["[[PromiseState]]"] = "pending";
    this["[[PromiseResult]]"] = undefined;

    // 执行函数 handle
    handle(this.#resolve.bind(this), this.#reject.bind(this));
  }

  #resolve(val) {
    this["[[PromiseState]]"] = "fulfilled";
    this["[[PromiseResult]]"] = val;
  }
  #reject(err) {
    this["[[PromiseState]]"] = "rejected";
    this["[[PromiseResult]]"] = err;
  }
}
```

### then

```js
const example = new Promise((res, rej) => {
  res(1);
}).then(
  (val) => {
    console.success(val);
  },
  (val) => {
    console.error(val);
  }
);
```

通过示例可知 then 函数接受参数为 Function，Function 的参数是 result 和 reject 的结果值

result 与 reject 的执行是 依据 `[[PromiseState]]`来进行的。(_^▽^_)

```js
class YfPromise {
  constructor(handle) {
    this["[[PromiseState]]"] = "pending";
    this["[[PromiseResult]]"] = undefined;

    // 执行函数 handle
    handle(this.#resolve.bind(this), this.#reject.bind(this));
  }

  #resolve(val) {
    this["[[PromiseState]]"] = "fulfilled";
    this["[[PromiseResult]]"] = val;
  }

  #reject(err) {
    this["[[PromiseState]]"] = "rejected";
    this["[[PromiseResult]]"] = err;
  }

  then(onResolved, onRejected) {
    // 判断下当前状态
    if (this["[[PromiseState]]"] === "fulfilled") {
      onResolved(this["[[PromiseResult]]"]);
    } else {
      onRejected(this["[[PromiseResult]]"]);
    }
  }
}
```

到这里我们实现了简单 yfPromise

```js
const wang = new YfPromise((res) => {
  res("yunfei");
}).then((res) => {
  console.log(res);
});

// yunfei
```

### 多个 then

支持注册多个 then 方法，为确保 then 的正常运行，将其存储到一个`任务对列`中去；

```js
class YfPromise {
  constructor(handle) {
    this["[[PromiseState]]"] = "pending";
    this["[[PromiseResult]]"] = undefined;

    // then任务对列
    this.resolveQueue = [];
    this.rejectQueue = [];

    // 执行函数 handle
    handle(this.#resolve.bind(this), this.#reject.bind(this));
  }

  #resolve(val) {
    this["[[PromiseState]]"] = "fulfilled";
    this["[[PromiseResult]]"] = val;

    // 执行的位置 迁移到 这里
    const run = () => {
      let cb;
      while ((cb = this.resolveQueue.shift())) {
        cb && cb(val);
      }
    };
    setTimeout(run);
  }

  #reject(err) {
    this["[[PromiseState]]"] = "rejected";
    this["[[PromiseResult]]"] = err;

    // 执行的位置 迁移到 这里
    const run = () => {
      // this.rejectFn(err);
      let cb;
      while ((cb = this.rejectQueue.shift())) {
        cb && cb(err);
      }
    };
    setTimeout(run);
  }

  then(onResolved, onRejected) {
    //   返回一个 YfPromise 来支持 then
    return new YfPromise((reslove, reject) => {
      // 封装 onResolved onRejected

      // 成功
      let resolveFn = (val) => {
        let res = onResolved && onResolved(val);
        reslove(res); // 返回用于下一个then使用
      };
      this.resolveQueue.push(resolveFn);
      // 失败
      let rejectFn = (err) => {
        onRejected && onRejected(val);
        reject(err); // 返回用于下一个then使用
      };
      this.rejectQueue.push(resolveFn);
    });
  }
}

// 使用
const wang = new YfPromise((res) => {
  setTimeout(() => {
    res("yunfei");
  }, 2000);
})
  .then((res) => {
    console.log(res);
    return "wang";
  })
  .then((res) => {
    console.log(res);
  });

//   2s后 yunfei wang 
```

## 宏观任务与微观任务

> 这里要要注意 then、catch等方法是 微观任务

通过 `MutaionObserver`  接口监视对DOM树所做更改的能力，来是实现`run`的执行

```js
class YfPromise {
  constructor(handle) {
    this["[[PromiseState]]"] = "pending";
    this["[[PromiseResult]]"] = undefined;

    // then任务对列
    this.resolveQueue = [];
    this.rejectQueue = [];

    // 执行函数 handle
    handle(this.#resolve.bind(this), this.#reject.bind(this));
  }

  #resolve(val) {
    this["[[PromiseState]]"] = "fulfilled";
    this["[[PromiseResult]]"] = val;

    // 执行的位置 迁移到 这里
    const run = () => {
      let cb;
      while ((cb = this.resolveQueue.shift())) {
        cb && cb(val);
      }
    };
    let ob = new MutationObserver(run);
    ob.observe(document.body, {
        attributes: true
    })
    document.body.setAttribute("kkb", "value");
  }

  #reject(err) {
    this["[[PromiseState]]"] = "rejected";
    this["[[PromiseResult]]"] = err;

    // 执行的位置 迁移到 这里
    const run = () => {
      // this.rejectFn(err);
      let cb;
      while ((cb = this.rejectQueue.shift())) {
        cb && cb(err);
      }
    };
   let ob = new MutationObserver(run);
    ob.observe(document.body, {
        attributes: true
    })
    document.body.setAttribute("kkb", "value");
  }

  then(onResolved, onRejected) {
    //   返回一个 YfPromise 来支持 then
    return new YfPromise((reslove, reject) => {
      // 封装 onResolved onRejected

      // 成功
      let resolveFn = (val) => {
        let res = onResolved && onResolved(val);
        reslove(res); // 返回用于下一个then使用
      };
      this.resolveQueue.push(resolveFn);
      // 失败
      let rejectFn = (err) => {
        onRejected && onRejected(val);
        reject(err); // 返回用于下一个then使用
      };
      this.rejectQueue.push(resolveFn);
    });
  }
}

// 使用
const wang = new YfPromise((res) => {
  setTimeout(() => {
    res("yunfei");
  }, 2000);
})
  .then((res) => {
    console.log(res);
    return "wang";
  })
  .then((res) => {
    console.log(res);
  });
```

## resolve reject

resolve、reject都是静态方法，并且接收参数，调用then中的回调函数，其参数便是返回值

```js

class YfPromise {
  constructor(handle) {
    this["[[PromiseState]]"] = "pending";
    this["[[PromiseResult]]"] = undefined;

    // then任务对列
    this.resolveQueue = [];
    this.rejectQueue = [];

    // 执行函数 handle
    handle(this.#resolve.bind(this), this.#reject.bind(this));
  }

  #resolve(val) {
    this["[[PromiseState]]"] = "fulfilled";
    this["[[PromiseResult]]"] = val;

    // 执行的位置 迁移到 这里
    const run = () => {
      let cb;
      while ((cb = this.resolveQueue.shift())) {
        cb && cb(val);
      }
    };
    let ob = new MutationObserver(run);
    ob.observe(document.body, {
        attributes: true
    })
    document.body.setAttribute("kkb", "value");
  }

  #reject(err) {
    this["[[PromiseState]]"] = "rejected";
    this["[[PromiseResult]]"] = err;

    // 执行的位置 迁移到 这里
    const run = () => {
      // this.rejectFn(err);
      let cb;
      while ((cb = this.rejectQueue.shift())) {
        cb && cb(err);
      }
    };
   let ob = new MutationObserver(run);
    ob.observe(document.body, {
        attributes: true
    })
    document.body.setAttribute("kkb", "value");
  }

  then(onResolved, onRejected) {
    //   返回一个 YfPromise 来支持 then
    return new YfPromise((reslove, reject) => {
      // 封装 onResolved onRejected

      // 成功
      let resolveFn = (val) => {
        let res = onResolved && onResolved(val);
        reslove(res); // 返回用于下一个then使用
      };
      this.resolveQueue.push(resolveFn);
      // 失败
      let rejectFn = (err) => {
        onRejected && onRejected(val);
        reject(err); // 返回用于下一个then使用
      };
      this.rejectQueue.push(resolveFn);
    });
  }
  static resolve(val){
    return new YfPromise(resolve=>{
      resolve(val)
    })
  }
  static reject(err){
    return new YfPromise((resolve,reject)=>{
      reject(err)
    })
  }
}

// 使用

YfPromise.resolve(1).then(res=>{
  console.log(res)
})
```


## race

就收一个数组，返回第一个完成的Promise结果

```js

class YfPromise{
  ...
  race(lists){
    return new YfPromise((resolve,reject)=>{
      lists.forEach(item=>{
        item.then(res=>{
          resolve(res)
        },err=>{
          reject(err)
        })
      })
    })
  }
  ...
}
```

## all

接收一个数组，数组中的item全部执行完成后，返回一个结果数组；注意其中任何一个item reject都会到all 结束

```js
class YfPromise(){
  ....

  static all(lists){
    let resArr = new Array(lists.length);
    let num = 0;
    return new YfPromise(resolve=>{
      list.forEach((item,key)=>{
        let obj = {};
        item.then(res=>{
          obj['status'] = 'fulfilled';
          obj['value'] = res;

          resArr[key]= obj;

          num ++;
          //程序运行结束
          if(num>=lists.length){
            resolve(resArr)
          }
        },err=>{
            obj['status'] = "rejected";
            obj['reason'] = err;
            resArr[key] = obj;

            num++;
          //程序运行结束
            if(num>=lists.length){
                resolve(resArr);
              }
        })
      })
    })
  }

  ....
}

```
## catch
catch() 方法返回一个Promise (en-US)，并且处理拒绝的情况

实现起来就更简单了

···js
catch(cb){
  this.then(undefined,cb)
}
```