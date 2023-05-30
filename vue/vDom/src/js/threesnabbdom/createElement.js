// 将虚拟节点 -> 真实DOM
export default function createElement(vnode) {
    
  // 生成一个孤儿节点
  const vnodeDom = document.createElement(vnode.sel)

  // 判断 是否存在属性
  for (const k in vnode.data) {
    vnodeDom.setAttribute(k, vnode.data[k])
  }

  // 判断 vnode 是否存在子节点
  if (vnode.children && vnode.children.length > 0) {
    // vnode 存在子节点
    for (const item of vnode.children) {
        const childDom = createElement(item)
        vnodeDom.appendChild(childDom)
    }
  }

  // vnode 不存在子节点，为文本属性
  else if (!vnode.children && vnode.text) {
    vnodeDom.innerText = vnode.text
  }

  vnode.elm = vnodeDom

  return vnodeDom
}
