import vnode from './vnode'
import createElement from './createElement'
import patchVnode from './patchVnode'
import samenode from './samenode'

// diff 开始
export default function patch(oldVnode, newVnode) {
    // 判断 oldVnode 是否为虚拟dom
    if(!oldVnode.sel) {
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), undefined, undefined, oldVnode.innerText, oldVnode)
    }

    // 判断是否处于同一节点
    if(!samenode(oldVnode, newVnode)) {
        const realDom = createElement(newVnode)
       
        // 插入新节点，暴力删除旧节点
        oldVnode.elm.parentNode.insertBefore(realDom, oldVnode.elm)
        oldVnode.elm.remove()
    }

    // 精细化比较
    else {
       patchVnode(oldVnode, newVnode)
    }
}