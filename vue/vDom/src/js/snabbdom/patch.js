import vnode from './vnode'
import createElement from './createElement'

export default function (oldVnode, newVnode) {
  // 1 判断 oldVnode 是否为 虚拟节点
  // 1.1 为 DOM 节点
  if (!oldVnode.sel) {
    // 1.2 包装成虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }

  // 1.2 判断 oldVnode 与 newVnode 的 elm 是否存在
  if (!oldVnode.elm) createElement(oldVnode)
  if (!newVnode.elm) createElement(newVnode)

  // 2 判断 oldVnode 与 newVnode 是否为同一个节点
  // 2.1 为同一节点 ()
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    // 进行精细化比较
    // 1) 判断 oldVnode 和 newVnode 是否为同一个对象 ( 相同什么都不做 )
    if (oldVnode === newVnode) return

    // 2) 判断 newVnode 是否存在 text 文本
    // 2.1) 存在 text 文本
    if (newVnode.text && (!newVnode.children || newVnode.children.length === 0)) {
      // 判断 newVnode 与 oldVnode 文本是否相同
      // 2.1.1) 文本相同，什么也不做
      if (newVnode.text === oldVnode.text) return
      // 2.1.2) 文本不相同，删除旧文本，即使 oldVnode 存在 children 子节点，也无关紧要，会一起消失
      oldVnode.elm.innerText = newVnode.text
    }
    // 2.2) 不存在 text 文本，存在 children 子节点
    else {
      // 判断 oldVnode 是否存在 children 子节点
      // 2.2.1) oldVnode 存在 children 子节点
      if (oldVnode.children && oldVnode.children.length > 0) {
      }
      // 2.2.2) oldVnode 不存在 children 子节点，存在 text 文本
      else {
        // 清空 oldVnode 中的文本
        oldVnode.elm.innerText = ''
        // 将 newVnode 的 children 添加到 DOM 中
        for (const item of newVnode.children) {
          const dom = createElement(item)
          oldVnode.elm.appendChild(dom)
        }
      }
    }
  }

  // 2.2 不为同一节点
  else {
    // 2.2.1  将 newVnode 插入
    const dom = createElement(newVnode)
    oldVnode.elm.parentNode.insertBefore(dom, oldVnode.elm)
    // 暴力删除 oldVnode
    oldVnode.elm.remove()
  }
}
