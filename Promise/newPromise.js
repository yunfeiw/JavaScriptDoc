const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
    constructor(handle) {
        if (isFunction(handle)) {
            throw new Error('MyPromise must accept a function as a parameter')
        }
        //添加状态
        this._status = PENDING;
        //值
        this._value = undefined;
        // 添加成功回调函数队列
        this._fulfilledQueues = [];
        // 添加失败回调函数队列
        this._rejectedQueues = [];
        //执行handle
        try {
            handle(this._resolve.bind(this), this._reject.bind(this))
        } catch{
            this._reject(err);
        }
    }
    //添加resolve时执行的函数
    _resolve (val) {
        if (this._status !== PENDING) return
        // 依次执行成功队列中的函数，并清空队列
        const run = () => {
          this._status = FULFILLED
          this._value = val
          let cb;
          while (cb = this._fulfilledQueues.shift()) {
            cb(val)
          }
        }
        // 为了支持同步的Promise，这里采用异步调用
        setTimeout(() => run(), 0)
      }
      // 添加reject时执行的函数
      _reject (err) { 
        if (this._status !== PENDING) return
        // 依次执行失败队列中的函数，并清空队列
        const run = () => {
          this._status = REJECTED
          this._value = err
          let cb;
          while (cb = this._rejectedQueues.shift()) {
            cb(err)
          }
        }
        // 为了支持同步的Promise，这里采用异步调用
        setTimeout(run, 0)
      }
     
    //回调
    then(onFulfilled, onRejected) {
        const { _value, _status } = this;
        switch (_status) {
            case PENDING:
                this._fulfilledQueues.push(onFulfilled);
                this._rejectedQueues.push(onRejected);
                break
            //当状态已经改变时，立即执行对应的回调函数
            case FULFILLED:
                onFulfilled(_value)
                break
            case REJECTED:
                onRejected(_value)
                break
        }
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
        }) 
    }
}