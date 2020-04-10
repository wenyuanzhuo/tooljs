
const originObj = {
  count: 0,
  childObj: {
    count: 1
  },
  arr: [1]
}
let obj = new Proxy(originObj, {
  get: function (target, propKey) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
})
obj.arr = [...obj.arr, 2]