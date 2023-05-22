import vnode from './vnode'

// 编写一个低配版的 h 函数，这个函数必须接收 3 个参数，缺一不可
// h 函数最终都会返回一个对象
// 也就是说，调用的时候形态必须是下面的三种之一
// 形态一: h('p', {}, '文本')
// 形态二: h('p', {}, [])
// 形态三: h('p', {}, h())
export default function (sel, data, c) {
  // 检查参数的个数
  if (arguments.length !== 3) throw new Error('必须传入 3 个参数')

  // 判断 c 即 children 的类型
  // 字符串或数字型 ( 形态一 )
  if (typeof c === 'string' || typeof c === 'number') {
    return vnode(sel, data, undefined, c, undefined)
  }
  // 数组类型 ( 形态二 )
  else if (Array.isArray(c)) {
    const children = []
    // 遍历 c
    for (const i of c) {
      if (!(typeof i === 'object' && i.hasOwnProperty('sel'))) {
        throw new Error('传入数组的参数中有项不是 h 函数')
      }

      children.push(i)
    }
    return vnode(sel, data, children, undefined, undefined)
  }
  // 对象类型 ( 形态三 )
  else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    const children = []

    children.push(c)

    return vnode(sel, data, children, undefined, undefined)
  }

  // 否则报错
  else {
    throw new Error('传入的参数不对')
  }
}
