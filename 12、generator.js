// generator是一个特殊的函数,可以暂停,也可以继续执行
// 必须有一个方法next

function* read() {
  yield " vue";
  yield "react";
  return "node";
}

let result = read();
// console.log(result.next()); // {value: 'vue', done: false }
// console.log(result.next()); // {value: 'react', done: false }
// console.log(result.next()); // {value: 'node', done: true }
// console.log(result.next()); // {value: undefined, done: false }

let set = new Set([1, 2, 3]);
console.log([...set][0]);
console.log(set.values().next());
