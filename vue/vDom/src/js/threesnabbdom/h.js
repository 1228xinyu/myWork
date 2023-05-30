import vnode from './vnode'

// 创建虚拟 DOM
/* 
 1) h('li', {}, 'c')
 2) h('li', {}, [ h('p', {}, 'p'), h('p', {}, 'p') ])
 3) h('li', {}, h('p', {}, 'p'))
*/
export default function h(sel, data, c) {
  // 判断参数是否为 三个
  if(arguments.length !== 3) {
    throw new Error('参数必须为3个')
  }

  // 判断 c 的类型
  // 1) 字符串类型 文本
  if(typeof c === 'string' && c !== '') {
    return vnode(sel, data, undefined, c, undefined)
  }
  // 2) 数组类型  存在子节点
  else if (Array.isArray(c) && c.length > 0) {
    const children = []
    // 循环遍历 c
    for (const item of c) {
       children.push(item)
    }
    return vnode(sel, data, children, undefined, undefined)
  }
  // 3) 对象类型, 一个子节点
  else if(typeof c === 'object' && c !== undefined) {
    return vnode(sel, data, c, undefined, undefined)
  }

  else {
    throw new Error(`${c} 参数类型错误`)
  }
}
