/*  Promise 解决的问题是什么？ */
// 1、解决回调起来不好看(难以维护)
// 2、错误梳理无法统一，catch
// 3、简化回调,多个异步并发问题 (Promise.all, Promise.finllay)

/* Promise功能分析 */
// 1、promise是一个构造函数,默认需要传入一个executor执行器
// 2、executor会立刻执行,有 resolve, reject 两个参数
// 3、promise有三个状态, fulfilled 成功, reject 拒绝态, pendding 等待态(默认)
// 4、每一个promise都有一个then方法, 可以访问到成功的值和失败的原因
// 5、通过resolve,reject改变状态, pending只能改变一次状态
// 6、executor发生异常时候,直接走reject

/*const promise = new Promise((resolve, reject) => {
  console.log('executor');

  resolve('ok');
  reject('error');
})

promise.then((res) => {
  console.log('success----',res)
},(reason) => {
  console.log('reason----',reason)

})*/

const MyPromise = require('./8、promise-async')


const myPromise = new MyPromise((resolve, reject) => {
  // resolve('ok');

  setTimeout(() => {

    reject('error');
  },1000)

})
myPromise.then((res) => {
  console.log('success1----',res)
},(reason) => {
  console.log('reason1----',reason)
})

myPromise.then((res) => {
  console.log('success2----',res)
},(reason) => {
  console.log('reason2----',reason)
})