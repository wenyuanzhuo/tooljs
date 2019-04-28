const proxy = new Proxy({}, {
    get: function(target, property) {
        return 35
    }
})
console.log(proxy.time)

function create1 (o) {//复制对象 不能访问o原型上的属性
  function f() {}
  f.prototype = o
  return new f()
}
var c = create1(proxy)  
console.log(c)

