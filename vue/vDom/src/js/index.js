// import { init, classModule, propsModule, styleModule, eventListenersModule } from 'snabbdom'
// const patch = init([classModule, propsModule, styleModule, eventListenersModule])

import h from './snabbdom/h'
import patch from './snabbdom/patch'

const app = document.querySelector('#app')

const vDom1 = h('h1', {}, '易新宇最帅')

// 通过 patch 函数获取真实的 DOM
patch(app, vDom1)
