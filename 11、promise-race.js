const fs = require("fs/promises");
const path = require("path");

Promise.race = function (handlers) {
  console.log("WZJ~~~");

  return new Promise((resolve, reject) => {
    handlers.forEach((handler) => {
      Promise.resolve(handler).then(resolve, reject);
    });
  });
};

Promise.race([
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

// !处理超时时间
