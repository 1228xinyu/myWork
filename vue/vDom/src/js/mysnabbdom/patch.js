import vnode from './vnode'
import createElement from './createElement'

export default function (oldVnode, newVnode) {
  // 1. 判断 oldVnode 为 虚拟节点 还是 DOM节点
  // 1.1 为DOM节点 ( 将 DOM节点 包装成虚拟节点 )
  if (!oldVnode.sel) {
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, undefined, undefined, oldVnode)
  }

  // 判断 oldVnode.elm 与 newVnode.elm 是否存在
  if (!oldVnode.elm) createElement(oldVnode)
  if (!newVnode.elm) createElement(newVnode)

  // 2. 判断 oldVnode 与 newVnode 是否处于同一节点 ( key 相同, sel 相同 )
  // 2.1 处于同一节点 ( 进行精细化比较 )
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    // 精细化比较
    // 1) 判断 oldVnode 和 newVnode 是否为同一个对象
    if (oldVnode === newVnode) return

    // 2) 判断 newVnode 是否有 text 文本
    if (newVnode.text && (!newVnode.children || newVnode.children.length === 0)) {
      // 2.1) 判断 newVnode 与 oldVnode 的 text 文本是否相同
      // 相同，什么都不做
      if (newVnode === oldVnode) return
      // 不同，删除 oldVnode 的子节点或文本，将 newVnode 的 text 文本插入
      oldVnode.elm.innerText = newVnode.text
    }

    // 3) 判断 oldVnode 是否有 children 子节点
    // 有 children 子节点，无 text 文本
    if (oldVnode.children && oldVnode.children.length > 0) {
    }
    // 无 children 子节点, 存在 text 文本
    else {
      // 3.2) 删除 oldVnode 的文本，将 newVnode 的 children 子节点插入 oldVnode.elm 中
      oldVnode.elm.innerText = ''
      for (const item of newVnode.children) {
        const dom = createElement(item)
        oldVnode.elm.appendChild(dom)
      }
    }
  }
  // 2.2 不处于同一节点 ( 暴力删除旧节点,插入新节点newVnode )
  else {
    // 2.2.1 先将 newVnode 转化为 真实DOM
    const dom = createElement(newVnode)
    // 2.2.2 将 真实DOM 插入到 oldVnode 之前
    oldVnode.elm.parentNode.insertBefore(dom, oldVnode.elm)
    // 2.2.3 将旧节点删除
    oldVnode.elm.remove()
  }
}
