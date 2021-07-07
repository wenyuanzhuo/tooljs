const {
    defineProperty,
    getOwnPropertyNames,
    getOwnPropertySymbols,
    getOwnPropertyDescriptor
} = Object

function autobind(args) {
    return autobindClass(args)
}

function autobindClass(klass) {
    const descs = getOwnPropertyDescriptors(klass.prototype)
    const keys = getOwnKeys(descs)


    for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        const desc = descs[key];
        
        // 过滤方法
        if (typeof desc.value !== 'function' || key === 'constructor') {
          continue;
        }
    
        defineProperty(klass.prototype, key, autobindMethod(klass.prototype, key, desc));
    }
}
function autobindMethod(target, key, { value: fn, configurable, enumerable}) {
    return {
        configurable,
        enumerable,
        get() {
            const boundFn = bind(fn, this)
            defineProperty(this, key, {
                configurable: true,
                writable: true,
                // NOT enumerable when it's a bound method
                enumerable: false,
                value: boundFn
            })
            return boundFn
        },
        set: createDefaultSetter(key),
    }
}

function getOwnKeys(descs) {
    return getOwnPropertyNames(descs).concat(getOwnPropertySymbols(descs))
}

function getOwnPropertyDescriptors(obj) {
    const descs = {};
    getOwnKeys(obj).forEach(
        key => (descs[key] = getOwnPropertyDescriptor(obj, key))
    );

    return descs;
}

function bind(fn, context) {
    if (fn.bind) {
      return fn.bind(context);
    } else {
      return function __autobind__() {
        return fn.apply(context, arguments);
      };
    }
}

function createDefaultSetter(key) {
    return function set(newValue) {
      Object.defineProperty(this, key, {
        configurable: true,
        writable: true,
        // IS enumerable when reassigned by the outside word
        enumerable: true,
        value: newValue
      });
  
      return newValue;
    };
}

class Person {
    constructor() {
        this.a = 'a'
        this.b = 'b'
    }

    getPerson() {
        // console.log(this)
        return this
    }
}
autobind(Person)


let person = new Person();
let getPerson = person.getPerson;

console.log(getPerson() === person);


