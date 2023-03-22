
class Tab {
    constructor(id) {
        // 获取元素
        this.main = document.querySelector(id)  // 
        this.lis = this.main.querySelectorAll('li')
        this.ul = this.main.querySelector('ul')
        this.add = this.main.querySelector('.tabadd')
        this.tabscon = this.main.querySelector('.tabscon')
        this.sections = this.main.querySelectorAll('section')
        this.index = 3   // 给 li 添加自定义属性
        this.init()
    }

    // 初始化 让相关元素绑定事件
    init() {
        // 给每个 li 绑定事件
        this.lis.forEach(element => {
            // span 绑定修改事件
            element.querySelector('span').onclick = () => {
                // 修改样式
                this.addOrRmoveClass(element)
                // 显示输入框
                this.showInput(element)
            }

            // li 绑定点击事件
            element.onclick = () => {
                // 获取到自定义元素的值
                let index = element.dataset.index

                // 修改样式
                this.addOrRmoveClass(element, index)
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
    addOrRmoveClass(element, index) {
        // 将前面所有的 li 移除 liactive 类名
        this.lis.forEach(value => {
            value.classList.remove('liactive')
        })
        element && element.classList.add('liactive')

        // 将前面所有的 section 移除 conactive 类名
        this.sections.forEach(value => {
            value.classList.remove('conactive')
        })
        index && this.sections[index].classList.add('conactive')

    }

    // 新增 tab 栏
    addTab() {

        // 将前面所有的 li 移除 liactive 类名
        this.addOrRmoveClass()

        // 插入元素
        this.insertElement(this.index)
        this.index++
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
    insertElement(index) {
        // 往 ul 里插入新元素
        let li = `<li class="liactive" data-index=${index}><span>新选项卡</span><span class="delete">x</span></li>`
        this.ul.insertAdjacentHTML('beforeend', li)

        // 创建 section 
        let section = `<section class="conactive"><span>新选项卡</span></section>`
        this.tabscon.insertAdjacentHTML('beforeend', section)

        // 重新获取 lis
        this.lis = this.main.querySelectorAll('li')
        this.sections = this.main.querySelectorAll('section')
        this.init()
    }
}

const tab = new Tab('#tab')