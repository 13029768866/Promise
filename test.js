const MyPromise = require("./review");
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject("负债");
  }, 1000);
});

promise.then(
  (val) => {
    console.log("成功", val);
  },
  (resson) => {
    console.log("失败", resson);
  }
);

// promise.then(
//   (val) => {
//     console.log("成功", val);
//   },
//   (resson) => {
//     console.log("失败", resson);
//   }
// );
