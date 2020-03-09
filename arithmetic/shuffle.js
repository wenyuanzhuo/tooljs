// 将目标数组中的数随机抽出一个 目的数组push该数 （摸牌算法）
// var team = [1,2,3,4]
// var res = [];
// for (var i = 0, len = team.length; i < len; i++) {
//   // 随机叫个
//   var randomIndex = Math.floor(Math.random() * team.length);
//   console.log(randomIndex, team)
//   // 出列到新队伍
//   res[i] = team[randomIndex];
//   // 原来的队伍人越来越少，因此上面的 randomIndex 需要实时获取 team.length
//   team.splice(randomIndex, 1);
// }
// console.log(res);


// var times = [0, 0, 0, 0, 0];

// for (var i = 0; i < 100000; i++) {
    
//     let arr = [1, 2, 3, 4, 5];
    
//     arr.sort(() => Math.random() - 0.5);
    
//     times[arr[4]-1]++;

// }

// console.log(times)

function insertArrs(arr) {
  for (var i = 1; i < arr.length; i++) {
    let temp = arr[i]
    for(var j = i; j >= 1; j--) {
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
console.log(insertArrs([5, 4, 3, 2, 1, 5]))

