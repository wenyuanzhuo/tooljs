
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