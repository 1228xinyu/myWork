import lookup from "./lookup";

export default function renderTemplate (tokens, data) {
    let domStr = ""
    // 循环遍历
    tokens.forEach(token => {
        // 普通文本，直接拼接
        if(token[0] === "text") {
            domStr += token[1]
        }
        // name 属性，找到 data 中对应的属性
        else if (token[0] === "name") {
            domStr += lookup(token, data)
        }
        // # 属性，需要递归调用
        else {
            // 遍历循环, 递归调用
            for (const item of data[token[1]]) {
                domStr += renderTemplate(token[2], {
                    ".": item,
                    ...item
                })
            }
        }
    });

    return domStr
}