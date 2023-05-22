import { init, classModule, propsModule, styleModule, eventListenersModule } from 'snabbdom'

import h from './snabbdom/h'

const patch = init([classModule, propsModule, styleModule, eventListenersModule])

const app = document.querySelector('#app')

// h 函数嵌套使用
const vDom2 = h('ul', { class: { box: true } }, [
  h('li', {}, '小li——1'),
  h('li', { class: { xx: true } }, h('div', {}, '小li——2')),
  h('li', {}, [h('div', {}, '小li——3的儿子——div')]),
])
console.log(vDom2)
// 通过 patch 函数获取真实的 DOM

patch(app, vDom2)
