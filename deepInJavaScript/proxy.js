// const proxy = new Proxy({}, {
//     get: function(target, property) {
//         return 35
//     }
// })
// console.log(proxy.time)

// function create1 (o) {//复制对象 不能访问o原型上的属性
//   function f() {}
//   f.prototype = o
//   return new f()
// }
// var c = create1(proxy)  
// console.log(c)

const arr = [{
  type: '111',
  id: 1
}, {
  id: 1
}, {
  type: '111',
  id: 3
}]
// const bool = arr.filter(one => one.type)
// .filter(item => item.type !== 'rewardAd').length > 0
const bool = arr.reduce((result, curr) => {
  if (curr.type && curr.type !== 'rewardAd') result++
  return result
}, 0)
console.log(bool)
