/**
 * Promise:
 * 1、解决异步
 * 2、支持多并发的请求执行后，统一执行回调函数
 * 3、解决回调深渊
 * 
 * 状态：pending,fulfiled,rejected
 */
class yunfei {
    constructor(executor) {
      //默认状态是等待状态
      this.status = 'pending';
      this.value = undefined;
      this.reason = undefined;
      //存放成功的回调
      this.onResolvedCallbacks = [];
      //存放失败的回调
      this.onRejectedCallbacks = [];
      let resolve = (data) => {
        console.log('res')
        if (this.status === 'pending') {
          this.value = data;
          this.status = 'resolved';
          this.onResolvedCallbacks.forEach(fn => fn());
        }
      }
      let reject = (reson) => {
        if (this.status === 'pending') {
          this.reason = reson;
          this.status = 'rejected';
          this.onRejectedCallbacks.forEach(fn => fn());
        }
      }
      try {
        executor(resolve, reject);
      } catch (err) {
        reject(err);
      }
    }
    //链式回调
    then(onFulFilled, onRejected) {
      console.log('then')
      if (this.status === 'resolved') {
        //成功状态的回调
        onFulFilled(this.value);
      }
      if (this.status === 'rejected') {
        //失败状态的回调
        onRejected(this.reason);
      }
      // 当前既没有完成 也没有失败
      if (this.status === 'pending') {
        // 存放成功的回调
        this.onResolvedCallbacks.push(() => {
          onFulFilled(this.value);
        });
        // 存放失败的回调
        this.onRejectedCallbacks.push(() => {
          onRejected(this.reason);
        });
      }
    }
  }
  new yunfe((res) => res(1)).then((data) => { console.log(data) }, (err) => { })