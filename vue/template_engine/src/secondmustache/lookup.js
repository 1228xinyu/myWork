// 寻找 data 中属性

export default function lookup(token, data) {
    if (token[1].includes('.') && token[1] !== '.') {
        const tags = token[1].replace(/\s+/g, "").split('.')

        return tags.reduce((prev, cur) => prev[cur], data)
    }

    else if (token[1] === '.') return data
   
    return data[token[1]]
}