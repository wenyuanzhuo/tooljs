const a = [{
    id: 333,
    key: 0
}, {
    id: 444,
    key: 0
}, {
    id: 555,
    key: 0
}, {
    id: 222,
    key: 0
}, {
    id: 111,
    key: 0
}]


const b = [{
    id: 111,
    key: 0
}, {
    id: 222,
    key: 0
}, {
    id: 333,
    key: 0
}]

let c = []

// for(let i=0; i< a.length; i++) {
//     for(let j=0; j< b.length; j++) {
//         if (a[i].id === b[j].id) {
//             c.push(a[i])
//         }
//     }
// }

for(let i=0; i< b.length; i++) {
    for(let j=0; j< a.length; j++) {
        if (b[i].id === a[j].id) {
            c.push(b[i])
        }
    }
}
console.log(c)