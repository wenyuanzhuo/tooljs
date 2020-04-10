const tree = [{
  value: 'a',
  children: [{
    value: 'b',
    children: [] 
  }, {
    value: 'c',
    children: [{
      value: 'd',
      children: [{
        value: 'f',
        children: [] 
      }] 
    }] 
  }] 
}, {
  value: 'e',
  children: []
}]
// [[a, [b, [c, [d]]]], [e]]

// function fn(arr, strArr = [], value) {
//   console.log(strArr)
//   if (value) {
//     strArr.push(value)
//   }
//   for(let key in arr) {
//     const item = arr[key]
//     strArr.push(item.value)
//     if (item.children) { 
//       fn(item.children, strArr, item.value)
//     }
//   }
//   return strArr
// }

function func (tree) {
  let strArr = []
  function fn(arr, value) {
    console.log(strArr)
    for(let key in arr) {
      const item = arr[key]
      strArr.push(item.value)
      if (item.children) { 
        fn(item.children, item.value)
      }
    }
  }
  fn(tree)
  return strArr
}
console.log(func(tree))