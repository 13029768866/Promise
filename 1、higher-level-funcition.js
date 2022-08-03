/* 高阶函数 */
// 1、函数的返回值是一个函数
// 2、函数的参数是一个函数

function core(a, b, c) {
  console.log('核心代码',a, b, c)
}

// 需求：在不改变核心代码且执行之前,执行一个自定义before逻辑

Function.prototype.before = function (cb) {
  /* 箭头函数知识点 */
  // 1、箭头函数没有this
  // 2、箭头函数没有arguments
  // 3、箭头函数没有prototype
  return (...args) => {
    cb();
    this(...args); /* core.before this指向core */
  }
}

const newCore = core.before( function () {
  console.log('before')
})

newCore(1,2,3);