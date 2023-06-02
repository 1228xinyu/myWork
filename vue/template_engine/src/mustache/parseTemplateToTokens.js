import Scanner from "./Scanner";
import nestTokens from "./nestTokens";

export default function parseTemplateToTokens(templateStr) {
    const tokens = []  // tokens

    // 实例化 Scanner 扫描器
    const scanner = new Scanner(templateStr)

    let words  // 存储扫描出的 模板字符串

    // 循环遍历
    while (!scanner.eos()) {
        // 扫描出 "{{" 之前的模板字符串
        words = scanner.scanUtil("{{")
        // 存储
        words && tokens.push(["text", words])

        // 略过 "{{"
        scanner.scan("{{")

        // 扫描出 "}}" 之前的模板字符串
        words = scanner.scanUtil("}}")
        // words && tokens.push(["name", words])
        if (words) {
           // 判断 words 是否以 # 开头 或 / 开头
            if (words[0] === '#') {
                tokens.push(['#', words.substring(1)])
            }
            else if (words[0] === '/') {
                tokens.push(['/', words.substring(1)])
            }
            else {
                tokens.push(['name', words])
            }
        }
        // 略过 "}}"
        scanner.scan("}}")
    }

    // 返回整合后的 tokens，此时，循环遍历后还不是嵌套
    return nestTokens(tokens)
}