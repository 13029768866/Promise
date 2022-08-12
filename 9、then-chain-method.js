// 1、then链,then中成功和失败的回调函数返回一个promise。内部解析这个promise,向下传递。
// 2、下一次then的成功还是失败,取决于当前promise状态
// 3、如果前一个then的返回值不是promise, 这个结果会传递到下一个then的成功
// 4、如果成功/失败回调出现异常,则会执行下一个then的失败


const PENDDING = 'PENDDING';    // 等待态
const FULFILLED = 'FULFILLED';  // 成功态
const REJECTED = 'REJECTED';    // 拒绝态

/* 解析是否是promise */
// 为了所有人的promise可以互相调用，所有promise都要遵循这个规则
/**
 *
 * @param promise2 实例promise2
 * @param x        传入的返回值
 * @param resolve  成功回调
 * @param reject   失败回调
 */
function resolvePromise(promise2,x,resolve,reject) {
  console.log(promise2,x,resolve,reject)
}


class MyPromise {
  constructor (executor) {
    this.status = PENDDING;  // 状态默认等待态
    this.result = undefined; // 成功的结果
    this.reason = undefined; // 失败的原因

    this.onResolvedCallbacks = [];  // 成功回调队列
    this.onRejectefdCallbacks = []; // 失败回调队列

    /* 状态只能从PENDDING转变到成功/失败 */
    const resolve = (res) => {
      if(this.status === PENDDING){
        this.status = FULFILLED;
        this.result = res;
        this.onResolvedCallbacks.forEach(cb => cb());
      }
    }

    const reject = (reason) => {
      if(this.status === PENDDING){
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectefdCallbacks.forEach(cb => cb());
      }
    }



    /* 4、发生异常是走reject */
    try {
      executor(resolve, reject)
    }catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    /* new Promise是一个同步操作 */
    let promise2 = new Promise((resolve ,reject) => {
      if(this.status === PENDDING){
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try{
              let x =  onFulfilled(this.result)
              resolvePromise(promise2,x,resolve,reject)
            }catch (e) {
              reject(e)
            }
          })
        })
        this.onRejectefdCallbacks.push(() => {
          setTimeout(() => {
            try{
              let x = onRejected(this.reason)
              resolvePromise(promise2,x,resolve,reject)
            }catch (e) {
              reject(e)
            }
          })
        })
      }
      if(this.status === FULFILLED){
        setTimeout(() => {
          try{
            let x = onFulfilled(this.result)
            resolvePromise(promise2,x,resolve,reject)
          }catch (e) {
            reject(e)
          }
        })
      }
      if(this.status === REJECTED){
        setTimeout(() => {
          try{
            let x = onRejected(this.reason)
            resolvePromise(promise2,x,resolve,reject)
          }catch (e) {
            reject(e)
          }
        })

      }

    });
    return promise2;
  }
}


module.exports = MyPromise;