
// 当数据遇到 {{ item.xx }} 时，无法正常访问，返回 undefined 

export default function lookup (token, data) {
    // 判断 token[1] 字符串中是否存在 . 并且自身不为 .
    if(token[1].includes(".") && token[1] !== ".") {
        const arr = token[1].replace(/\s+/g, "").split('.')

        return arr.reduce((prev, cur) => prev[cur], data)
    }

   return data[token[1]]   
} 