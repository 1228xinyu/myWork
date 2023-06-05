import samenode from "./samenode"
import patchVnode from "./patchVnode"
import createElement from "./createElement"

export default function updateChild(parentElm, oldChildren, newChildren) {
    let oldStartIndex = 0 // 旧前
    let newStartIndex = 0 // 新前
    let oldEndIndex = oldChildren.length - 1 // 旧后
    let newEndIndex = newChildren.length - 1 // 新后

    let oldStartNode = oldChildren[oldStartIndex]  // 旧前节点
    let newStartNode = newChildren[newStartIndex]  // 新前节点
    let oldEndNode = oldChildren[oldEndIndex]  // 旧后节点
    let newEndNode = newChildren[newEndIndex]  // 新后节点

    const map = null


    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        if(!oldStartNode) {
            oldStartNode = oldChildren[++oldStartIndex]
        }
        else if (!newStartNode) {
            newStartNode = newChildren[++newStartIndex]
        }
        else if (!oldEndNode) {
            oldEndNode = oldChildren[--oldEndIndex] 
        }
        else if (!newEndNode) {
            newEndNode = newChildren[--newEndIndex]
        }

        // 前前命中
        else if (samenode(oldStartNode, newEndNode)) {
            oldStartNode = oldChildren[++oldStartIndex]
            newStartNode = newChildren[++newStartIndex]
        }

        // 后后命中
        else if (samenode(oldEndNode, newEndNode)) {
            oldEndNode = oldChildren[--oldEndIndex]
            newEndNode = newChildren[--newEndIndex]
        }

        // 旧前先后命中
        else if (samenode(oldStartNode, newStartNode)) {
            patchVnode(oldStartNode, newEndNode)

            // 移动节点
            parentElm.insertBefore(oldStartNode.elm, oldEndNode.elm.nextSibling)

            oldStartNode = undefined
            newEndNode = undefined

            oldStartNode = oldChildren[++oldStartIndex]
            newEndNode = newChildren[--newEndNode]
        }

        // 旧后新前命中
        else if (samenode(oldEndNode, newStartNode)) {
            patchVnode(oldEndNode, newStartNode)

            // 移动节点
            parentElm.insertBefore(oldEndNode.elm, oldStartNode.elm.previousSibling)

            oldEndNode = oldChildren[--oldEndIndex]
            newStartNode = newChildren[++newStartIndex]
        }

        // 无命中
        else {
            if(!map) {
                oldChildren.forEach((item, key) => {
                    map[item.key] = key
                })
            }

            if(!map[newStartNode.key]) {
                parentElm.insertBefore(createElement(newStartNode), oldStartNode.elm)
            }

            else {
               const findDom = oldChildren[newStartNode.key]

               patchVnode(findDom.elm, oldStartNode.elm)

               parentElm.insertBefore(findDom.elm, oldStartNode.elm)
               
               oldChildren[newStartNode.key] = undefined
            }

            newStartNode = [++newStartIndex]
        }
    }

    // 新增
    if (newStartIndex <= newEndIndex) {
        for(; newStartIndex <= newEndIndex ;) {
            // 将剩余节点插入到 旧后的后面
            parentElm.insertBefore(newEndNode.elm, oldEndNode.elm.nextSibling)

            // 指针和虚拟DOM 下移
            newEndNode = newChildren[--newEndIndex]
        }
    }

    // 删除
    else if (oldStartIndex <= oldEndIndex) {
        for(; oldStartIndex <= oldEndIndex ;) {
            oldStartNode.elm.remove()

            oldStartNode = oldChildren[++oldStartIndex]
        }
    }


}