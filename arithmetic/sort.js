
function bubbleSort (arr, n) {
  if (n < 1) return

  for(let i = 0; i < n ; i++) {
    for(let j = 0; j < n - i - 1 ; j++) {
      if (arr[j] > arr[j + 1]) { //  if arr[j] === arr[j + 1] 不交换位置 所以是稳定排序
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
    console.log(arr)
  }
  return arr
}
// console.log(bubbleSort([5,4,1,2,1], 5))
//---------------------------------------------------------------------
const arr1 = [ 3, 2, 1, 5, 4 ]
function insertSort(arr) {
  const arrLen = arr.length
  for(let i = 1; i < arrLen; i++) {
    let temp = arr[i]
    for (let j = i; j >= 1; j--) {
      if (arr[j - 1] > arr[j]) {
        arr[j] = arr[j - 1]
      } else {
        break
      }
      arr[j - 1] = temp
    } 
    
  }
  return arr
}
// console.log(insertSort(arr1))
//---------------------------------------------------------------------
const swap = (arr, before, after) => {
  const temp = arr[before]
  arr[before] = arr[after]
  arr[after] = temp
}

const partition = (arr, pivot, left, right) => {
  const pivotItem = arr[pivot]
  let i = left
  // 这步操作 为了将小于中间值的数据置于左边 大于中间值的数据置于右边
  for (let j = left; j < right; j++) {
    if (arr[j] < pivotItem) {
      swap(arr, i, j)
      i++
    }
  }
  // 当遍历一遍 j = pivot - 1 此时i的左侧都小于pivot 右侧都大于pivot 令i和pivot换个位置就结束 继续递归
  swap(arr, i, pivot)
  return i
}

function quickSort (arr, left, right) {

  if (arr.length <= 1 || left >= right) return
  // 0 , 7
  let pivot = right
  let partitionIndex = partition(arr, pivot, left, right)
  // left   left = 0
  quickSort(arr, left,  partitionIndex - 1)
  // right right = arr.length
  quickSort(arr, partitionIndex + 1, right)
}



const testArr = []
let i = 0
while (i < 8) {
    testArr.push(Math.floor(Math.random() * 1000))
    i++
}
// console.log('unsort', testArr)
// quickSort(testArr, 0, testArr.length - 1);
// console.log('sort', testArr)

//---------------------------------------------------------------------

function countSort (arr, n) {
  let max = 0
  for(let i = 0; i < n; i++) {
    if(max < arr[i]) {
      max = arr[i]
    }
  }
  // 桶中元素大小相等

  // 第一步 分桶 并且计算每个桶中数量
  const cArr = Array(max + 1).fill(0)
  arr.forEach(ele => {
    cArr[ele]++
  })
  // 第二步 计算 桶中的最后元素 下标 + 1(加了一)
  const cArrCount = cArr.reduce((res, curr, currIndex) => {
    if (currIndex > 0) {
      res[currIndex] = curr + res[currIndex - 1]
    } else {
      res[currIndex] = curr
    }
    return res
  }, [...cArr])
  // 第三步  创建个存下所有元素的数组（排序结果）
  const rArr = Array(n).fill(0)

  // 第四步 桶下标递减赋值
  // 遍历 原数组 对应cArrCount桶的下标 (cArrCount[arr[i] ) 递减
  for (let i = arr.length - 1; i >= 0; i--) {
    cArrCount[arr[i]] = cArrCount[arr[i]] - 1
    rArr[cArrCount[arr[i]]] = arr[i]
    console.log(rArr)
  }
  return rArr
}

console.log(countSort([2, 5, 3, 0, 2, 3, 0, 3], 8))