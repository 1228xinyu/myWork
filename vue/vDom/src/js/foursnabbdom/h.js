import vnode from './vnode'

// h 函数
export default function h(sel, data, c) {
    // 判断传入形参的参数
    if(arguments.length !== 3) {
        throw new Error('请传入三个参数')
    }

    // 判断 c 的类型
    if(c && typeof c === 'string') {
        return vnode(sel, data, undefined, c, undefined)
    }

    else if(c && Array.isArray(c) && c.length) {
        const children = []
        // 循环遍历 c
        for (const item of c) {
            if(typeof item === 'object' && item.sel) {
                children.push(item)
            }
            else {
                throw new Error('参数不对')
            }
        }
        return vnode(sel, data, children, undefined, undefined)
    }

    else if(c && typeof c === 'object' && c !== null) {
        return vnode(sel, data, [c], undefined, undefined)
    }

    else {
        throw new Error('请传入正确的参数')
    }
}