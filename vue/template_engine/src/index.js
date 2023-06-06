import Mustache from './secondmustache/index'

const container = document.querySelector('#container')

const templateStr = 
`<ul>
    {{#arr}}
        <li>
            <div>{{name}}的基本信息</div>
            <div>
                <ol>
                {{#hobbies}}
                    <li>{{.}}</li>
                {{/hobbies}}
                </ol>
            </div>
        </li>
    {{/arr}}
</ul>`

// 
/* 

*/
const templateStr1 = `我是你{{father}},我很{{mood}}, 我是{{s.b}}`

const data = {
    arr: [
        { name: 'zs', age:12, hobbies: ['1', '2', '3', '4'] }, // 
        { name: 'ls', age:13, hobbies: ['2']  }, // 
        { name: 'ww', age:18, hobbies: ['3', '4'] }, // 
    ],
}

const data1 = {
  father: '爸爸',
  mood: '开心',
  s: {
    b:'你大父亲'
  }
}

const s = Mustache.render(templateStr1, data1)
console.log(s);
container.innerHTML =  s
