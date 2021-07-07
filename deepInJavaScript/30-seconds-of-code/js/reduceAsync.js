/*
 * Filename: reduceAsync.js
 * 
 * Author: 温远卓
 * Copyright (c) 2021 Shanghai Yu Chong Network Technology Co., Ltd.
 * Version: 19-02-02021 6:07:6
 */

// [fn1, fn2, fn3].reduceAsync(options)


Array.prototype.reduceAsync = function (options) {
    return this.reduce((prom, currCall) => prom.then((acc) => currCall(acc)).catch(acc => acc), Promise.resolve(options))
}
