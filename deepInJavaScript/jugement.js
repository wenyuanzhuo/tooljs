// null typeof  Object
// var a = null
// console.log(Object.prototype.toString.call(undefined))
// console.log(Object.prototype.toString.call(a))

// function isArrayLike(obj) {//数组 或者类数组

//     var length = !!obj && "length" in obj && obj.length;
//     var typeRes = type(obj);

//     if (typeRes === "function" || isWindow(obj)) {
//         return false;
//     }

//     return typeRes === "array" || length === 0 ||
//         typeof length === "number" && length > 0 && (length - 1) in obj;

// }
//数组 类数组 （有length属性） arguments(类数组)  [1,2] [, , 1] [11, 1,] 所以数组最后一位要存在

var arr = [1, 2]
arr.length = 2
var func = (function (a, b, c) {
    var arr = arguments
    return arr
})(1, 2, 4)
console.log(func)
if (func.length && typeof func.length === 'number' && (func.length - 1) in func && typeof func === 'array') {
    console.log(1)
}
// if (arr.length && typeof arr.length === 'number' && (arr.length - 1) in arr) {
//     console.log(1)
// }