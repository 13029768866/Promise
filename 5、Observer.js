// 观察者模式
class Subject {   // 被观察者
  constructor (name) {
    this.name = name;
    this._watchers = [];
    this.state = '开心！'
  }
  attach(o) {
    this._watchers.push(o);
  }
  setState(newState) {
    this.state = newState;
    this._watchers.forEach(watch => watch.update(this))
  }


}

class Oberserver {   // 观察者
  constructor (name) {
    this.name = name;
  }
  update(baby) {
    console.log(`${baby.name}:${this.name}${baby.state}`)
  }
}

let baby = new Subject('宝宝');   // 被观察者

let dad = new Oberserver('爸爸'); // 观察者1
let mom = new Oberserver('妈妈'); // 观察者1

baby.attach(dad);
baby.attach(mom);

baby.setState('我被打了，5555！')



