
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

3. domInteractive domContentLoaded domComplete
> - domInteractive 表示完成全部 HTML 的解析并且 DOM 构建完毕， （重要的性能指标——构建完说明可能阻塞dom解析与dom树构建过程结束）
> - domContentLoaded 表示 DOM 与 CSSOM 皆已准备就绪， （defer 脚本执行） -> 准备渲染  jquery的ready方法，其实监听的就是 DOMContentLoaded 事件  
> - domComplete 表示所有的处理都已完成并且所有的附属资源都已经下载完毕(页面上所有的资源（图片，音频，视频等）被加载以后才会触发load事件)


## 透过动画看优化

### 显示器如何显示图像

- 帧—— 渲染一张图
- 帧率—— 一秒内渲染的帧数
- 图的来源—— 显卡前缓冲区
- 显卡—— 合成图像，将合成图像写到后缓冲区，再将后缓冲区和前缓冲区对调，以保证图的来源新鲜

显示器每秒读取前缓冲区内的帧率数的图片，显示到机器上。所以显卡处理图片的效率直接影响显示的流畅度。

### 如何生成一帧图
- 重排—— 效率最低 （比如：页面的缩放拉伸，页面内字体的大小都会导致重排），它需要重新根据 CSSOM 和 DOM 来计算布局树，这样生成一幅图片时，会让整个渲染流水线的个阶段都执行一遍，如果布局复杂的话，就很难保证渲染的效率了。
- 重绘—— 效率也很低（比如：页面元素背景颜色改变） 不用重新布局，但是仍然要绘制元素属性
- 合成—— 效率最高，在单独线程进行，不影响主线程，同时还可以采用GPU加速

### 如何进行合成操作

在chrome中，可以用三个词来概括总结：<strong>分层、分块和合成</strong>

- 分层—— 类似ps中的图层，渲染引擎还需要为特定的节点生成专用的图层，并生成一棵对应的图层树，图层树的节点包含图层(节点拥有图层需要满足以下两个条件中的任意一个)，之后就是绘制图层列表（当然不是绘制图片）
> 拥有层叠上下文属性的元素会被提升为单独的一层

> 需要剪裁（clip）的地方也会被创建为图层
- 光栅化—— 通过分层绘制的图层列表，生成图片，发送至显卡后缓冲区
- 合成——合成线程上完成的，这也就意味着在执行合成操作时，是不会影响到主线程执行的。这就是为什么经常主线程卡住了，但是 CSS 动画依然能执行的原因。

- 分块—— 图层分割为固定大小的图块，如果优先绘制的图块仍然很消耗时间怎么办？纹理上传
> 为什么分块？—— 页面通常很大，一个屏幕占不全，优化策略分块就展示首先靠近视窗的部分，所以切割分块，以大大加速页面的显示速度。

> 纹理上传 ? —— 先合成低分辨率图，然后在线程空闲时异步绘制原分辨率图,在图片加载优化方面也用到类似的优化策略，也就是通常看到的图片渐渐清晰的策略。

### 利用分层合成技术 绕过js高效优化代码?

在上文<strong>如何生成一帧图</strong>中，可以知道应该避免重排重绘，来生成一帧图。
> 场景——某个元素做几何形状变换、透明度变换或者一些缩放操作？

> 方案 1. js处理——涉及到 cssom树的解析-生成布局树-布局-绘制...等等整个渲染流程，效率低。

>方案 2. 分层合成处理—— 具体操作：通过以下操作告知渲染引擎通过合成线程直接处理这些特效变换，完全没有经过一般的渲染流程
```
will-change: transform;
```

通过方案2可以知道，css的动画比js动画高效很多的原因。will-change是个典型的空间换时间的方法，有因必有果，通过独立层进行合成操作，这是很占用内存的，同时这个方法处理不好会造成内存泄漏，需要合理的使用。


----------------

接下来讨论如何在页面加载完，在交互中优化代码？

### 优化js代码，减短执行时间
- 节流     防抖     异步    web worker
### 避免强制同步布局

- 改变dom元素，同时在该任务中 强制进行计算与布局操作

### 减少创建临时对象，以免频繁触发垃圾回收
- ts 保持数据结构的正确，可以减少解构创建过多临时对象

### 少使用js动画 尽量使用css合成动画， will-change合理使用
- will-change 浅析 // TODO


-----------

why 虚拟Dom ?

操作dom导致 触发样式计算、布局、绘制、栅格化、合成等任务（重排）

- react Fiber —— 

```
Fiber node structure
{
    stateNode: new ClickCounter,
    type: ClickCounter,
    alternate: null,
    key: null,
    updateQueue: null,
    memoizedState: {count: 0},
    pendingProps: {},
    memoizedProps: {},
    tag: 1,
    effectTag: 0,
    nextEffect: null
}
// 第1阶段 render/reconciliation
  通过 window.requestIdleCallback() 方法 通知主线程在 空闲时执行低优先级任务（这里的低优先级任务 就是diff 任务)

  [UNSAFE_]componentWillMount
  [UNSAFE_]componentWillReceiveProps
  [UNSAFE_]componentWillUpdate
  getDerivedStateFromProps
  shouldComponentUpdate
  render
```
- nextUnitOfWork
- performUnitOfWork
```
function performUnitOfWork(workInProgress) {
  let next = beginWork(workInProgress);
  if (next === null) {
      next = completeUnitOfWork(workInProgress);
  }
  return next;
}

```
- beginWork
```
function beginWork(workInProgress) {
  console.log('work performed for ' + workInProgress.name);
  return workInProgress.child;
}
```
- completeUntiOfWork
```
function completeUnitOfWork(workInProgress) {
  在完成当前fiber的工作之后，它将检查是否有兄弟节点
  如果找到，React退出函数并返回指向同级的指针
  它将被分配给nextUnitOfWork变量，React将执行从这个兄弟节点开始的分支的工作
  重要的是要理解，此时React只完成了前面的兄弟姐妹的工作（beginWork就是处理sibling节点，如果有子节点就返回该节点的子节点）

  while (true) {
    let returnFiber = workInProgress.return;
    let siblingFiber = workInProgress.sibling;

    nextUnitOfWork = completeWork(workInProgress);

    if (siblingFiber !== null) {
        // If there is a sibling, return it
        // to perform work for this sibling
        return siblingFiber;
    } else if (returnFiber !== null) {
        // If there's no more work in this returnFiber,
        // continue the loop to complete the parent.
        workInProgress = returnFiber;
        continue;
    } else {
        // We've reached the root.
        return null;
    }
  }
}
```
- completeWork
```
function completeWork(workInProgress) {
  console.log('work completed for ' + workInProgress.name);
  return null;
}
```
--------------
// 第2阶段 commit 同步
  完成vdom 到真实dom的更新 同步一次完成 不能暂停

  getSnapshotBeforeUpdate
  componentDidMount
  componentDidUpdate
  componentWillUnmount

两颗tree 一个effect list
- 一棵tree 是当前屏幕状态的树
- 一棵是这次渲染 render phase阶段构建的side-effect树（fiber节点 单链表树结构）
- effect list（commit需要迭代的节点集合-diff 节点）render phase阶段运行过的结果


### http 演化

  - http 0.9
  > 请求很简单——无请求头请求体， 响应服务器同样没有，ASCII 字符流
  - http 1.0
    >特性
    1. 支持多种编码
    2. 拥有请求头、请求体
    3. content-encoding 数据压缩的格式（为了减轻传输性能，服务器会对数据进行压缩后再传输）
    4. 状态码 Cache缓存机制 User-Agent用户代理
  - http 1.1
    >特性
    1. keep-alive持久连接（一个 TCP 连接上可以传输多个 HTTP 请求）
    2. host 支持虚拟主机服务 （不同的域名可以，公用一个ip）
    > ps: 当然host 并不是代表一个ip可以配置无限个域，健硕的具有强大的容灾的系统，一定是有个好的dns服务架构
    3. 支持动态内容 1.0中对于数据都是固定大小的，1.1中通过chunk分割数据（一个个数据块）传输
    4. cookie和安全机制

    >存在的问题 
    1. Tcp慢启动
    2. 多Tcp连接
    3. 队头阻塞
  - http 2.0
    >特性
    1. Tcp 一个域名只产生一个
    2. 应用层级别多路复用
    3. 设置请求优先级
    4. 服务器推送
    5. 头部压缩
    6. 二进制分帧层
    >存在的问题 
    1.传输层队头阻塞
    2.3次握手的问题（RTT）
    3. TLS加密 花费的时间
  - http 3.0
    >特性
    1. quic协议-基于UDP协议实现
    ```
      如何解决传输层队头阻塞？
        > 多条数据链路 （带有不同标识的数据包，独立数据流）充分利用带宽
      如何解决3次握手?
        > 基于UDP 无需3次握手（减少RTT）
    ```
    >存在的问题 
    1.中间设备 对 UDP 的优化程度远远低于 TCP
    2.目前丢包率太高


### 同源策略

  - csp
    
    CSP 的核心思想是让服务器决定浏览器能够加载哪些资源，让服务器决定浏览器是否能够执行内联 JavaScript 代码
  - cors （跨域资源共享-现代浏览器支持）
    
    jsonp (兼容性很好，老版本ie也可以兼容)

    websockets (不受同源策略影响) —— 全双工

  - 跨文档消息机制

    不同源之间的DOM通信 （window.postMessage - html5）

### xss 攻击
  - 存储型
  - 反射型
  - DOM型

    1.修改页面数据

    2.传输过程页面劫持

### CSRF 攻击
  - 必要条件
    1. 目标站点有CSRF漏洞

    2. 用户需要登陆过目标站点，并保持登录态

    3. 需要用户点击打开黑客站点

  - 防御方案

    1. http响应头 设置SameSite
    2. 验证请求源 origin/referer
    3. token机制（类似单点登录）

### HTTPS

  方案的演化

    1. 对称加密 （速度快）-- 伪装server
      用一把秘钥加密，中间人也可以得到秘钥，不安全
    2. 非对称加密 （速度慢，数据安全） -- 伪装client
      只有唯一私钥可以解开，公钥加密的内容，中间人得不到私钥,但是server不知道client是谁,client可以是中间人伪造，不安全
    3. 对称加密 + 非对称加密
      如二类似，无法确认 server， client是不是中间人伪造的
    4. 对称加密 + 非对称加密 + 证书
      证书 ——
         证书 = 数字签名（A） + 发送者信息包括公钥[非对称加密公钥]]（B）
         A = B1 + CA私钥加密过程（C）
         ps核心: 通过CA中心拿到CA公钥(这个必须正确，这个就是中间得不到的秘钥的关键部分)
         用CA公钥 解开A 判断 B1和 B是否相等

      传输：—— 
        B1 = B 说明非对称加密公钥安全 这样 server和client都知道了非对称加密公钥(且只有双方知道)
        后就可以用这个秘钥用来对称加密传输数据

      总结：
        在有证书的保障下
        非对称加密用来传在证书中的公钥（中间人得不到)
        对称加密用只有client和server知道的公钥传输数据

        证书中心是在操作系统中


    