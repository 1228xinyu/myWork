// import { init, classModule, propsModule, styleModule, eventListenersModule } from 'snabbdom'
// const patch = init([classModule, propsModule, styleModule, eventListenersModule])

import h from './foursnabbdom/h'
import patch from './foursnabbdom/patch'

const app = document.querySelector('#app'),
  btn = document.querySelector('button')


// const vDom1 = h('ul', {}, [h('li', { key: 1 }, '1'), h('li', { key: 2 }, '2'), h('li', { key: 3 }, '3')])

// const vDom2 = h('ul', {}, [h('li', { key: 1 }, 'a'), h('li', { key: 2 }, 'b'), h('li', { key: 3 }, 'c')])


const vDom1 = h('ul', {}, [  
  h('li', { key: 'A' }, 'A'), 
  h('li', { key: 'B' }, 'B'), // 2
  h('li', { key: 'C' }, 'C'), // 1
  h('li', { key: 'D' }, 'D'), 
  h('li', { key: 'E' }, 'E'), 
])




const vDom2 = h('ul', {}, [
  h('li', { key: 'M' }, 'M'),

  h('li', { key: 'G' }, 'G'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'E' }, [
    h('p', {}, 'sa'),
    h('p', {}, 'sa'),
    h('p', {}, 'sa')
  ]),  // 1
  h('li', { key: 'C' }, 'C'),  // 1
  h('li', { key: 'D' }, 'D'),
])


// 通过 patch 函数获取真实的 DOM
patch(app, vDom1)

btn.addEventListener('click', () => {
  patch(vDom1, vDom2)
})
