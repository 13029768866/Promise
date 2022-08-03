/* 函数参数预置（闭包）*/
// 闭包就是函数定义的作用域和执行的作用域不是同一个
// 基础闭包
function a(){
  return function () {}
}

let c = a();
c();


// 柯里化，偏函数
let utils = {};

function isType (type) {
  return function (val) {
    return Object.prototype.toString.call(val) === `[object ${type}]`
  }
}

['Number','Boolean','String'].forEach(type => {
  utils[`is${type}`] = isType(type);
})

console.log(utils.isNumber(123));