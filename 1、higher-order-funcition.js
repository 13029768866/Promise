/* 高阶函数 */
// 1、函数的返回值是一个函数
// 2、函数的参数是一个函数

function core(a, b, c) {
  console.log("核心代码", a, b, c);
}

// ?需求1：在不改变核心代码且执行之前,执行一个自定义before逻辑
Function.prototype.before = function (cb) {
  /* 箭头函数知识点 */
  // 1、箭头函数没有this
  // 2、箭头函数没有arguments
  // 3、箭头函数没有prototype
  return (...args) => {
    cb();
    this(...args);
  };
};

const newCore = core.before(function () {
  console.log("before逻辑执行~");
});
// newCore(1, 2, 3);

// ?需求2: 实现lodash的memoize方法
// 1、第一个参数必须是一个纯函数
// 2、第二个参数resolver指定缓存的key,默认第一个参数

function myMemoize(fn, resolver) {
  const cache = new Map();
  return function (...args) {
    const key = typeof resolver === "function" ? resolver(...args) : args[0];
    let result = cache.get(key);
    if (result === undefined) {
      result = fn(...args);
      cache.set(key, result);
    }
    return result;
  };
}

function exec(a, b) {
  console.log("执行~~~");
  return a + b;
}
const resolver = (...args) => {
  return JSON.stringify(args);
};
let myMemoizeTest = myMemoize(exec, resolver);
console.log(myMemoizeTest(1, 2));
console.log(myMemoizeTest(1, 2));
console.log(myMemoizeTest(2, 1));
