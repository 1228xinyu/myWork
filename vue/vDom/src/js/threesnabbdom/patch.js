import vnode from './vnode'
import samenode from './samenode'
import createElement from './createElement'
import patchVnode from './patchVnode'

export default function patch(oldVnode, newVnode) {
  // 1) 判断 oldVnode 是否为 虚拟DOM, 包装成虚拟DOM
  if (!oldVnode.sel || !oldVnode.data) {
   oldVnode =  vnode(oldVnode.tagName.toLowerCase(), {}, undefined, undefined, oldVnode)
  }

  // 2) 判断 oldVnode 与 newVnode 是否处于同一节点
  if (samenode(oldVnode, newVnode)) {
    // 精细化比较
    patchVnode(oldVnode, newVnode)
  }
  // 暴力删除旧节点，将新节点插入
  else {
    const dom = createElement(newVnode)
    oldVnode.elm.parentNode.insertBefore(dom, oldVnode.elm)
    oldVnode.elm.remove()
  }
}
