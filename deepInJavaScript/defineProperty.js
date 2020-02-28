let defaultNum = 10

let eventEmitter = {
}
Object.defineProperty(eventEmitter, 'defaultNum', {
  get: function() {
    return defaultNum
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || arg !== arg)
      throw new TypeError('defaultNum must be a positive number !')
    defaultNum = arg 
  }
})
eventEmitter.defaultNum = -1
