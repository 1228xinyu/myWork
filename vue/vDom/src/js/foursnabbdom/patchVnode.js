import createElement from "./createElement"
import updateChild from "./updateChild"

export default function patchVnode(oldVnode, newVnode) {
    // 判断两个虚拟dom是否相同
    if(oldVnode === newVnode) return

    // 判断 newVnode 是否为 text 文本节点
    if(newVnode.text && !newVnode.children) {
        // 判断两者 text 文本是否相同
        if(newVnode.text === oldVnode.text) return

        oldVnode.elm.innerText = newVnode.text
        return
    }

    // 判断 oldVnode 是否有子节点
    if(!oldVnode.children || !oldVnode.children.length) {
        oldVnode.elm.innerText = ''
        // 循环遍历
        for (const item of newVnode.children) {
            oldVnode.elm.appendChild(createElement(item))
        }
        return
    }
    
    // diff 核心
    updateChild(oldVnode.elm.parentNode, oldVnode.children, newVnode.children)
}