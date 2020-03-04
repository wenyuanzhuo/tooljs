
react
===========================

## react-redux
  解决的痛点————redux创建状态库store, store.getState() 只能通过state上的属性作为props，向下传递，一旦组件层级过深，操作将十分麻烦。
  
  于是<strong>react-redux</strong>孕育而生, Provider、connect 是最重要的两个方法
  ```
  // root.js
  class Root extends React.Component {
    _store: Store<any>;
    render() {
      return (
        <Provider store={this._store}>
          <App />
        </Provider>
      );
    }
  }

  // app.js
  class App extends React.Component {}

  const mapStateToProps = state => {
    return {nav: state.router};
  };

  export default connect(mapStateToProps)(App);
  ```
  通过在根组件 Provider 组件设置 store 作为整个顶层组件的 context，其下所有子孙节点组件都可以获取到这个 store 对象树的数据。那接下来 connect 做的事情其实就很明了了，即 connect 首先执行的是一个 HOC，在这个高阶组件中，connect 接下来把 mapStateToProps 和 mapDispatchToProps 里的返回的属性，连同通过 context 获取到的 store 一起，过滤包装 store 数据最终传递给了被包裹的组件，connect 不会修改传递给它的组件类，相反它返回一个新的、被连接的组件类供开发者使用。

  <strong>最后 connect 通过 redux store 的 subscribe API 来监听数据的变化，通过 shallowEqual 对比之前组件缓存的 props 和新计算出的属性，来决定是否需要更新组件，即重新将 args 里边的 props 传递给第二个被传入的 Component，达到更新组件的目的。</strong>
 
  ```
  // We'll run this callback every time a store subscription update propagates to this component
  const checkForUpdates = () => {
    const latestStoreState = store.getState()
    // If the child props _did_ change (or we caught an error), this wrapper component needs to re-render
    if (newChildProps !== lastChildProps.current) {
      forceComponentUpdateDispatch({
        type: 'STORE_UPDATED',
        payload: {
          latestStoreState,
          error
        }
      })
    }
  }
  // Actually subscribe to the nearest connected ancestor (or store)
  subscription.onStateChange = checkForUpdates
  subscription.trySubscribe()
  ```
  
  ```
  Thu Feb 27 2020 01:01:35 GMT+0800 (中国标准时间)
       redux :  dispatch -> 通知reducer更新 -> 同时通知subscribe订阅者 执行订阅者的回调（这是在回调获取的肯定是更新过的store ps: 这就是一个emitter）
  react-redux:  作用就是  给予组件dispatch的能力（更新store）+ 创建subscribe订阅者（获取更新的store更新组件状态）
  ```
  
  ## react16.6性能优化
  1. memo()缓存策略