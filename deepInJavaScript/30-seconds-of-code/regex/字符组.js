var regex1 = /\d{2,5}?/g

var str1 = '1231234 12345'
console.log(str1.match(regex1))

var regex2 = /\d{2,}?/g

var str2 = '1231234 12345'

console.log(str2.match(regex2))

var regex3 = /#([a-zA-Z0-9]{6}|[a-zA-Z0-9]{3})/g

var str3 = '#ff0 #FFF #ffaacc #Fc1Df2'

console.log(str3.match(regex3))

var regex4 = /([0-1][0-9]|[2][0-3]):[0-5][0-9]/g

var str4 = '19:59 02:07'
console.log(str4.match(regex4))

var regex5 = /id=".*?"/g // 有回溯
var regex5 = /id=".*?"/g

var str5 = '<div id="container" class="main"></div>'

console.log(str5.match(regex5))

