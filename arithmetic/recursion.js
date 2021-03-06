// f(n) = f(n-1) + 1

function f1(n) {
  if (n === 1) return 1
  return f1(n - 1) + 1
}
// console.log(f1(5))

//---------------------------------------------------------------------
// f(1) = 1 2 第一步 1 | 第一步 2

// f(n) = f(n - 1) + f(n - 2)
// n >=3


// f(1) = 1  
// f(2) = 2  (1 1 | 2 0)
// f(3) = 3 (1 1 1 | 1 2 | 2 1)
// f(4) = 5 (1111 112 121 211 22)
// f(5) = 8 (11111 1112 1121 1211 122 221  2111 212)
// f(6) = 13 1(11111 1112 1121 1211 122 221  2111 212) + 2(1111 112 121 211 22)

// 递归代码存在重复计算 把可能重复计算结果缓存
function f2(n) {
  if (n === 1) return 1
  if (n === 2) return 2
  // hasSolvedList可以理解成一个Map,key是n,value是f(n)
  if (hasSolvedList.containsKey(n)) {
    return hasSolvedList.get(n)
  }
  const res = f2(n - 1) + f2(n - 2)
  hasSolvedList.set(n, res)
  return res
}

console.log(f2(6))
//---------------------------------------------------------------------

