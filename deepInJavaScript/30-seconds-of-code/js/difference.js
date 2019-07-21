
const difference = (a, b) => {
  const s = new Set(b)
  return a.filter(x => !s.has(x))
}

module.exports = difference


const c = [{"id":25,"card_id":"sign-share","position":"每日签到赚步数","title":"每日签到赚步数","path":"pages/index?from=sign-share",}]
const obj = {
  'inbar': 18, // 1
  'inetail-page': 8, // 1
  'emr': 7, // 1
  'ordss-group': 11, // 1
  'orders-friend': 10, // 1
  'l-page': 6, // 1
  '-lack': 3, // 1
}
const differenceBy = (a, b, fn) => {
  const s = new Set(b.map(fn))
  return a.filter(x => !s.has(x))
}
const a = Object.keys(obj)
console.log(differenceBy(a, c, n => n.card_id ))
