
ES6
========================

## Symbol
  Symbol独一无二
  - 应用场景
    > object只关心 key or values
    ```
    const switchType = {
      a: Symbol(),
      b: Symbol(),
    }
    function chooseType () {
      let area
      switch (type) {
        case switchType.a:
          area = 1
          break
        case switchType.b:
          area = 2
          break
      }
    }

    ```

  ## this
  1.memberExpression 属性访问表达式 ---  ()的左边 ref = memberExpression
  2.reference  ---  base Value 属性所在对象  name propertyNameString
  3.IsPropertyReference(ref) 是 true --- 当 ref 的 base Value 是对象而非 EnvironmentRecord  
  ```
    2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)

    2.2 如果 ref 是 Reference，并且 base value 值是 Environment Record, 那么this的值为 ImplicitThisValue(ref)

    2.3 如果 ref 不是 Reference，那么 this 的值为 undefined
  ```

  ## promise
  - promise是个微任务(异步任务)
  - 在同步任务,在（process.nextTick()）之后执行
  ```
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
      if(!handler.onResolved) { // then的回调不存在 就直接将上一跳的值返回
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
      if (newValue && typeof newValue.then === 'function') { // newValue是个promise走的逻辑
        console.log(222)
        newValue.then(resolve, reject)
      }
      // 如何引入微任务也就是promise魔法的所在 而魔法也就在resolve中 （这里伪函数并未有微任务的触发）
      value = newValue
      state = 'resolved'
      if(deferred) { // then注册的方法  reslove执行的真正地方
        handle(deferred)
      }
    }
    fn(resolve)
  }
  ```
  then方法的作用
  - 1.将then(fn)中的回调执行的返回值 赋值给resolve的参数 (也就是下一跳的参数)
  - 2.通过在then执行handle函数 通过state 判断需要执行的行为 (由此也知道状态改变了就不会再变的原因)
  