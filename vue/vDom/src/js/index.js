// import { init, classModule, propsModule, styleModule, eventListenersModule } from 'snabbdom'
// const patch = init([classModule, propsModule, styleModule, eventListenersModule])

import h from './threesnabbdom/h'
import patch from './threesnabbdom/patch'

const app = document.querySelector('#app'),
  btn = document.querySelector('button')


// const vDom1 = h('ul', {}, [h('li', { key: 1 }, '1'), h('li', { key: 2 }, '2'), h('li', { key: 3 }, '3')])

// const vDom2 = h('ul', {}, [h('li', { key: 1 }, 'a'), h('li', { key: 2 }, 'b'), h('li', { key: 3 }, 'c')])

const vDom1 = h('ul', {}, [
  h('li', { key: 'X' }, 'X'),
  h('li', { key: 'B' }, 'B'), // u
  h('li', { key: 'A' }, 'A'), // u
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'E' }, 'E'),
])
// const vDom1 = h('ul', {}, [  
//   h('li', { key: 'A' }, 'A'), 
//   h('li', { key: 'B' }, 'B'), // 2
//   h('li', { key: 'C' }, 'C'), // 1
//   h('li', { key: 'D' }, 'D'), 
//   h('li', { key: 'E' }, 'E'), 

// ])

const vDom2 = h('ul', {}, [
  h('li', { key: 'C' }, 'C'), 
  h('li', { key: 'E' }, 'E'), 
  h('li', { key: 'F' }, 'F'), 
  h('li', { key: 'B' }, 'B'), // 1
  h('li', { key: 'M' }, 'M'), // 2
  h('li', { key: 'D' }, 'D'), 
  h('li', { key: 'A' }, 'A'), 
])


// const vDom2 = h('ul', {}, [
//   h('li', { key: 'M' }, 'M'),
//   h('li', { key: 'A' }, 'A'),
//   h('li', { key: 'G' }, 'G'),
//   h('li', { key: 'B' }, 'B'),
//   h('li', { key: 'E' }, [
//     h('p', {}, 'sa'),
//     h('p', {}, 'sa'),
//     h('p', {}, 'sa')
//   ]),  // 1
//   h('li', { key: 'C' }, 'C'),  // 1
//   h('li', { key: 'D' }, 'D'),
// ])
// [h('div', {}, '啊'), h('div', {}, '啊'), h('div', {}, '啊'), h('div', {}, '啊')]

// 通过 patch 函数获取真实的 DOM
patch(app, vDom1)

btn.addEventListener('click', () => {
  patch(vDom1, vDom2)
})
