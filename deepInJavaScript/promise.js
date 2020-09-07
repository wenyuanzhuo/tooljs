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
  this.then = function(onResolved, onRejected) {
    return new promise(function (resolve, reject) {
      handle({
        onResolved: onResolved,
        onRejected: onRejected,
        resolve: resolve,
        reject: reject
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
    if (state === 'resolved') {
      var newValue = handler.onResolved(value) //上一个then的返回值作为参数 这就是为什么一定要返回
      handler.resolve(newValue) 
    }
    if (state === 'rejected') {
      var newValue = handler.onRejected(value)
      handler.reject(newValue) 
    }
  }
  function resolve(newValue) { // 成功走的流程 state -> resolve
    if (newValue && typeof newValue.then === 'function') {// newValue是个promise走的逻辑
      console.log(222)
      newValue.then(resolve, reject)
    }
    value = newValue
    state = 'resolved'
    if(deferred) { // pending reslove执行 往往是个队列需要一个一个shift
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

// doSomething().then().then(function(result) {
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
    const myPromiseReject = Promise.reject('reject')
    isPromiseThenablejob(promise)
    promiseTypeOf(promise)
    resolve(myPromiseReject)
    // reject({name: '11'})  // 2.3.3.3.3 
  });
}
// myTestIsPromiseThenablejob()
//   .then((res) => {
//     console.log('-resolve-',res)
//   })
//   .catch(err => console.log('-reject-', err))



async function doSomething() {
  return new Promise(function (resolve, reject) {
    resolve(42)
  });
}
async function p () {
  const data = await Promise.all([doSomething()])
  await Promise.all([doSomething()]).then(() => {
    return new Promise((resolve) => {
      setTimeout(()=> {
        resolve(22)
      }, 2000)
    })
  })
  // console.log('111', res)
  return doSomething().then((result) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve({
              name: "第2个传递的值"
          })
      }, 0)
    })
  })
  .then((res) => {
    console.log(22, res)
  })
  .then(res => {
    throw Error()
  })
  .then(err => console.log(err))
  .catch(err => {
    return Promise.resolve(1)
  })
}
async function b() {
  const a = await p()
  console.log(a)
}
// b()




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



function NewPromise(executor) {
    let _this = this;
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledFunc = [];//保存成功回调
    this.onRejectedFunc = [];//保存失败回调

    executor(resolve, reject);

    function resolve(value) {
        if (_this.state === 'pending') {
            _this.value = value;
            //依次执行成功回调
            _this.onFulfilledFunc.forEach(fn => fn(value));
            _this.state = 'fulfilled';
            console.log('resolve')
        }
    }

    function reject(reason) {
        if (_this.state === 'pending') {
            _this.reason = reason;
            //依次执行失败回调
            _this.onRejectedFunc.forEach(fn => fn(reason));
            _this.state = 'rejected';
            console.log('reject')
        }
    }
}

NewPromise.prototype.then = function (onFulfilled, onRejected) {
    let self = this;
    if (self.state === 'pending') {
        if (typeof onFulfilled === 'function') {
          console.log(222222)
            return new NewPromise((resolve, reject) => {
                self.onFulfilledFunc.push(() => {
                    let x = onFulfilled(self.value);
                    if (x instanceof Promise) {
                        x.then(resolve, reject)
                    } else {
                        resolve(x)
                    }
                });
            })
        }
        if (typeof onRejected === 'function') {
            return new NewPromise((resolve, reject) => {
                self.onRejectedFunc.push(() => {
                    let x = onRejected(self.value);
                    if (x instanceof Promise) {
                        x.then(resolve, reject)
                    } else {
                        resolve(x)
                    }
                });
            })
        }
    }
    if (self.state === 'fulfilled') {
        if (typeof onFulfilled === 'function') {
            return new NewPromise((resolve, reject) => {
                let x = onFulfilled(self.value);
                if (x instanceof Promise) {
                  console.log(1111111)
                    x.then(resolve, reject)
                } else {
                    resolve(x)
                }
            })
        }

    }
    if (self.state === 'rejected') {
        if (typeof onRejected === 'function') {
            return new NewPromise((resolve, reject) => {
                let x = onRejected(self.reason);
                if (x instanceof Promise) {
                    x.then(resolve, reject)
                } else {
                    resolve(x)
                }
            })
        }
    }
};

let p1 = new NewPromise((resolve, reject) => {
    console.log(1) // 输出 1
    resolve(2);
});

p1.then(x => {
    console.log(x); // 输出 2
    return new Promise((resolve) => setTimeout(() => resolve('async'), 2000))
}).then(x => {
  console.log(x)
})