/**
 * !总结
 * 1、promise.then中的方法返回一个promsie,自动解析返回的promise;
 * 2、then中方法返回的不是promise,且不抛出异常走到下一次then的成功;
 * 3、then中的方法抛出异常,会走到下一次then的失败
 */

// 2、设置promise三种状态
const PENDDING = "PENDDING"; // 等待态
const FULFILLED = "FULFILLED"; // 成功态
const REJECTED = "REJECTED"; // 拒绝态
/**
 *
 * @param {promise实例} promise2
 * @param {x是否是promise实例} x
 * @param {成功回调} resolve
 * @param {失败回调} reject
 */
function resolvePromise(promise2, x, resolve, reject) {
  // console.log(promise2, x, resolve, reject);
  // promise2不存在,异步解决
  if (promise2 === x) {
    return reject(new TypeError("循环引用"));
  }
  // x不是promise是普通值,直接resolve()
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    let called = false;
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          function (y) {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          function (r) {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}
class MyPromise {
  constructor(executor) {
    this.status = PENDDING; // 状态默认等待态
    this.result = undefined; // 成功的结果
    this.reason = undefined; // 失败的原因

    this.onResolvedCallbacks = []; // 成功回调队列
    this.onRejectefdCallbacks = []; // 失败回调队列

    /* 状态只能从PENDDING转变到成功/失败 */
    const resolve = (res) => {
      if (this.status === PENDDING) {
        this.status = FULFILLED;
        this.result = res;
        this.onResolvedCallbacks.forEach((cb) => cb());
      }
    };

    const reject = (reason) => {
      if (this.status === PENDDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectefdCallbacks.forEach((cb) => cb());
      }
    };

    /* 4、发生异常是走reject */
    try {
      // 1、默认传入executor执行器,执行器两个参数resolve,reject
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  // 3、每一个promise都有一个then方法,可以访问到成功的结果/失败的原因
  then(onFulfilled, onRejected) {
    // then的穿透
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    // 同步操作状态已经发生变化,异步操作状态才是等待态
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        process.nextTick(() => {
          try {
            let x = onFulfilled(this.result);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.status === REJECTED) {
        process.nextTick(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.status === PENDDING) {
        this.onResolvedCallbacks.push(() => {
          process.nextTick(() => {
            try {
              let x = onFulfilled(this.result);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
        this.onRejectefdCallbacks.push(() => {
          process.nextTick(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });
    return promise2;
  }
}

// 测试Promise是否符合A+规范
Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = MyPromise;
