## Promise

`Promise` 是 `JavaScript` 异步编程的一种解决方案

`Promise`底层是 `C语言` 实现的；依据其特性实现一个简易的 Promise

## step1

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
