const tree = [{
    name: 'a',
    child: [{
        name: 'a_1',
        child: [{
            name: 'a_1_1',
            child: [{
                name: 'a_1_1_1',
                child: [{
                    name: 'a_1_1_1_1',
                }]
            }]
        }, {
            name: 'a_2_1',
            child: [{
                name: 'a_2_1_1',
                child: [{
                    name: 'a_2_1_1_1',
                    child: [{
                        name: 'a_2_1_1_1_1',
                    }]
                }]
            }]
        }]
    }]
}, {
    name: 'b',
}, {
    name: 'c',
    child: [{
        name: 'c_1',
    }]
}]

// [[a, [a_1, [a_1_1]]], b, [c, [c_1]]]

function fn3(tree = []) {
    if (!tree) {
        return 0
    }
    let result = 1
    tree.forEach(item => {
        result = Math.max(result, 1 + fn3(item.child))
    });
    return result
}


console.log(fn3(tree))








// let tree2 = {
//     l: {
//         l: {
//             l: null,
//             r: {
//                 l: null,
//                 r: {
//                     l: null,
//                     r: null,
//                 }
//             }
//         }
//     },
//     r: {
//         l: null
//     }
// }

// function fn2(tree) {
//     if (!tree) {
//         return 0
//     }

//     let l = fn2(tree.l)
//     let r = fn2(tree.r)

//     return l >= r ? l + 1: r + 1
// }
// console.log(fn2(tree2))






// function fn1(curr = [], tree) {
//     let arr = tree.map(item => {
//         if (!item.child) {
//             return item.name || ''
//         }
//         return fn1([item.name], item.child)
//     })

//     return curr.concat(...arr)
// }