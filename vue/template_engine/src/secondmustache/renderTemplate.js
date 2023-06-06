import lookup from "./lookup";

export default function renderTemplate(tokens, data) {
    let domStr = ''
    // 循环遍历 tokens
    for (const token of tokens) {
        if (token[0] === 'name') {
            console.log(12312);
            domStr += lookup(token, data)
        }

        else if (token[0] === 'text') {
            domStr += token[1]
        }

        else {
            // 递归调用
            for (const item of data[token[1]]) {
                const childDom = renderTemplate(token[2], item)
                domStr += childDom
            }
        }
    }

    return domStr
}
