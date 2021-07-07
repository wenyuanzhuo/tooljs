const ncname = '[a-zA-Z_][\\w\\-\\.]*'
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
// const attribute = /^/n/
let html = `<div></div>`
let index = 0
const start = html.match(startTagOpen)
console.log({
  start: html.match(startTagOpen),
  end: html.match(startTagClose),
})