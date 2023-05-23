// 真正创建节点的函数，将 vnode 创建为 DOM，为孤儿节点，不进行插入
export default function (vnode) {
  // 目的：把虚拟节点 vnode 变为真正的 DOM
  // 1 创建一个DOM节点，这个节点现在还是孤儿节点
  const domNode = document.createElement(vnode.sel)

  // 2 判断 vnode 有子节点，还是只有文本
  // 2.1 为文本
  if (vnode.text !== '' && (!vnode.children || !vnode.children.length)) {
    // 2.1.1 将 vnode.text 的文本内容赋值给 innerText 属性
    domNode.innerText = vnode.text
  }

  // 2.2 vnode 存在子节点
  else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
  }
}
