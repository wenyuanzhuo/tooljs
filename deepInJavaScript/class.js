


// class Point {
//   constructor(...args) {
//     this.args = args
//     this.printName = (name = 'there') => {
//       this.print(`Hello ${name}`);
//     }
//   }
//   * [Symbol.iterator] () {
//     for (let arg of this.args) {
//       yield this.toString(arg)
//     }
//   }
//   toString(val) {
//     return  `--${val}--`
//   }

//   print(text) {
//     console.log(text);
//   }

// }
// const logger = new Point();

// 解构原型链丢失 需：箭头函数绑定
// const { printName, print } = logger;
// printName();

// 原型链注入
// let proto = Object.getPrototypeOf(new Point())
// proto.printName = function () { return 'aaron' }
class Point {
  constructor(x, y) {
    this.x = 'point'
    this.y = y
  }
  toString() {
    return this.x
  }
}
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y)
    this.x = 'colorPoint'
    this.color = color
  }
  toString() {
    return this.x
  }
  m() {
    return console.log()
    // return console.log(Point.prototype.toString.call(this))
  }
}

const child = new ColorPoint(1, 2, 'red')
child.m()
function a() {}
const b = new a()
// console.log(Object.getPrototypeOf(ColorPoint)) // [Function: Point]
// console.log(Object.getPrototypeOf(ColorPoint) === ColorPoint.prototype.__proto__.constructor) // true
// console.log(ColorPoint.prototype.__proto__.constructor === Point) // true

 // 伪代码
 var _createClass = (function () {
  function defineProperties (target, props) {
    for (let i = 0; i < props.length; i++) {
      var descriptor = props[i]
      // set descriptor's enumerable configurable writable
      // get descriptor.key return protoFunc
      Object.defineProperty(target, descriptor.key, {
        value: descriptor.value
      })
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
  }
})()
var A = (function () {
  function A (x) {
    console.log(this, x)
    this.x = x
  }
  _createClass(A, [{
    key: 'getName',
    value: function getName () {
      return this.x
    }
  }], [{}])
  return A
})()

const a = new A(11)
console.log(a.getName)
