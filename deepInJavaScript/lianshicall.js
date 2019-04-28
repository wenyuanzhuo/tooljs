// 'use strict'
// var o = function() {
//     var that = (typeof window == 'object' && window.window == window && window) ||
//     (typeof global == 'object' && global.global == global && global);
//     var _ = {}
//     that._ = _ //window._ = _
//     _.reverse = function(string){
//         return string.split('').reverse().join('');
//     }
// }
// o()
// console.log(_.reverse('hello'));


// var _ = function (obj) {
//   if (!(this instanceof _))  return new _(obj) //递归
//   this._wrapped = obj
// }
// console.log(_([1,2]))


(function () {
  var root = (typeof self == 'object' && self.self == self && self) ||
    (typeof global == 'object' && global.global == global && global) ||
    this || {};

  var push = Array.prototype.push

  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

  var isArrayLike = function(collection) {
      var length = collection.length;
      return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  }

  var _ = function (obj) {
    if (!(this instanceof _)) return new _(obj); //return new() { return object}
    this._wrapped = obj;
    // console.log(this)
  }

  root._ = _;

  _.log = function () {
    console.log(1)
  }
  _.functions = function (obj) {
    var names = []
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(obj[key])
    }
    return names
  }
  _.isFunction = function(obj) {
    return typeof obj == 'function' || false;
  }
  _.each = function (obj, callback) {
    var length, i = 0;
    if (isArrayLike(obj)) {
      length = obj.length;
      for (; i < length; i++) {
        if (callback.call(obj[i], obj[i], i) === false) {
          break;
        }
      }
    } else {
      for (i in obj) {
        if (callback.call(obj[i], obj[i], i) === false) {
          break;
        }
      }
    }
    return obj;
  }
  _.chain = function(obj) {
    var instance = _(obj)
    // console.log(instance)
    return instance
  }
  _.prototype.push = function(obj) {
    this._wrapped.push(obj)
    // return _.chainJudgment(this,this._wrapped) 
    return this
  }
  _.prototype.shift = function(num) {
    this._wrapped.shift()
    // console.log(_.chainJudgment(this,this._wrapped))
    // return _.chainJudgment(this,this._wrapped)
    return this
  }
  _.chainJudgment = function(instance, obj) {
    return instance.chain ? _.chain(obj) : obj
  }
  _.prototype.value = function() {
    console.log(this._wrapped)
    return this._wrapped
  }
  _.mixin = function(obj) {
    _.each(_.functions(obj), function (name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function () {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return func.apply(_, args);
      };
    })
    return _;
  }
  _.mixin(_);
})()
// _('Aaron')
_.chain([1, 2, 3]).push(4).shift().value()

/*
1. 如何实现外部引用内部方法？                  一、 ()()  将对象绑定到window  二、闭包    window对象有个window属性指向window -- 判断是否是window   (self/global)
2. 如何将this 由window绑定到 本身的实例对象？   var _ = function() { //this }  通过 return new _()    
3. 如何将绑定在对象上的方法 指向prototype？     (1).获取_上的方法集合[]  (2)_.prototype[name] = function() { return _[name].apply(_)}
4. 如何实现链式调用？                         prototype上方法 改变_对象上的属性作为结果   同时返回this--jquery链式调用的实现
5. 思考:不需要在globalScope上调用 如何实现 this->实例对象？ es6 class  class中this指向实例对象  同时class内的方法都是指向prototype 则不需要上面方法的2 3步骤 链式调用只需要返回 this
*/
