
class Tab {
    constructor(id) {
        this.tab = document.querySelector(id)
        this.btns = this.tab.querySelectorAll('ul > li')
        this.tabs = this.tab.querySelectorAll('ol > li')
        this.init()
    }

    // 初始化，绑定事件
    init() {
        this.btns.forEach(element => {
            // 给所有 btn 绑定点击事件
            element.onclick = (e) => {
                this.changeOption(e)
            }
        })
    }

    // 切换选项卡功能
    changeOption(e) {
        // 获取点击元素的 index
        let index = [...this.btns].indexOf(e.target)

        this.changeClass(index)
    }

    // 修改样式
    changeClass(index) {
        this.btns.forEach(element => {
            element.classList.remove('active')
        })
        this.tabs.forEach(element => {
            element.classList.remove('active')
        })

        if (index !== -1 && index !== undefined) {
            this.btns[index].classList.add('active')
            this.tabs[index].classList.add('active')
        }
    }
}


const tab1 = new Tab('#box')

const tab2 = new Tab('#box2')