

function CancelToken(executor) {
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve
    })
    executor(function cancel(message) {
        console.log(message)

        resolvePromise(message)
    })
}

// --------------------------------------------------------------------------------------------------------------

CancelToken.source = function source() {
    let cancelFn
    const cancelToken = new CancelToken(function executor(c) {
        cancelFn = c
    })

    return {
        cancelFn,
        token: cancelToken
    }
}

const source = CancelToken.source()

// source.token.promise.then(res => {
//     console.log(res)
// })


const apiMockBy1000ms = new Promise((resolve) => {
    setTimeout(() => {
        resolve('one data 1000ms')
    }, 1000)
})

const apiMockBy500ms = new Promise((resolve) => {
    setTimeout(() => {
        resolve('one data 500ms')
    }, 500)
})

apiMockBy500ms.then((res1) => {
    console.log(res1)
    source.cancelFn('执行了')
})

apiMockBy1000ms.then((res2) => {
    console.log(res2)
    source.token.promise.then(res => {
        console.log(res)
    })
})

// --------------------------------------------------------------------------------------------------------------