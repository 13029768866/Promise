// 发布订阅
const fs = require('fs');
const path = require('path');

const mitt = {
  _obj: {}, // 存储文件数据
  _quene: [], // 订阅中心,存储所有订阅操作
  on (callback) {
    this._quene.push(callback);
  },
  emit (key, val) {
    this._obj[key] = val;
    // 订阅操作依次执行
    this._quene.forEach(cb => cb(this._obj))
  }
}

mitt.on(() => {
  console.log('文件数据读取完毕')
})

mitt.on((data) => {
  if(Reflect.ownKeys(data).length === 2){
    console.log('全部数据读取完毕', data)
  }
})

fs.readFile(path.resolve(__dirname,'file/name.txt'),'utf-8',function (err,data) {
  mitt.emit('name', data)
})

fs.readFile(path.resolve(__dirname,'file/age.txt'),'utf-8',function (err,data) {
  mitt.emit('age', data)
})
