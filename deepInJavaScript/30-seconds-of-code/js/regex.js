
function replace(a, b, c) {
  const regex = new RegExp(b, 'g')
  a = a.replace(regex, c)
  let bool = regex.test(a)
  if (bool) {
    replace(a, b, c)
  } else {
    console.log(2, a)
  }
}
// 量词 + ? *  位置符号 $ ^ 管道符 | 反斜杠 / 分组 [] () 等等
// 匹配时需要添加 \ 符号匹配自身 
replace('qaaabcdefabcg','abc', 'bc')