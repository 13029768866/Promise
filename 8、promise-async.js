// 2、设置promise三种状态
const PENDDING = 'PENDDING';    // 等待态
const FULFILLED = 'FULFILLED';  // 成功态
const REJECTED = 'REJECTED';    // 拒绝态


class MyPromise {
  constructor (executor) {
     this.status = PENDDING;  // 状态默认等待态
     this.result = undefined; // 成功的结果
     this.reason = undefined; // 失败的原因

     this.onResolvedCallbacks = [];  // 成功回调队列
     this.onRejectefdCallbacks = []; // 失败回调队列

    /* 状态只能从PENDDING转变到成功/失败 */
    const resolve = (res) => {
      if(this.status === PENDDING) {
        this.status = FULFILLED;
        this.result = res;
        this.onResolvedCallbacks.forEach(cb => cb());
      }

    }

    const reject = (reason) => {
      if(this.status === PENDDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectefdCallbacks.forEach(cb => cb());
      }
    }



    /* 4、发生异常是走reject */
    try {
      // 1、默认传入executor执行器,执行器两个参数resolve,reject
      executor(resolve, reject)
    }catch (e) {
      reject(e);
    }
  }
  // 3、每一个promise都有一个then方法,可以访问到成功的结果/失败的原因
  then(onFulfilled, onRejected) {
    // 同步操作状态已经发生变化,异步操作状态才是等待态
    if(this.status === PENDDING){
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.result)
      })

      this.onRejectefdCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
    if(this.status === FULFILLED){
      onFulfilled(this.result)
    }
    if(this.status === REJECTED){
      onRejected(this.reason)
    }
  }
}


module.exports = MyPromise;