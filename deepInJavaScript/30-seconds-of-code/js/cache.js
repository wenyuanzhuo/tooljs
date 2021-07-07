const querys ={
    wares: 'getWares',
    skus: 'getSku'
}

const promiseCache = new Map()

async function queryAll (queryApiName) {
    // 判断传入的数据是否是数组
    const queryIsArray = Array.isArray(queryApiName)
    // 统一化处理数据，无论是字符串还是数组均视为数组
    const apis = queryIsArray ? queryApiName : [queryApiName]

    // 获取所有的 请求服务
    const promiseApi = []

    apis.forEach(api => {
        // 利用promise 
        let promise = promiseCache.get(api)

        if (promise) {
            // 如果 缓存中有，直接push
            promise.push(promise)
        } else {
            promise = request.get(querys[api]).then(res => {
                // 对res 进行操作 
                }).catch(error => {
                // 在请求回来后，如果出现问题，把promise从cache中删除
                    promiseCache.delete(api)
                    return Promise.reject(error)
                })
            promiseCache.set(api, promise)
            promiseApi.push(promise)
        }
    })
    return Promise.all(promiseApi).then(res => {
        // 根据传入的 是字符串还是数组来返回数据，因为本身都是数组操作
        // 如果传入的是字符串，则需要取出操作
        return queryIsArray ? res : res[0]
    })
}