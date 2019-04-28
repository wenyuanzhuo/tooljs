//iterator遍历器  返回是一个指针对象  遍历器对象   Symbol.iterator = 本对象遍历器生成的函数   *函数
function* name() {
    yield 'hello'; //yield 只能用于 *函数内
    yield 'world';
    yield 123 + 1;
    return false //作为next返回的对象 value
}
const ans = name()   //保持一个指针对象引用
console.log(ans.next())   //next 返回一个对象  
console.log(ans.next())
console.log(ans.next())
console.log(ans.next())
for(const i of name()) {
    console.log(4444, i)
}



function* f() {
    for(var i = 0; true; i++) {
        var reset = yield i;
        if(reset) { i = -1 }
    }
}
const gen = f()
console.log(111, gen.next())
console.log(111, gen.next())
console.log(111, gen.next(true)) //由于next方法的参数表示上一个yield表达式的返回值
console.log(111, gen.next())





function* r(x) {
    let y = 2 * (yield (x + 1))
    let z = yield (y / 3)
    return (x + y + z)
}
const gen1 = r(5)
console.log(222,gen1.next() ) // 5+1 =6
console.log(222,gen1.next(12) ) // 24/3 =8
console.log(222,gen1.next(1) ) //30

//如何第一次调用时，就可以输入参数 闭包 返回函数中 调用 遍历器函数  返回 遍历器对象

const obj = { 'name': 'Aaron', 'old': 'xxx'}
function* objectInterator(obj) {
     let keysArr = Reflect.ownKeys(obj)
     for(const key of keysArr) {
         yield [key, obj[key]]
     }
}

for(let [key, value] of objectInterator(obj)) {
    console.log(`${key}: ${value}`)
}


const g = function* (x, y) {
    let result = yield x + y;
    return result;
  };
  
  const gen2 = g(2, 2);
  console.log(gen2.next()); // Object {value: 3, done: false}
  
  console.log(gen2.next(1));
  