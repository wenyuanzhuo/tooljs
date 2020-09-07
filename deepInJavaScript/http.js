const faker1 = () => Promise.resolve(2)
const faker2 = () => Promise.resolve(2)

function execute () {
    return new Promise((okCallback, errorCallback) => {
    
        faker1().then((response) => {
    
            faker2().then((resData) => {
                if (response === 1) {
                    console.log('ok', okCallback, errorCallback)
                    okCallback(resData);
                } else {
                    console.log('err', errorCallback)
                    errorCallback && errorCallback({code: 500, message: response});
                }
    
            }).catch((error) => {
                errorCallback && errorCallback({code: 500, message: '服务器开了个小差'});
                return;
            });
        }).catch((error) => {
            errorCallback && errorCallback({code: 500, message: '网络异常,请检查网络' + error});
        });
    });
}

// execute().then((res) => {
//     console.log('success', res)
//     return res
// }).catch(err => {
//     console.log('外部catch error', err)
// })

execute().then((res) => {
    console.log('success', res)
    return res
}, err => {
    console.log('外部catch error', err)
})

