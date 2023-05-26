import vnode from './vnode'

export default function (sel, data, c) {
  // 1. 判断是否传入三个参数
  if (!arguments.length === 3) {
    // 1.1 抛错
    throw new Error('必须传入三个参数，我是简化版的 h 函数')
  }

  // 2. 判断 c 的类型 ( 数组类型 or 字符串类型 or 对象类型)
  // 类型1: h('div', {}, 'hello')
  // 类型2: h('div', {}, [h('p', {}, '1'), h('p', {}, '2')])
  // 类型3: h('div', {}, h('p', {}, 'a'))

  // 2.1 字符串类型 (类型1: 表示此节点无子节点，且内容为文本类型)
  if (typeof c === 'string') {
    return vnode(sel, data, undefined, c, undefined)
  }

  // 2.2 数组类型 (类型2: 表示此节点存在一个或多个子节点)
  else if (c instanceof Array && c.length > 0) {
    const children = [] // 存储子节点的虚拟DOM
    // 2.2.1 遍历子节点
    for (const item of c) {
      // 2.2.2 判断子节点是否为虚拟DOM ( VNode )
      // 2.2.2.1 为虚拟DOM
      if (item.sel) {
        children.push(item)
      }
      // 2.2.2.2 不是虚拟DOM, 直接报错
      else {
        throw new Error(`${item} 不为一个虚拟DOM`)
      }
    }
    return vnode(sel, data, children, undefined, undefined)
  }

  // 2.3 对象类型 (类型3: 表示此节点存在一个子节点)
  else if (typeof c === 'object' && c.sel) {
    // 2.3.1 判断 c 是否为虚拟DOM
    // 2.3.1.1 不为虚拟DOM
    if (!c.sel) {
      throw new Error(`${c} 不符合虚拟DOM的规范`)
    }
    // 为虚拟DOM
    else {
      return vnode(sel, data, [c], undefined, undefined)
    }
  }
  // 2.4
  else {
    throw new Error(`${c} 传入参数错误`)
  }
}
