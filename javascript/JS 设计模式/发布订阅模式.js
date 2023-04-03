const fs = require('fs')
const path = require('path')


// 定义发布订阅
const events = {
    _obj: {},
    _arr: [],   // 订阅中心, 将所有的事,都订阅到数组中
    on(fn) {
        this._arr.push(fn)
    },
    emit(k, v) {   // 事情发生后, 来依次触发回调
        this._obj[k] = v

        this._arr.forEach(bc => {
            bc(this._obj)
        })
    }
}

events.on(() => {
    console.log('某个已经读取完毕')
})

events.on((data) => {
    if (Reflect.ownKeys(data).length === 2) {
        console.log('全部读取完毕', data);
    }
})


fs.readFile(path.resolve(__dirname, 'a.txt'), 'utf-8', function (err, data) {
    events.emit('msg', data)
})
fs.readFile(path.resolve(__dirname, 'b.txt'), 'utf-8', function (err, data) {
    events.emit('age', data)
})
