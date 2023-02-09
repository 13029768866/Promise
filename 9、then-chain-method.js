// 2、设置promise三种状态
const PENDDING = "PENDDING"; // 等待态
const FULFILLED = "FULFILLED"; // 成功态
const REJECTED = "REJECTED"; // 拒绝态

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("循环引用!"));
  }

  // 对象或者函数才能是Promise
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    let called = false;
    try {
      const then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 普通值直接走成功
    resolve(x);
  }
}
class Promise {
  constructor(executor) {
    this.status = PENDDING; // 状态默认等待态
    this.value = undefined; // 成功的结果
    this.reason = undefined; // 失败的原因

    this.onFulfilledCallbacks = []; // 成功操作回调
    this.onRejectedCallbacks = []; // 失败操作回调

    /* 状态只能从PENDDING转变到成功/失败 */
    const resolve = (res) => {
      if (this.status === PENDDING) {
        this.value = res;
        this.status = FULFILLED;
        this.onFulfilledCallbacks.forEach((cb) => cb());
      }
    };
    const reject = (reason) => {
      if (this.status === PENDDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallbacks.forEach((cb) => cb());
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
    // then的穿透,让他传递到下一个then
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (y) => y;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };

    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        process.nextTick(() => {
          try {
            let x = onFulfilled(this.value);
            // 通过x的返回值确定当前Promise走成功还是失败
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
        this.onFulfilledCallbacks.push(() => {
          process.nextTick(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
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
Promise.deferred = function () {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
};
module.exports = Promise;
