// 文件读取
const fs = require('fs');
const path = require('path');

function after(times, cb) {
  let obj = {};
  return function (key, value) {
    obj[key] = value;
    if(--times === 0) {
      cb(obj);
    }
  }
}

const cb = after(2,(data) => {
  console.log(data)
})

fs.readFile(path.resolve(__dirname,'file/name.txt'),'utf-8',function (err,data) {
  cb('name', data)
})

fs.readFile(path.resolve(__dirname,'file/age.txt'),'utf-8',function (err,data) {
  cb('age', data)
})
