// function pro(times = 2, changeToSucces = false) {
//   const promise = new Promise((resolve, reject) => {
//     return !changeToSucces ? reject(33) : resolve(22)
//   })
//   return promise.then((v) => {
//     console.log(1,v)
//     return v
//   })
//   .catch((err) => {
//     if (times > 0) {
//       times--
//       console.log('----', times)
//       return pro(times, true)
//     }
//     console.log(1, err)
//     return Promise.reject(err)
//   })
// }
// pro().then((v) => console.log(2, v))

function promise(fn) {
  var value
  var state = 'pending'
  var deferred = null
  this.then = function(onResolved) {
    return new promise(function (resolve) {
      handle({
        onResolved: onResolved,
        resolve: resolve
      })
    })
    
  }
  function handle(handler) {
    console.log('=====', state)
    if(state === 'pending') {
      deferred = handler
      return
    }
    if(!handler.onResolved) {
      handler.resolve(value)
      return
    }
    var newValue = handler.onResolved(value) //上一个then的返回值作为参数 这就是为什么一定要返回
    handler.resolve(newValue)
  }
  function resolve(newValue) { // 成功走的流程 state -> resolve
    if (newValue && typeof newValue.then === 'function') {// newValue是个promise走的逻辑
      console.log(222)
      newValue.then(resolve)
    }
    value = newValue
    console.log('11', newValue)
    state = 'resolved'
    if(deferred) {
      handle(deferred)
    }
  }
  fn(resolve)
}
// function doSomething() {
//   return new promise(function (resolve) { // fn
//     resolve(42)
//   });
// }

// doSomething().then(function(result) {
//   console.log('first result', result);
//   return 88;
// }).then(function(res) {
//   console.log(res)
//   doSomething().then(() => console.log(11111))
//   console.log(333)
//   return 108
// })

function isPromiseThenablejob(newValue) {
  if (newValue && typeof newValue.then === 'function') {// newValue是个promise走的逻辑
    console.log(222)
  }
}
function promiseTypeOf(val) {
  console.log(typeof val)
}
function myTestIsPromiseThenablejob() {
  return new Promise(function (resolve, reject) {
    const promise = Promise.resolve(10)
    isPromiseThenablejob(promise)
    promiseTypeOf(promise)
    resolve({})
    reject({name: '11'})  // 2.3.3.3.3 
  });
}
myTestIsPromiseThenablejob()
  .then((res) => {
    console.log(res)
  })
  .catch(err => console.log(err))
async function doSomething() {
  return new Promise(function (resolve, reject) {
    resolve(42)
  });
}
async function p () {
  await Promise.all([doSomething()]).then((result) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve({
              name: "第2个传递的值"
          })
      }, 3000)
    })
  })
  .then(res => {
    console.log(2222, res)
  })
  .catch(err => console.log(err))
  setTimeout(() => {
    console.log(3333)
  }, 0)
}
// p()





// function p(fn) {
//   let value
//   let state = 'pending'
//   this.then = (onResolved) => {

//     return new p(function () {
//       handle({
//         onResolved: onResolved,
//         resolve: resolve
//       })
//     })
//   }
//   function handle () {

//   }
//   function resolve(newValue) {
//     console.log(newValue)
//     value = newValue
//   }
//   fn(resolve)
// }
// p((resolve) => {
//   resolve(111)
// })