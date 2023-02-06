/* 函数参数预置（闭包）*/
// 柯里化，偏函数
// 柯里化必须转成单参数传入sum(1)(2)(3)
// 偏函数sum(1,2)(3)
let utils = {};
function isType(type) {
  return function (val) {
    return Object.prototype.toString.call(val) === `[object ${type}]`;
  };
}

["Number", "Boolean", "String"].forEach((type) => {
  utils[`is${type}`] = isType(type);
});

// console.log(utils.isNumber(123));
// console.log(utils.isNumber("123"));

// ?实现curry进行参数分配传递
function sum(a, b, c) {
  return a + b + c;
}
function curry(fn) {
  const curried = (...args) => {
    if (args.length < fn.length) {
      return (...other) => curried(...args, ...other);
    }
    return fn(...args);
  };
  return curried;
}

const curriedSum = curry(sum);
// console.log(curriedSum(1)(2)(3)); // 6

// ?实现flow方法
function double(n) {
  return n * 2;
}
function toFixed(n) {
  return n.toFixed(2);
}
function addPrefix(n) {
  return `$${n}`;
}

function flowRight(...fns) {
  if (fns.length === 1) {
    return fns[0];
  }
  return fns.reduceRight(
    (a, b) =>
      (...args) =>
        b(a(...args))
  );
}

const compoesd = flowRight(addPrefix, toFixed, double);
const result = compoesd(10000);
console.log(result);
console.log(addPrefix(toFixed(double(10000))));
