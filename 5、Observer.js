// 观察者模式
class Subject {
  // 被观察者
  constructor(name) {
    this.name = name;
    this.wathers = []; // 观察者列表
    this.state = "开心";
  }
  attach(o) {
    // 与观察者建立联系
    this.wathers.push(o);
  }
  setState(newState) {
    this.state = newState;
    this.wathers.forEach((o) => o.update(this));
  }
}

class Oberserver {
  // 观察者
  constructor(name) {
    this.name = name;
  }
  update(baby) {
    console.log(`${baby.name}:${this.name}${baby.state}`);
  }
}

let baby = new Subject("宝宝"); // 被观察者

let dad = new Oberserver("爸爸"); // 观察者1
let mom = new Oberserver("妈妈"); // 观察者1

baby.attach(dad);
baby.attach(mom);

baby.setState("我被打了，5555！");
