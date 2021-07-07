// 串行  上个任务返回值 -> 下个任务参数
// 偏函数 reduce
class SyncWaterfallHook {
    constructor() {
        this.tasks = []
    }

    tap(name, callback) {
        this.tasks.push(callback)
    }

    call(...args) {
        const [first, ...last] = this.tasks
        let ret = first(...args)
        last.reduce((res, curr) => {
            return curr(res)
        }, ret)
    }

}

const hook = new SyncWaterfallHook()


hook.tap('nick', function(name) {
    console.log(name)
    return `nick说${name}`
})

hook.tap('aaron', function(name) {
    console.log(name)
    return `arron说${name}`
})

hook.tap('nancy', function(name) {
    console.log(name)
})

hook.call('我是谁')