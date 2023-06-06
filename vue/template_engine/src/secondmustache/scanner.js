export default class Scanner {
    constructor(templateStr) {
        this.templateStr = templateStr
        this.pointer = 0  // 指针
        this.tail = this.templateStr
    }

    scan(stopTag) {
        let length = stopTag.length

        while(length--) {
            this.pointer++
            this.tail = this.templateStr.substring(this.pointer)
        }
    }

    scanUtil(stopTag) {
        let startPos = this.pointer

        while (!this.over() && !this.tail.startsWith(stopTag)) {
            this.pointer++
            this.tail = this.templateStr.substring(this.pointer)
        }

        return this.templateStr.substring(startPos, this.pointer)
    }

    over() {
       return this.pointer >= this.templateStr.length
    }
}