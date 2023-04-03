// 被观察者
class Subject {
    #_arr = []  // 订阅中心
    constructor(name) {
        this.name = name
        this.state = '开心'
    }

    attach(o) {
        this.#_arr.push(o)
    }

    setState(nv) {  // 数据发生改变, 发布给 观察者
        this.state = nv
        this.#_arr.forEach(v => {
            v.update(this)
        })
    }
}

// 观察者
class Observer {
    constructor(name) {
        this.name = name
    }

    update(s) {  // 监听到了 宝宝 的状态发生改变, (vue 更新视图)
        console.log(`${this.name} 发现了 ${s.name}的状态是${s.state}`);
    }
}

const o1 = new Observer('爸爸')  // 观察者 1
const o2 = new Observer('妈妈')  // 观察者 2
const s = new Subject('宝宝')    // 被观察者
s.attach(o1)  // 发布
s.attach(o2)  // 发布

s.setState('难过')
