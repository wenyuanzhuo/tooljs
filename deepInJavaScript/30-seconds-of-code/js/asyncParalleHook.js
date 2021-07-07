class AsyncParralleHook {
    constructor() {
      this.tasks = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task);
    }


    callAsync(...args) {
        let i = 0
        const callBack = args.pop()
        let done = () => {
            i++
            if (i === this.tasks.length) {
                callBack()
            }
        }

        this.tasks.forEach(task => {
            task(...args, done)
        })

    }
}

const hook = new AsyncParralleHook()


 
hook.tapAsync("react", function(name, cb) {
  setTimeout(() => {
    console.log("react", name);
    cb();
  }, 1000);
});
hook.tapAsync("node", function(name, cb) {
  setTimeout(() => {
    console.log("node", name);
    cb();
  }, 2000);
});
hook.callAsync("musion", function() {
    // 前面两个执行完再执行这个
    console.log("end");
});

// let promise1 = new Promise(function(resolve) {
//     resolve(1);
//   });
//   let promise2 = new Promise(function(resolve) {
//     resolve(2);
//   });
//   let promise3 = new Promise(function(resolve, reject) {
//     reject(3);
//   });


// const all = function(promises) {
//     return new Promise(function(resolve, reject) {
//         let resolvedCount = 0
//         let promiseNum = promises.length
//         let result = new Array(promiseNum)
//         for (let i = 0; i < promiseNum; i++) {
//             promises[i].then((res) => {
//                 resolvedCount++
//                 result[i] = res
//                 if (resolvedCount === promiseNum) {
//                     resolve(result)
//                 }

//             }).catch((err) => reject(err))
//         }
//     });
//   }

// const fakerPromiseAll = all([promise1, promise2, promise3])

// fakerPromiseAll.then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log('err', err)
// })