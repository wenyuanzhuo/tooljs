


function jieliu(func, wait) {
  let _this, args, previous = 0
  let now = +new Date()
  return function() {
    _this = this
    args = arguments
    if (now - previous >= wait) {
      func.apply(_this, args)
      previous = now
    }
  }
}

function jieliu2(func, wait) {
  let _this, args, timer
  return function() {
    _this = this
    args = arguments
    if (!timer) {
      timer = setTimeout(function() {
        func.apply(_this, args)
        timer = null
      },wait)
    }
  }
}
function jieliu3(func, wait) {
  let _this, args, timer, timestamp = 0
  const later = function() {
    timer = null
    timestamp = +new Date()
    func.apply(_this, args)
  }
  return function() {
    let now, remain
    now = +new Date()
    _this = this
    args = arguments
    remain = wait - (now - timestamp)
    if (remain <= 0) { // 第一次立即执行
      timestamp = now
      func.apply(_this, args)
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    } else if (!timer) {
      timer = setTimeout(later,wait)
    }
    // if (now - timestamp >= wait) {
    //   if(timer) {
    //     clearTimeout(timer)
    //     timer = null
    //   }
    //   timestamp = now
    //   func.apply(_this, args)
    // } else if (!timer) {//立刻执行
    //   timer = setTimeout(later,wait)
    // }
  }
}

var count = 1;
var container = document.getElementById('container');
function getUserAction(e) {
  console.log(e)
  container.innerHTML = count++
}
function debounce(func, wait, immediate) {
  var timer
  return function () {
    var context = this
    var arg = arguments 
    
    if (timer) clearTimeout(timer)
    if (immediate) {
      var fire = !timer
      timer = setTimeout(function() {
        timer = null
      }, wait)
      if (fire) {
        func.apply(context, arg)
      }
    } else {
      timer = setTimeout(function() {
        func.apply(context, arg)
      }, wait)
    }
    
  }
}
// debounce(func, 2000)()
container.onmousemove = debounce(getUserAction, 3000, true);
// 立刻触发 wait时间后 再移动触发  immediate = true
// wait时间后触发                immediate = false


// 节流和防抖  节流----一段时间触发一次                防抖----行为结束后一段时间触发
// 本质区别   节流-------时间器的回调里将时间器指向null 防抖-----在触发的时候就清除时间器
