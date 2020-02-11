// const ncname = '[a-zA-Z_][\\w\\-\\.]*'
// const qnameCapture = `((?:${ncname}\\:)?${ncname})`
// const startTagOpen = new RegExp(`^<${qnameCapture}`)
// const startTagClose = /^\s*(\/?)>/
// // const attribute = /^/n/
// let html = `<div></div>`
// let index = 0
// const start = html.match(startTagOpen)
// // console.log({
// //   start: html.match(startTagOpen),
// //   end: html.match(startTagClose),
// // })
// const match = {
//   tagName: start[1],
//   attrs: [],
//   start: 0
// }
// html = html.substring(start[0].length)
// index += start[0].length
// let end, attr
// while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
//   html = html.substring(attr[0].length)
//   index += attr[0].length
//   match.attrs.push(attr)
// }
// if (end) {
//   match.unarySlash = end[1]
//   html = html.substring(end[0].length)
//   index += end[0].length
//   match.end = index
// }
// // console.log(match)

// // (?:[a-zA-Z_][\\w\\-\\.]*\\:)

// // const string = `<div class="1" key="2"></div>`
// // const regex = /class=".*"/
// // console.log(string.match(regex)); 

// // function trim(str) {
// //   return str
// //   .replace(/"/g, '')
// //   .match(/\s(.*)\s/g);
// // }
// // const str = trim(`<div class="1" key="2" ></div>`)[0]
// // console.log(str)
// // const attrArr = str.trim().split(' ')


// const string = `<div class="1" key="2"></div>`
// const attrArr = string.match(/.*=".*"/)[0].replace(/"/g, '').split(' ').slice(1)

// const attributes = attrArr.reduce((result, curr) => {
//   let attr = {}
//   const attrKeyAndValue = curr.split('=')
//   attr[attrKeyAndValue[0]] = attrKeyAndValue[1]
//   return { ...attr, ...result }
// }, {})
// console.log(attributes)


function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options,
    ){
      const finalOptions = Object.create(baseOptions)
      finalOptions['name'] = options.name
      return baseCompile(template.trim(), finalOptions)
    }

    return {
      compile,
    }
  }
}

const createCompiler = createCompilerCreator(function baseCompile (
  template,
  options,
) {
  // 生成 ast
  // 优化 ast
  // 生成render
  return  {
    template,
    options
  }
})

const baseOptions = { name: 'base' }
const { compile } = createCompiler()
console.log(compile('<div></div>', { name: 'Aaron'}))