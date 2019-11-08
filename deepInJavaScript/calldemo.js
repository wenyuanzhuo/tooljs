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
  console.log(222, this, this.value)
}
bar.prototype.friend = 'AYZ'
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
  var fBound = function () {
    console.log(this instanceof self)
    console.log(this instanceof fNOP)
    var bindArg = Array.prototype.slice.call(arguments) //获取返回函数传入的参数
    self.apply(this instanceof self ? this : context, args.concat(bindArg))
    // self.apply(context, args.concat(bindArg))
  }
  // fBound.prototype = this.prototype //原型链继承 fBound.prototype改变导致绑定函数原型也发生改变
  fNOP.prototype = this.prototype // create函数继承 寄生继承？
  fBound.prototype = new fNOP()
  return fBound
}
var res = bar.bind2(obj, 'Aaron', 'wen')//获取第二位开始的参数 
// res('18')
var f = res('18') //闭包执行环境 globa 闭包内this指向window   如果new res this指向 实例
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
  console.log(answer)
  return typeof answer === 'object' ? answer :obj
  // return obj
}
// var res = newNext(Otaku, 'Aaron')
// var res = new Otaku('Aaron')

function create1 (o) {
  function F() {}
  F.prototype = o;
  return new F();
}
function Parent (name) {
  this.names = ['kevin', 'daisy', name];
  this.colors = ['red']
}
Parent.prototype.getName = function () { console.log(this.name) }
function Child (name) {
  Parent.call(this, name)
  this.name = name
}
function myExtends (child, parent) {
  var prototype = create1(parent.prototype)
  prototype.constructor = child
  child.prototype = prototype
}
// var b = new Child('parent')
// b.names.push('parent')
// myExtends(Child, Parent)
// var a = new Child('child')
// console.log(a)