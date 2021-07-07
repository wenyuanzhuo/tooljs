// <div class="x" v-show="{{bol}}" ></div>
// {
//     tag: 'div',
//     attr: [{
//         'v-show': bol
//     }]
// }

var regex1 = /\b/g

var str1 = '[JS] lesson_01'
console.log(str1.replace(regex1, '#'))

var regex2 = /(?=.[0-9])/g

var str2 = 'a1a2'
console.log(str2.replace(regex2, '#'))

var regex2 = /(?!l)/g

var str2 = 'hello' // '' + h + '' + e + '' + l + '' + l + '' + o + ''
console.log(str2.replace(regex2, '#'))

var regex3 = /\s([^=]*)/g

var str3 = '< class=11'
console.log(str3.match(regex3))


var regex4 = /(?!^)(?=(\d{3})+$)/g

var str4 = '123567'
console.log(str4.replace(regex4, ','))


// var regex5 = /^\s+|\s$/g
var regex5 = /^\s*(.*?)\s*$/g

var str5 = '   123  567   '
console.log(str5.replace(regex5, '$1'))


var regex6 = /(?:^|\s)\w/g

var str6 = 'aaron wen'
console.log(str6.replace(regex6, function(v, $1) {
    return v.toUpperCase()
}))


var regex7 = /[-_\s]+(.)?/g

var str7 = '--webkit-transform: xx_aa; display: block; _b: a_b'
console.log(str7.replace(regex7, function(v, $1) {
    return $1.toUpperCase()
}))


var regex8 = /<([^>]+)>.*<\/\1>|<[^>]+\/>/

var str8 = '<p>laoyao bye bye</p>'
console.log(regex8.test(str8))
