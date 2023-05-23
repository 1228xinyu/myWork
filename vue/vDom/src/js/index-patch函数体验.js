import { init, classModule, propsModule, styleModule, eventListenersModule, h } from 'snabbdom'

const patch = init([classModule, propsModule, styleModule, eventListenersModule])

const app = document.querySelector('#app'),
  btn = document.querySelector('button')

const vDom1 = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
])

const vDom2 = h('ul', {}, [
  h('li', { key: 'E' }, 'E'),
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
])

patch(app, vDom1)

btn.onclick = function () {
  patch(vDom1, vDom2)
}
