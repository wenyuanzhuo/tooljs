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
  console.log(this === obj)
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
  // var fNOP = function () {};
  var fBound = function () {
    console.log('=====', this, fBound.prototype)
    // console.log(this instanceof fNOP)
    var bindArg = Array.prototype.slice.call(arguments) //获取返回函数传入的参数
    return self.apply(this instanceof self ? this : context, args.concat(bindArg))
    // return self.apply(context, args.concat(bindArg))
  }
  // fBound.prototype = this.prototype //原型链继承 fBound.prototype改变导致绑定函数原型也发生改变
  // fNOP.prototype = this.prototype // create函数继承
  // fBound.prototype = new fNOP()
  var create1 = function(prototype) {
    var f = function() {}
    f.prototype = prototype
    return new f()
  }
  fBound.prototype = create1(this.prototype)
  return fBound
}
// var res = bar.bind2(obj, 'Aaron', 'wen')//获取第二位开始的参数 
// res('18')
// var f = new res('18') //闭包执行环境 globa 闭包内this指向window   如果new res this指向 实例
// console.log(f)
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



// 继承
// function Parent () {
//   this.names = ['kevin', 'daisy'];
// }

// function Child () {

// }
// Child.prototype = Parent.prototype
// Child.prototype = new Parent();

// var child1 = new Child();

// child1.names.push('yayu');

// console.log(child1.names); // ["kevin", "daisy", "yayu"]

// var child2 = new Child();

// console.log(child2.names); // ["kevin", "daisy", "yayu"]

//--------------------------------------------------------
function Parent () {
  this.names = ['kevin', 'daisy'];
}
Parent.prototype.getName = function () {
  console.log(this.names)
}
function Child () {
  Parent.call(this); // 每次实例化都创建 一遍Parent上的方法 属性，同时原型也没有绑定
}
// 1. 污染父子原型 导致相互影响
// Child.prototype = Parent.prototype

// 2. 对于1的解决办法——创建个空函数，原型指向父函数的原型（作用：避免Call重复创建，同时避免父子函数原型指向同一个对象）

// 换句话说 通过污染F函数的原型（F函数外作用域读取不到，所以无所谓，但是还是要占用内存的），c实例__proto__ => F.prototype => P.prtototype
function create1 (_prototype_) {
  function F () {}
  F.prototype = _prototype_
  return new F()
}
Child.prototype = create1(Parent.prototype)

Child.prototype.childGetNames = function () {
  console.log(11111)
}
var child1 = new Child();
// child1.names.push('yayu');
// child1.getName()
// child1.childGetNames()

// console.log(child1.names); // ["kevin", "daisy", "yayu"]

// var child2 = new Child();

// console.log(child2.names); // ["kevin", "daisy"]