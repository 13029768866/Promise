const MyPromise = require("./9、then-chain-method");

// 原生Promise
// !问题1、 promise === x
// const promise2 = new Promise((resolve, reject) => {
//   resolve();
// }).then(() => {
//   return promise2;
// });

// promise2.then(
//   () => {},
//   (err) => {
//     console.log("ERROR~~", err);
//   }
// );
// !问题2、 别人家的promise的then方法劫持
// let promsie = {};
// Object.defineProperty(promsie, "then", {
//   get() {
//     throw Error("别人家的Promise报错了~~");
//   },
// });

// MyPromise
// const myPromise2 = new MyPromise((resolve, reject) => {
//   resolve();
// }).then(() => {
//   return myPromise2;
// });

// myPromise2.then(
//   () => {},
//   (err) => {
//     console.log("ERROR~~", err);
//   }
// );
