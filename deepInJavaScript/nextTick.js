var nextTick = (function () {
  const callbacks = []
  let pending = false
  let timerFunc
  function nextTickHandler() {
    const copy = callbacks.slice(0)
    for(let i = 0; i < copy.length; i++) {
      copy[i]()
    }
  }
  const p = Promise.resolve()
  /*
  * nextTick -> microtask queue
  */

  timerFunc = () => {
    p.then(nextTickHandler).catch((err) => console.error(err))
  }
  return function queueNextTick(cb, ctx) {
    callbacks.push(() => {
      if (cb) {
        try {
          cb.call(ctx)
        } catch (e) {
          console.log('出错了');
        }
      }
    })

    if (!pending) {
      pending = true
      timerFunc()
    }
  }
})();

// 方法调用
nextTick(function () {
  console.log(2); // 打印2
})
console.log(11)
nextTick(function () {
  console.log(3); // 打印2
})
// nextTick 
// 闭包函数 由于nextTick(cb) 的调用结构 所以本身是个立即执行函数 同时立即执行函数可以保护私有属性
// 1. nextTick 将cb push到回调数组 那就有个函数需要遍历执行这个cb 数组
// 2. 关键执行 cb数组的时机 下轮事件队列 p.then (mic)   setTimeout (mac)