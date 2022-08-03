// 观察者模式
class Subject {   // 被观察者
  constructor (name) {
    this.name = name;
    this._watchers = [];
    this.state = '很开心';
  }
  attach(o) {   // 被观察者与观察者建立联系, 订阅
    this._watchers.push(o);
  }
  setState(newState) {
    this._watchers.forEach( watcher => {
      this.state = newState;
      watcher.update(this);
    })
  }

}

class Oberserver {   // 观察者
  constructor (name) {
    this.name = name;
  }
  update (baby) {
    console.log(`${baby.name}:${this.name}${baby.state}`)
  }
}

let baby = new Subject('宝宝');   // 被观察者

let dad = new Oberserver('爸爸'); // 观察者1
let mom = new Oberserver('妈妈'); // 观察者1

baby.attach(dad);
baby.attach(mom);

baby.setState('我被打了，5555！')



