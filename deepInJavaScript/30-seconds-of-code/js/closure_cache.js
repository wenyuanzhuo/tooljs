/**
 * 
 * 无闭包缓存
 */

Function.prototype.memorized = function() {
    this._value = this._value || {}
    console.log('prototype', arguments)
    var key = Array.prototype.slice.call(arguments, 0, 1)[0]
    
    return this._value[key] !== undefined
    ? this._value[key]
    : this._value[key] = this.apply(this, arguments)
}

function add(a) {
    return a + 1
}

// console.log(add.memorized(5))
// console.log(add._value)
// console.log(add.memorized(1))
// console.log(add._value)

/**
 *  闭包优化 无需调用原型上的方法
 */



function memo(fn) {
    return function() {
        console.log('arguments', arguments)
        fn.memorized.apply(fn, arguments)
        // fn.memorized(...arguments)
    }
}

var addMemo = memo(add)

addMemo(1)
console.log(add._value)
addMemo(2)
console.log(add._value)

