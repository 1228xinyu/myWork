// <h1>我这几天{{xxx}}，嘻嘻{{yyy}}</h1>

// 扫描器类，用于扫描整个模板字符串
export default class Scanner { 
    constructor(templateStr) {
        this.pos = 0,  // 模板字符串的指针

        this.templateStr = templateStr, // 挂载模板字符串

        this.tail = this.templateStr // 定义尾巴，记录指针未走过的模板字符串，初始即为整个模板字符串
    }

    // 功能: 扫描 "{{" 或 "}}", 直接略过，不需要返回前面扫描的字符串
    scan(tarTag) {
        let length = tarTag.length
        while(length--) {
            // 移动指针
            this.pos++
            // 改变尾巴
            this.tail = this.templateStr.substring(this.pos, this.templateStr.length)
        }
    }

    // 功能: 扫描除 "{{" 或 "}}" 的整个字符串，返回前面扫描完成的字符串
    // stopTag: 结束标识即为: "{{" 或 "}}"
    scanUtil(stopTag) {
        let startPos = this.pos  // 记录开始时的 pos 指针

        while(!this.eos() && this.tail.indexOf(stopTag)) {
            // 向下移动指针
            this.pos++
            // 调整尾巴的长度
            this.tail = this.templateStr.substring(this.pos, this.templateStr.length)   
        }
        // 返回指针扫描过的字符串
        return this.templateStr.substring(startPos, this.pos) 
    }

    // 判断循环结束的条件
    eos() {
        return this.pos > this.templateStr.length
    }
}