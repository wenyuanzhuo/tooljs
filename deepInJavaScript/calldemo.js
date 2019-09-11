var obj = {
  value: 2,
  name: 'obj'
};
var foo = function() {
  console.log(this.value)
}
var bar = function(name, firstname, age) {
  this.name = name
  this.firstname = firstname
  this.age = age
  console.log(222, this)
}
// bar.call(obj, 'Aaron')
Function.prototype.call3 = function(context) {
  console.log(this)
  var self = this || window || global
  context.fn = self;    // .........1 function bar
  var args = [];
  args[0] = arguments[1]
  args[1] = arguments[2]
  context.fn(args[0], args[1]) // ........ 2
  delete context.fn  // .........3
}
//由此可见call/apply 并不是返回一个函数 和bind的不同
// bar.call3(obj, 'Aaron', 'wen')
Function.prototype.bind2 = function (context) {
  var self = this //保存this bar
  var args = Array.prototype.slice.call(arguments, 1) //获取bind2的参数从第二位开始到最后
  var fNOP = function () {};
  fNOP.prototype = this.prototype
  var fBound = function () {
    var bindArg = Array.prototype.slice.call(arguments) //获取返回函数传入的参数
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArg))
  }
  fBound.prototype = new fNOP()
  return fBound
}
var res = bar.bind2(obj, 'Aaron', 'wen')//获取第二位开始的参数 
var f = new res('18') //闭包执行环境 globa 闭包内this指向window   如果new res this指向 实例
console.log(f)
/*
  var obj1 = {
    value: 2,
    foo: function() {
      console.log(this.value)
    }
  };
  obj1.foo()
  delete obj1.foo
  Function.prototype.call2 = function(obj) {
    obj.foo = this;
    obj.foo();
    delete obj.foo
  }
  foo.call2(obj)
*/
//apply(obj, arguments) call(obj, arguments[1], arguments[2],...)


//new Otaku()  newNext(Otaku) 
function Otaku (name) {
  this.name = name
  console.log(this)//Otaku
  // return 1
}
Otaku.prototype.age = 1

function newNext () {
  var obj = new Object()
  var dim = [].shift.call(arguments) //Otake arguments[0]
  obj.__proto__ = dim.prototype //访问Otake原型上的属性
  var answer = dim.call(obj, ...arguments) //改变this 访问Otake上的属性
  return typeof answer === 'object' ? answer :obj
  // return obj
}
// var res = newNext(Otaku, 'Aaron')
// var res = new Otaku('Aaron')
// function o() {
//   this.sex = 'nan'
// }
// o.prototype.name = function() {
//   console.log(11111)
// }
// function create1 (o) {//复制对象 不能访问o原型上的属性
//   function f() {}
//   f.prototype = o
//   return new f()
// }
// var c = create1(o)
 