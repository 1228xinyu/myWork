
class Tab {
    constructor(id) {
        // 获取元素
        this.main = document.querySelector(id)  // 
        this.lis = this.main.querySelectorAll('li')
        this.ul = this.main.querySelector('ul')
        this.add = this.main.querySelector('.tabadd')
        this.tabscon = this.main.querySelector('.tabscon')
        this.sections = this.main.querySelectorAll('section')
        this.init()
    }

    // 初始化 让相关元素绑定事件
    init() {
        this.lis.forEach(element => {
            // span 绑定 修改事件
            element.querySelector('span').onclick = (e) => {
                let index = [...this.lis].indexOf(e.target.parentNode)
                this.addOrRmoveClass(index)  // 修改样式
                this.showInput(element)  // 显示输入框
            }

            // 删除按钮
            element.querySelector('.delete').onclick = (e) => {
                this.deleteNav(e, element)
            }

            // li 绑定点击事件
            element.onclick = (e) => {

                if (e.target.nodeName === 'LI') {
                    let index = [...this.lis].indexOf(e.target)

                    // 获取到自定义元素的值
                    this.addOrRmoveClass(index)  // 修改样式
                }

            }
        })

        // 给每个 section 绑定事件
        this.sections.forEach(element => {
            element.onclick = () => {
                this.showInput(element)
            }
        })

        // 绑定添加事件
        this.add.onclick = () => {
            // 生成 tab 栏
            this.addTab()
        }
    }

    // 解除 绑定 css 样式
    addOrRmoveClass(index) {

        // 将前面所有的 li 移除 liactive 类名
        this.lis.forEach(value => {
            value.classList.remove('liactive')
        })


        // 将前面所有的 section 移除 conactive 类名
        this.sections.forEach(value => {
            value.classList.remove('conactive')
        })

        if (index !== undefined && index !== -1) {
            this.sections[index].classList.add('conactive')
            this.lis[index].classList.add('liactive')
        }
    }

    // 新增 tab 栏
    addTab() {

        // 将前面所有的 li 移除 liactive 类名
        this.addOrRmoveClass()

        // 插入元素
        this.insertElement()

    }

    // 显示输入框
    showInput(element) {

        // 判断 li 里面是否存在 input 标签
        if (element.querySelector('input') || element.querySelector('textarea')) {
            this.iptAndSpan('none', 'inline-block', element)
        } else {
            let input
            element.nodeName === 'SECTION' ? input = document.createElement('textarea') :
                input = document.createElement('input')  // 创建一个 input

            setTimeout(() => {
                input.focus()
            }, 0)


            // 给 input 绑定 输入 和 失去焦点事件
            this.inputEvent(input, element)


            // 获取 span 的 innerText 赋值给 input
            let text = element.children[0].innerText
            input.value = text

            // 隐藏 span
            this.iptAndSpan('none', undefined, element)

            // input 插入 li
            element.appendChild(input)
        }

    }

    // 控制input 和 span 的 显示与 隐藏
    iptAndSpan(span, input, element, target) {
        let ipt = element.querySelector('input') || element.querySelector('textarea')
        let spa = element.querySelector('span')

        if (ipt) {
            ipt.style.display = input
            setTimeout(() => {
                ipt.focus()
            }, 0)
        }

        spa.style.display = span
        target ? spa.innerText = target : spa.innerText

    }

    // 给 input 绑定事件
    inputEvent(input, element) {
        let txt // 获取输入框的用户输入的值

        // 失去焦点
        input.onblur = () => {
            this.iptAndSpan('inline', 'none', element, txt)
        }

        // 输入事件
        input.oninput = (e) => {
            txt = e.target.value
        }
    }

    // 插入元素
    insertElement() {
        // 往 ul 里插入新元素
        let li = `<li class="liactive"><span>新选项卡</span><span class="delete">x</span></li>`
        this.ul.insertAdjacentHTML('beforeend', li)

        // 创建 section 
        let section = `<section class="conactive"><span>新选项卡</span></section>`
        this.tabscon.insertAdjacentHTML('beforeend', section)

        // 重新获取 lis
        this.lis = this.main.querySelectorAll('li')
        this.sections = this.main.querySelectorAll('section')
        this.init()

    }

    // 删除
    deleteNav(e, element) {
        let index = [...this.lis].indexOf(e.target.parentNode)

        element.remove()
        this.sections[index].remove()
        this.addOrRmoveClass(index - 1)

        // 更新 lis 与 sections
        this.lis = this.main.querySelectorAll('li')
        this.sections = this.main.querySelectorAll('section')
    }
}

const tab = new Tab('#tab')