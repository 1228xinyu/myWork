// import { init, classModule, propsModule, styleModule, eventListenersModule } from 'snabbdom'
// const patch = init([classModule, propsModule, styleModule, eventListenersModule])

import h from './mysnabbdom/h'
import patch from './mysnabbdom/patch'

const app = document.querySelector('#app'),
  btn = document.querySelector('button')

const vDom1 = h('ul', {}, '易新宇最帅')

const vDom2 = h('ul', {}, [
  h('li', {}, '1'),
  h('li', {}, '2'),
  h('li', {}, '3'),
  h('li', {}, [
    h('p', {}, 'a'),
    h('p', {}, 'b'),
    h('p', {}, [h('div', {}, '啊'), h('div', {}, '啊'), h('div', {}, '啊'), h('div', {}, '啊')]),
  ]),
])

// 通过 patch 函数获取真实的 DOM
patch(app, vDom1)

btn.addEventListener('click', () => {
  patch(vDom1, vDom2)
})
