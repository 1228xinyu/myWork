import Scanner from "./scanner";
import nestTokens from "./nestTokens";

export default function makeTokens(templateStr) {
    const scanner = new Scanner(templateStr)
    const tokens = []

    let words

    while (!scanner.over()) {
        words = scanner.scanUtil('{{')

        words && tokens.push(['text', words])

        scanner.scan('{{')

        words = scanner.scanUtil('}}')
        
        if (words) {
            if (words[0] === '#') {
                tokens.push(['#', words.slice(1)])
            }
            else if (words[0] === '/') {
                tokens.push(['/', words.slice(1)])
            }
            else {
                tokens.push(['name', words.trim()])
            }
        }

        scanner.scan('}}')
    }

    console.log(tokens);

    return nestTokens(tokens)
}