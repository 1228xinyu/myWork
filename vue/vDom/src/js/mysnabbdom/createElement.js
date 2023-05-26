// createElement作用: 将 虚拟DOM 转化为 真实DOM
export default function createElement(vnode) {
  // 1. 创建一个 真实DOM
  const domNode = document.createElement(vnode.sel)

  // 2. 判断 vnode 是否存在子节点, 还是纯文本
  // 2.1 vnode 无子节点, 为纯文本
  if (vnode.text && (!vnode.children || !vnode.children.length)) {
    // 2.1.1 将 vnode.text 属性值设置为 domNode 的 innerText 属性
    domNode.innerText = vnode.text
  }

  // 2.2 vnode 存在子节点, 不为纯文本
  else if (vnode.children && vnode.children.length > 0) {
    // 2.2.1 循环遍历子节点
    for (const item of vnode.children) {
      // 2.2.2 递归调用,将每个子节点转化为 真实DOM
      const childDom = createElement(item)
      // 2.2.3 将转化为的 真实DOM, 挂载到父元素上
      domNode.appendChild(childDom)
    }
  }

  vnode.elm = domNode

  return domNode
}
