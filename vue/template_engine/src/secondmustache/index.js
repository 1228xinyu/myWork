import makeTokens from "./makeTokens";
import renderTemplate from './renderTemplate'

export default class Mustache {
    constructor() {}

    static render(templateStr, data) {
       // 生成了嵌套的 tokens 
       const tokens = makeTokens(templateStr)

       // 结合数据，得到字符串
       const str = renderTemplate(tokens, data)
       
       return str
    }
}