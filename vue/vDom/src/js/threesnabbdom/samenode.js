export default function samenode(vnode1, vnode2) {
    return vnode1.sel === vnode2.sel && vnode1.key === vnode2.key
}