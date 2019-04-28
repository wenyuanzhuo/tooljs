class Emitter {
    constructor() {
        this.event = new Map()
    }
    subscribe(eventName , ck) {
        this.event.has(eventName) || this.event.set(eventName, []) 
        this.event.get(eventName).push(ck) 
    }
    emit(eventName, ...data) {
        const event = this.event.get(eventName)
        event.forEach(element => element(...data) );
    }
    removeSubcribe(eventName, ck) {
        let event = this.event.get(eventName)
        if (!event) { //没有传入订阅消息
            false
        }
        if (!ck) {//全部取消
            this.event.set(eventName, []) 
        } else { // [f1, f2]  if ck === event[i]   
            event.map((item, i) => {
                if (ck === item) {
                    event.splice(i, 1)
                }
            })
        }

    }
}
// const emitters = new Emitter()
// //发布
// const sub1 = emitters.subscribe('click', f1 = () => () => console.log(1))
// const sub2 = emitters.subscribe('click', f2 = () => console.log(1))
// emitters.removeSubcribe('click', f2)
// emitters.emit('click')
// console.log(emitters.event)

/*
 * 发布订阅模式   案例   网站登录
 * 用户登录 ajax 返回信息  可能用于 不同模块  传统的js 功能强耦合性  react中则不需要担心  
 * 解耦  登陆成功 发布事件  其他模块订阅事件
 *   
*/

let listeners = []

const listen = listener => {
    const unlisten = appendListener(listener)
    return () => {
        unlisten()
    }
}

const appendListener = fn => {
    let isActive = true;
    const listener = (...args) => {
        if (isActive) fn(...args)
    }
    listeners.push(listener)
    return () => {
        isActive = false;
        listeners = listeners.filter(item => item !== listener);
    }
}   

const push = (path, state) => {
    listeners.forEach(listener => listener(path, state))
}
const history = {
    push,
    listen,
}
const unlisten = history.listen((localtion, action) => console.log(localtion))
history.listen((localtion, action) => console.log(action))
history.push('/home', { name: 'Aaron'})
unlisten() //移除监听
history.push('/home', { name: 'Aaron'})

const arr = [1, 2, 3]
console.log(...arr)