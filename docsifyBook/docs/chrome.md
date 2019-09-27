
## 预解析
要计算延迟编译函数本身是否需要上下文，我们需要再次执行范围解析：我们需要知道嵌套在惰性编译函数中的函数是否引用了惰性函数声明的变量。我们可以通过重新预先准备这些功能来解决这个问题。这正是V8在V8 v6.3 / Chrome 63上所做的。虽然这在性能方面并不理想，因为它使源大小和解析成本之间的关系非线性：我们会将函数预先分析为嵌套的多次。除了动态程序的自然嵌套之外，JavaScript打包器通常将代码包装在“ 立即调用的函数表达式 ”（IIFE）中，使得大多数JavaScript程序具有多个嵌套层。

## IntersectionObserver
chorme 51+ 异步web api 交叉观察器
> 代替传统 监听scroll + 节流 处理滚动事件
```
var io = new IntersectionObserver(callback, option)
io.observe(element) // 开始观察
io.unobserve(element) // 停止观察
io.disconnect() // 关闭观察器

```
> callback一般会触发两次。一次是目标元素刚刚进入视口（开始可见），另一次是完全离开视口（开始不可见）

## 浏览器 渲染
1. js 阻塞dom的解析（parse）和渲染（render）
  > - script 置于heard（添加defer) ----延时执行 domContentLoaded(dom 和css都准备好了， 很多script框架的<strong>onLoad事件都是在此事件之后</strong>)
  > - 其他script置于body底部 (等待dom解析完全，可以避免阻塞dom解析)

### css的两点作用——第一个是提供给 JavaScript 操作样式表的能力，第二为布局树的合成提供基础的样式信息
2. css阻塞js执行从而阻塞dom的解析，css同样也会阻塞dom渲染
  > - 浏览器不知道js中是否操作了css,所以遇到js(script),都会等待css的加载
  > - css加载是在另外线程
```
如果css不阻塞dom渲染 —— 后果是什么
1. dom解析完,js执行完,渲染完 ———— 此时css可能还在加载也可能cssom还未解析完，等待cssom准备好，就会重渲导致屏幕闪烁

通过css的第一点作用，js需要操作css 且浏览器不知道js中是否操作了css，所以css需要加载完 那么阻塞js执行就显而易见了
```

总结 css应该放在heard和dom并行加载，js应该放置body底部最后加载。如果是不必要的js应当defer延迟加载，非首页js应该利用前端框架模块化 动态加载