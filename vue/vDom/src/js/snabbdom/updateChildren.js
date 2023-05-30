import sameNode from './sameNode'
import patchVnode from './patchVnode'

export default function updateChildren(oldNode, oldChildren, newChildren) {
  // 旧前标记
  let oldStartIndex = 0
  // 新前标记
  let newStartIndex = 0
  // 旧后标记
  let oldEndIndex = oldChildren.length - 1
  // 新后标记
  let newEndIndex = newChildren.length - 1

  // 旧前节点
  let oldStartNode = oldChildren[0]
  // 新前节点
  let newStartNode = newChildren[0]
  // 旧后节点
  let oldEndNode = oldChildren[oldEndIndex]
  // 新后节点
  let newEndNode = newChildren[newEndIndex]

  // 循环
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    // 1) 旧前与新前 命中
    if (sameNode(oldStartNode, newStartNode)) {
      //   debugger
      console.log('1 命中')
      // 比对 节点中的内容
      patchVnode(oldStartNode, newStartNode)

      // 标记下移
      oldStartNode = oldChildren[++oldStartIndex]
      newStartNode = newChildren[++newStartIndex]
    }

    // 2) 旧后与新后 命中
    else if (sameNode(oldEndNode, newEndNode)) {
      console.log('2 命中')

      // 比对节点中的内容
      patchVnode(oldEndNode, newEndNode)

      // 标记移动
      oldEndNode = oldChildren[--oldEndIndex]
      newEndNode = newChildren[--newEndIndex]
    }

    // 3) 旧前与新后 命中
    else if (sameNode(oldStartNode, newEndNode)) {
      console.log('3 命中')

      // 比对节点中的内容
      patchVnode(oldStartNode, newEndNode)

      // 移动节点
      // 移动新后指向的这个节点到老节点的旧后的后面
      oldNode.insertBefore(oldStartNode.elm, oldEndNode.elm.nextSibling)

      // 标记移动
      oldStartNode = oldChildren[++oldStartIndex]
      newEndNode = newChildren[--newEndIndex]
    }

    // 4) 旧后和新前 命中
    else if (sameNode(oldEndNode, newStartNode)) {
      console.log('4 命中')

      // 比对节点中的内容
      patchVnode(oldEndNode, newStartNode)

      // 移动节点
      // 移动新前指向的这个节点到老节点的旧前的前面
      oldNode.insertBefore(oldEndNode.elm, oldStartNode.elm.previousSibling)

      // 标记移动
      oldEndNode = oldChildren[--oldEndIndex]
      newStartNode = newChildren[++newStartIndex]
    }

    // 都没有命中，循环遍历
    else {
    }
  }

  // 循环结束

  // 当老节点遍历完成，但新节点还未遍历完成
  if (newStartIndex <= newEndIndex) {
    for (; newStartIndex <= newEndIndex; ) {
      // 将所有的节点插入到 老节点的旧后之后
      oldNode.insertBefore(newEndNode.elm, oldEndNode.elm.nextSibling)
      // 改变 newStartNode
      newEndNode = newChildren[--newEndIndex]
    }
  }

  // 当新接待你遍历完成，但老节点还未遍历完成
  else if (oldStartIndex <= oldEndIndex) {
    for (; oldStartIndex <= oldEndIndex; ) {
      // 删除 oldStartIndex 与 oldEndIndex 之间的老节点
      oldStartNode.elm.remove()
      oldStartNode = oldChildren[++oldStartIndex]
    }
  }
}
