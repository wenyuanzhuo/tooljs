// function SpectialArray() {
//     const values = new Array()
//     values.push.apply(values, arguments)
//     values.toPipedString = function() {
//         return this.join('|')
//     }
//     return values
// }

// const color = new SpectialArray('red', 'green')
// console.log(color.a())

function extend (sub, sup) {
    var F = function() {}
    F.prototype = sup.prototype
    sub.prototype = new F()
    sub.prototype.constructor = sub
}

function SuperType() {
    this.colors = [ 'red', 'blue', 'green' ]
}
SuperType.prototype.sayName = function () {
    console.log(this.constructor)
}
function SubType() {
    SuperType.call(this)
}

extend(SubType,SuperType)

const instance1 = new SubType()
instance1.sayName()
instance1.colors.push('black')
console.log(instance1.colors)


const instance2 = new SubType()
console.log(instance2.colors)


