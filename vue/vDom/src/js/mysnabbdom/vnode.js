export default function (sel, data, children, text, elm) {
  // sel: 标签名
  // data: 属性 例如 class、dom对象本身属性
  // children: 子节点
  // text: 文本
  // elm: vnode 对应自身的真实DOM
  const key = data.key
  return { sel, data, children, text, elm, key }
}
