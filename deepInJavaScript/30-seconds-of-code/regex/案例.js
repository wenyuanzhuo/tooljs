function parse(param) {
    var keys = {}
    // x = y&
    // x = &
    // & = y
    // x= = y

    param.replace(/([^=&]*)=([^=&]*)/g, function(full, key, value) {
        keys[key] = value
    })
    return keys
}

console.log(parse('a=1&b=2'))