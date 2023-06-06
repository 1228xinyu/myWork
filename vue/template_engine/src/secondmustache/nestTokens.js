// 生成嵌套的 tokens
export default function nestTokens (tokens) {
    const newTokens = []
    let collector = newTokens  // 定义一个收集器
    const stack = []  // 定义栈
    
    // 循环遍历
    for (const token of tokens) {
        if (token[0] === '#') {
            collector.push(token)
            stack.push(token) // 入栈
            collector = token[2] = [] // 改变收集器的指向，并给 token 添加 chilren 属性
        }

        else if (token[0] === '/') {
            stack.pop() // 出栈
            collector = stack.length >= 1 ? stack[stack.length - 1][2] : newTokens  // 收集器指回上一级
        }

        else {
            collector.push(token) // 为 text 或 name 直接 push
        }
    }

    return newTokens
}