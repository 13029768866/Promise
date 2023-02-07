const fs = require("fs/promises");
const path = require("path");

Promise.all = function (handlers) {
  console.log("WZJ~~~");
  let resultArr = [];
  let times = handlers.length;
  return new Promise((resolve, reject) => {
    handlers.forEach((handler, idx) => {
      Promise.resolve(handler).then((data) => {
        resultArr[idx] = data;
        if (--times === 0) {
          resolve(resultArr);
        }
      }, reject);
    });
  });
};

Promise.all([
  fs.readFile(path.resolve(__dirname, "file/name.txt"), "utf8"),
  fs.readFile(path.resolve(__dirname, "file/age.txt"), "utf8"),
  123,
])
  .then((data) => {
    // 根据
    console.log(data);
  })
  .catch((err) => {
    console.log("err~", err);
  });
