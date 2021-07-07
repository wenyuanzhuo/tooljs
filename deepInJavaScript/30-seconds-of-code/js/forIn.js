const has = (object, path) => {
    let i = 0
    let c

    if (!path.length) {
        return true
    }

    if (typeof path === 'string') {
        path = path.split('.')
    }

    if (Object.prototype.toString.call(object) === '[object Object]') {
        c = object[path[i]]
        while(c && i < path.length - 1) {
            ++i
            c = c[path[i]]
        }
        return !!c
    }
}

const forIn = (object, path, callback) => {
    if (Object.prototype.toString.call(path) === '[object Function]' && !callback) {
        callback = path
        path = []
    }

    for (let key in object) {
        const v = object[key]

        if (!v || !has(v, path)) {
            continue
        }

        const isJumpCycle = callback(v, key)

        if (isJumpCycle === 'continue') {
            continue
        } else if(isJumpCycle === 'break') {
            break
        }
    }
}


let obj = {
    a: {
        data: [{
            id: '11',
            count: 111,
        }]
    },
    b: {
        data: [{
            id: '22',
            count: 222,
        }]
    }
}

let goods1 = {}
forIn(obj, (value) => {
    forIn(value.data, (value1) => {
        goods1[value1.id] = value1.count
    })
})

console.log(goods1)


function for_in (goodsCart) {
    
    let goods = {}

    for (let key in goodsCart) {
        if (!goodsCart[key]) {
            continue;
        }
        let data = goodsCart[key].data;
        for (let k in data) {
            if (!data[k]) {
                continue;
            }
            
            goods[data[k].id] = data[k].count
        }
    }

    return goods
}

// console.log(for_in(obj))