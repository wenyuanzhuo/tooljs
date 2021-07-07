// 同步串行 某个失败则跳出任务 

class SyncBailHook {
    constructor() {
        this.tasks = []
    }

    tap(name, callback) {
        this.tasks.push(callback)
    }

    call(...args) {
        //第一次任务执行 如果失败则终止任务
        let res,
            // index = this.tasks.length;
            index = 0;

        do {
            res = this.tasks[index++](...args) // 先进先执行（不出栈）
            // res = this.tasks.pop()(...args) // 先进后出
            // index--
        } while(res !== undefined && index < this.tasks.length)
    }
}

const syncbailhook = new SyncBailHook()

syncbailhook.tap('nick', function(name) {
    console.log('nick', name)
    return name
})

syncbailhook.tap('aaron', function(name) {
    console.log('aaron', name)
    return name
})

syncbailhook.tap('acy', function(name) {
    console.log('acy', name)
})

syncbailhook.call('我是谁')