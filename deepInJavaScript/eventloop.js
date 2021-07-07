// setImmediate(function () {
//     console.log(1);
// }, 0);
// setTimeout(function () {//secend macrotask 
//     console.log(2);
//     new Promise(function(resolve) {
//         console.log(13)
//         resolve()
//     }).then(function() {
//         console.log(12)
//     })
// }, 0);


new Promise(function (resolve) {//first macrotask
    console.log(3);
    resolve();
    console.log(4);
}).then(function () {
    console.log(5);
    new Promise(function(resolve) {
        console.log(13)
        resolve()
    }).then(function() {
        console.log(12)
    })
}).then(function() {
    console.log(8);
    setTimeout(function () {
        console.log(7);
    }, 0);
})
process.nextTick(function() {
    console.log(15)
})
setTimeout(function () {
    console.log(14);
}, 0);

// process.nextTick(function () {
//     console.log(9);
// });

// setImmediate(function() {
//     setImmediate(function A() {
//         console.log(1);
//         setImmediate(function B(){console.log(2);});
//     });
    
//     setTimeout(function timeout() {
//         console.log('TIMEOUT FIRED');
//     }, 0);
// })


// async function async1() {
//     console.log("async1 start");
//     // try {
//     //     await  async3();
//     // } catch(err) {
//     //     console.log("async1 err");
//     // }
//     new Promise(function () {
//         async3();
//     }).catch(function () {
//         console.log("async1 err");
//     });
//     console.log("async1 end");

// }

// setTimeout(function () {
//     console.log("settimeout");
// },0);
// async1();
// new Promise(function (resolve) {
//     console.log("promise1");
//     resolve();
// }).then(function () {
//     console.log("promise2");
// });
// console.log('script end');
