



// async function foo() {
//   console.log('foo') // 3
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(1)
//     }, 1000)
//     // resolve(1)
//   })
// }
// async function bar() {
//   console.log('bar start') // 2
//   await foo().then(() => {
//     console.log('foo after then')
//   })
//   console.log('bar end')  // 6
// }
// console.log('script start') // 1
// // setTimeout(function () {
// //   console.log('setTimeout') // 8
// // }, 0)
// bar();
// new Promise(function (resolve) {
//   console.log('promise executor') // 4
//   resolve();
// }).then(function () {
//   console.log('promise then')  // 7
// })
// // console.log('script end') // 5

// 协程 js (async await)
// -----------------------------------
// async function foo() {
//   console.log(1)
//   let a = await 100
//   console.log(a)
//   console.log(2)
//   return a
// }
// console.log(0)
// foo().then((res) => {
//   console.log(111111,res)
// })
// console.log(3)


// 协程  
// *   yeild交给父协程（通过next().value取回）
// *   await返回 Promise.resolve交给父协程（如果是pending状态Promise将会一直挂住 相当于没有调用 next().value）
// async function foo ({ homePage }) {
//   await new Promise((resolve) => {
//     // console.log(homePage)
//   })
//   console.log(homePage)
// }
// foo({homePage: true})

// function mySetPromiseTimeout () {
//   return myPromise
// }

// mySetPromiseTimeout().then((res) => {
//   setTimeout(() => {
//     if (!res) {
//       Promise.reject('timeout !!!')
//     }
//   }, 3000);

//   return res
// }).catch(err => {
//   console.log(err)
// })

// async function a (time) {
//   const res = mySetPromiseTimeout()
//   return new Promise((resolve, reject) => {
//     resolve(res)
//     setTimeout(() => {
//       reject('err')
//     }, time);
//   })
// }
// a(2000)

//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve('a')
//     }, 1000)
//   })
function a () {
  return Promise.resolve('a')
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve('a')
  //   }, 2000)
  // })
}
function a1 () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('a1')
    }, 1000)
  })
}
function b () {
  return Promise.resolve('b')
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve('b')
  //   }, 1000)
  // })
}

async function c() {
  const a2 = await a().then(() => {
    return a1().then((resa1) => {
      // console.log(resa1)
      // return a1()
    })
  })
  b().then(resb => console.log(resb))
  console.log(a2)
}
c()