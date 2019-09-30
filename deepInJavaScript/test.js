async function foo() {
  console.log('foo') // 3
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
    // resolve(1)
  })
}
async function bar() {
  console.log('bar start') // 2
  await foo().then(() => {
    console.log('foo after then')
  })
  console.log('bar end')  // 6
}
console.log('script start') // 1
// setTimeout(function () {
//   console.log('setTimeout') // 8
// }, 0)
bar();
new Promise(function (resolve) {
  console.log('promise executor') // 4
  resolve();
}).then(function () {
  console.log('promise then')  // 7
})
// console.log('script end') // 5
