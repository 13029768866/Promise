const MyPromise = require('./9、then-chain-method')

/* 异步promise测试 */
/*const myPromise = new MyPromise((resolve, reject) => {
  // resolve('ok');
  setTimeout(() => {
    resolve('ok');
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
})*/

/* then方法链式回调测试 */
const fs = require('fs');
const path = require('path');

/* node自带异步函数包装promisify */
const { promisify } = require('util');

/* 简易实现 */
//  function myPromisify (fn) {
//   return function (...args) {
//     let promise = new Promise((resolve, reject) => {
//       fn(...args, function (err, data) {
//         if(err) return reject(err);
//         resolve(data);
//       })
//     });
//     return promise;
//   }
// }
/*
let readFile = promisify(fs.readFile);
readFile(path.resolve(__dirname,'file/first.txt'),'utf8').then((data) => {
  return readFile(`file/${data}`, 'utf8')
}, err => {
  console.log(err)
}).then(data => {
  console.log('第二个then----',data)
},err => {
  console.log(err)
})
*/

/* then链测试*/
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok')
  },1000)
})

let promise2 =  promise.then((res) => {
  console.log(res)
  return res;
},(err) => {
  console.log(err)
  return err;
})
promise2.then((res) => {
  console.log('success---',res)
},(err) => {
  console.log('error---',err)
})
