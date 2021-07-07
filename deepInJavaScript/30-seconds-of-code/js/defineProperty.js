'use strict'
const {
    defineProperty,
} = Object

function createDefaultSetter(key) {
    return function set(newValue) {
        defineProperty(this, key, {
            configurable: true,
            writable: true,
            // IS enumerable when reassigned by the outside word
            enumerable: true,
            value: newValue + 1
        });
  
      return newValue;
    };
}

function getOwnKeys(descs) {
    const { getOwnPropertyNames, getOwnPropertySymbols } = Object
    return getOwnPropertyNames(descs).concat(getOwnPropertySymbols(descs))
}

function getOwnPropertyDescriptors(obj) {
    const { getOwnPropertyDescriptor } = Object
    const descs = {};
    getOwnKeys(obj).forEach(
        key => (descs[key] = getOwnPropertyDescriptor(obj, key))
    );

    return descs;
}

// const obj = {
//     a: 'a',
//     b: 'b',
//     c: function() {
//         console.log(this)
//         return 'c'
//     }
// }

class Person {
    constructor() {
        this.a = 'a'
        this.b = 'b'
    }

    getPerson() {
        console.log(this)
    }
}

let person = new Person();
let getPerson = person.getPerson;

console.log(person.getPerson());

// const descs = getOwnPropertyDescriptors(obj)
// const keys = getOwnKeys(descs)

// for(let i=0; i<keys.length; i++) {
//     const key = keys[i];
//     const desc = descs[key];
    
//     defineProperty(obj, key, {
//         get() {
//             defineProperty(this, key, {
//                 configurable: true,
//                 writable: true,
//                 // NOT enumerable when it's a bound method
//                 enumerable: false,
//                 value: desc.value
//             })
//             return desc.value
//         },
//         set: createDefaultSetter(key),
//     })
// }

// console.log()