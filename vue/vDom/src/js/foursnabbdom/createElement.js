// 创建真实dom
export default function createElement(vnode) {
    const realDom = document.createElement(vnode.sel)

    if(vnode.text && !vnode.children) {
        realDom.innerText = vnode.text
    }
    
    else if(vnode.children && vnode.children.length > 0) {
        // 循环遍历
        for (const item of vnode.children) {
            if(typeof item === 'object' && item.sel) {
                const dom = createElement(item)
                realDom.appendChild(dom)
            }

            else {
                throw new Error('有children不为虚拟dom')
            }
        }
    }

    return vnode.elm = realDom
}