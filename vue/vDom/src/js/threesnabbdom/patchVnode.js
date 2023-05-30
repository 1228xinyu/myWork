import createElement from './createElement'
import updateChildren from './updateChildren'

// 对新旧虚拟DOM 进行 精细化比较
export default function patchVnode(oldVnode, newVnode) {
  // 将 newVnode 包装成 真实DOM
  const newVnodeDOM = createElement(newVnode)

  // 1) 判断 oldVnode 与 newVnode 是否为 同一对象
  if (oldVnode === newVnode) return

  // 2) 判断 newVnode 是否存在文本节点
  if (newVnode.text && (!newVnode.children || newVnode.children.length === 0)) {
    // 判断 newVnode 的文本节点与 oldVnode 的文本节点是否相同
    if (newVnode.text === oldVnode.text) return
    else {
      // 移除 oldVnode 中的所有文本或者子节点，将 newVnode 插入
      oldVnode.elm.parentNode.insertBefore(newVnodeDOM, oldVnode.elm)
      oldVnode.elm.remove()
      return
    }
  }

  // 3) 判断 oldVnode 是否存在子节点
  if (oldVnode.children && oldVnode.children.length > 0) {
    // 更加精细化比较
    updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    return
  }

  // oldVnode 为文本节点
  else {
    // 将 newVnode 的子节点，直接替换掉 oldVnode 的文本
    oldVnode.elm.innerText = ''

    for (const item of newVnode.children) {
      oldVnode.elm.appendChild(item.elm)
    }
  }
}
