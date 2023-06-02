import parseTemplateToTokens from "./parseTemplateToTokens";
import renderTemplate from "./renderTemplate";

export default class Mustache {
   constructor() {}

    static render(templateStr, data) {
        // 1) 调用 parseTemplateToTokens 生成嵌套的 tokens
        const tokens = parseTemplateToTokens(templateStr)

        // 2) 整合 数据 和 tokens 得到最终生成的模板字符串
        const domStr = renderTemplate(tokens, data)

        return domStr
    }
}
