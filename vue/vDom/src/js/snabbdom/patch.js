import vnode from './vnode'
import createElement from './createElement'
import patchVnode from './patchVnode'

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
    patchVnode(oldVnode, newVnode)
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
