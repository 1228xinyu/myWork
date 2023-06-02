/* 
 思路:
 在 nestTokens 中，我们遍历传入的 tokens 的每一个 token，遇到第一项是 # 和 / 的分别做处理，其余的做一个默认处理。大致思路是当遍历到的 token 的第一项为 # 时，就把直至遇到配套的 / 之前，遍历到的每一个 token 都放入一个容器（collector）中，把这个容器放入当前 token 里作为第 3 项元素。
 但这里有个问题：在遇到匹配的 / 之前又遇到 # 了怎么办？也就是如何解决循环里面嵌套循环的情况？
 解决的思路是新建一个 栈数据类型 的数组（stack），遇到一个 #，就把当前 token 放入这个栈中，让 collector 指向这个 token 的第三个元素。遇到下一个 # 就把新的 token 放入栈中，collector 指向新的 token 的第三个元素。遇到 / 就把栈顶的 token 移出栈，collector  指向移出完后的栈顶 token。这就利用了栈的先进后出的特点，保证了遍历的每个 token 都能放在正确的地方，也就是 collector 都能指向正确的地址。
*/


// 我自己写的
// export default function nestTokens (tokens) {
//     const resTokens = [] // 被整合后的 tokens'

//     const stack = [] // 栈结构

//     // 遍历 tokens
//     for (let i = 0; i < tokens.length; i++) {
//         const token = tokens[i]
//         // 判断 tokens 的类型
//         switch (token[0]) {
//             case '#':
//                 token[2] = []
//                 const oldLength = stack.length
//                 // 堆入栈顶
//                 stack.unshift(token)

//                 if (stack.length > 1) {
//                     stack[stack.length - oldLength][2].push(token)
//                 }
//                 else {
//                     resTokens.push(token)
//                 }

//                 break;
//             case '/':
//                 const out = stack.shift()
//                 break;
        
//             default:
//                 if (stack.length > 1) {
//                     stack[0][2].push(token)
//                 }
//                 else if (stack.length === 1) {
//                     stack[stack.length - 1][2].push(token)
//                 }
//                 else resTokens.push(token)
//                 break;
//         }
//     }

//     return resTokens
// }


// 源码的
export default function nestTokens (tokens) {
    const nestTokens = [] // 被整合后的 tokens

    const stack = [] // 栈结构

    let collector = nestTokens  // 一开始让收集器 collector 指向最终返回的数组 nestTokens

    // 循环遍历
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i]      
        
        switch (token[0]) {
            case '#':
                // 收集器中放入这个 token
                collector.push(token)
                // 栈结构也放入这个 token
                stack.push(token)

                // 收集器更换指向 (收集子模板字符串)
                collector = token[2] = []
                break;

            case '/':
                // 出栈
                stack.pop()
                // 收集器更换指向 (指回原来)
                collector = stack.length ? stack[stack.length - 1][2] : nestTokens
                break;

            default:
                collector.push(token)
                break;
        }
    }

    return nestTokens
}