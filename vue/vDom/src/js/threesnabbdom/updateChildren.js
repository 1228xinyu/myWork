import samenode from './samenode'
import patchVnode from './patchVnode'

// 当 oldVnode 与 newVnode 都为子节点时，diff 核心
export default function updateChildren(parentElm, oldChildren, newChildren) {
  // 四个指针
  // 旧前
  let oldStartIndex = 0
  // 新前
  let newStartIndex = 0
  // 旧后
  let oldEndIndex = oldChildren.length - 1
  // 新后
  let newEndIndex = newChildren.length - 1

  // 四个指针指向的虚拟DOM
  // 旧前虚拟DOM
  let oldStartNode = oldChildren[oldStartIndex]
  // 新前虚拟DOM
  let newStartNode = newChildren[newStartIndex]
  // 旧后虚拟DOM
  let oldEndNode = oldChildren[oldEndIndex]
  // 新后虚拟DOM
  let newEndNode = newChildren[newEndIndex]

  // oldMap, 映射 oldStart 的位置
  let oldMap = null

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (!oldStartNode) {
      // 指针与虚拟DOM 下移
      oldStartNode = oldChildren[++oldStartIndex]
    } else if (!oldEndNode) {
      // 指针与虚拟DOM 下移
      oldEndNode = oldChildren[--oldEndIndex]
    } else if (!newStartNode) {
      newStartNode = newChildren[++newStartIndex]
    } else if (!newEndNode) {
      newEndNode = newChildren[--newEndIndex]
    }
    // 旧前与新前 命中
    else if (samenode(oldStartNode, newStartNode)) {
      // 比较 oldStartNode 与 newStartNode
      patchVnode(oldStartNode, newStartNode)

      // 指针与虚拟DOM 下移
      oldStartNode = oldChildren[++oldStartIndex]
      newStartNode = newChildren[++newStartIndex]
    }

    // 旧后与新后 命中
    else if (samenode(oldEndNode, newEndNode)) {
      // 比较 oldEndNode 与 newEndNode
      patchVnode(oldEndNode, newEndNode)

      // 指针与虚拟DOM 下移
      oldEndNode = oldChildren[--oldEndIndex]
      newEndNode = newChildren[--newEndIndex]
    }

    // 旧前与新后 命中
    else if (samenode(oldStartNode, newEndNode)) {
      // 比较 oldStartNode 与 newEndNode
      patchVnode(oldStartNode, newEndNode)

      // 此时需要移动节点，移动 新后 对应的 旧前 对应的 真实DOM 至 旧后的后面
      parentElm.insertBefore(oldStartNode.elm, oldEndNode.elm.nextSibling)

      // 指针与虚拟DOM 下移
      oldStartNode = oldChildren[++oldStartIndex]
      newEndNode = newChildren[--newEndIndex]
    }

    // 旧后与新前 命中
    else if (samenode(oldEndNode, newStartNode)) {
      // 比较 oldEndNode 与 newStartNode
      patchVnode(oldEndNode, newStartNode)

      // 此时需要移动节点，移动 新前 对应的 真实DOM 至 旧前的前面
      parentElm.insertBefore(oldEndNode.elm, oldStartNode.elm)

      // 指针与虚拟DOM 下移
      oldEndNode = oldChildren[--oldEndIndex]
      newStartNode = newChildren[++newStartIndex]
    }

    // 四种都没有命中，循环遍历
    else {
      if (!oldMap) {
        oldMap = {}
        for (let i = 0; i < oldChildren.length; i++) {
            console.log(oldChildren[i].key);
            oldMap[oldChildren[i].key] = i
        }
      }
      // 说明 oldChildren 中 存在 newStartNode，需要移动 newStartNode 对应的 oldChilren 中的节点移动到
      // 旧前的前面
      if (oldMap[newStartNode.key]) {
        // 找到 oldMap[newStartNode.key] 对应的那一项 虚拟DOM
        let findDom = oldChildren[oldMap[newStartNode.key]]

        // 比较 oldEndNode 与 newStartNode
        patchVnode(findDom, newStartNode)

        // 标记打上 undefined
        oldChildren[oldMap[newStartNode.key]] = undefined

        parentElm.insertBefore(findDom.elm, oldStartNode.elm)
      }

      // 说明 oldChildren 中不存在 newStartNode，需要移动 newStartNode 对应的 oldChilren 中的节点移动到
      // 旧前的前面
      else {
        parentElm.insertBefore(newStartNode.elm, oldStartNode.elm)
      }

      newStartNode = newChildren[++newStartIndex]
    }
  }

  // 新增： 当 老节点遍历完成，但新节点还存在节点未遍历完成
  if (newStartIndex <= newEndIndex) {
    // const before = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].elm;
    for (; newStartIndex <= newEndIndex; ) {
      // 将剩余节点插入到 旧后的后面
      parentElm.insertBefore(newEndNode.elm, oldEndNode.elm.nextSibling)

      // 指针和虚拟DOM 下移
      newEndNode = newChildren[--newEndIndex]
    }
  }

  // 删除： 当 新节点遍历完成，但老节点还存在节点未遍历完成
  else if (oldStartIndex <= oldEndIndex) {
    for (; oldStartIndex <= oldEndIndex; ) {
      if (oldStartNode) {
        // 将 oldStartIndex 与 oldEndIndex 直接的节点删除
        parentElm.removeChild(oldStartNode.elm)
      }

      // 指针和虚拟DOM 下移
      oldStartNode = oldChildren[++oldStartIndex]
    }
  }
}
