const compose = (...chain) => {
  return (arg) => chain.reduceRight((composed, f) => f(composed(arg)))
}
console.log(compose((f) => f + 1, (g) => g + 1)(1))
function appleMiddleware([...middlewares]) {
  const store = {
    dispatch(action) {
      console.log(action)
      return action
    }
  }
  let dispatch = store.dispatch
  var api = {
    dispatch: (action) => dispatch(action)
  }
  const chain = middlewares.map(middleware => middleware(api))
  dispatch = compose(...chain)(store.dispatch)
  return {
    dispatch
  }
}

const thunkMiddleware = ({ dispatch }) => {
  return next => action => {
    console.log('enter 1')
    if (action.type === 'ENTER') {
      dispatch({ type: 'ENTER_NEXT'})
      return
    }
    return next(action)
  }
}
const createMiddleware = ({ dispatch }) => {
  return next => action => {
    console.log('enter 2')
    if (action.type === 'ENTER') {
      console.log('中途拦截dispatch 发送个新的dispatch指令， 就不应该往下继续了')
    }
    return next(action)
  }
}

const store = appleMiddleware([thunkMiddleware, createMiddleware])
store.dispatch({ type: 'ENTER'})