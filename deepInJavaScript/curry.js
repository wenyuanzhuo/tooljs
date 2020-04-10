let sum = (a, b, c, d) => {
  return a + b + c + d
}

// 柯里化函数，返回一个被处理过的函数 
let curry = (fn, arr = []) => {  // arr 记录已有参数
  return (...args) => {   // args 接收新参数
    if (fn.length === [...arr,...args].length) {  // 参数够时，触发执行
      return fn(...arr, ...args)
    } else {  // 继续添加参数
      return curry(fn, [...arr, ...args])
    }
  }
}

// var sumPlus = curry(sum)
// console.log(sumPlus(1)(2)(3)(4))

const arr = [{id: 1, name: 'aaron'}, { id: 2}, { id: 1, name: 'nick'}]
const obj = {}

for(let item in arr) {
  obj[arr[item].id] = arr[item]
}
const res = Object.values(obj)
console.log(obj, res)
