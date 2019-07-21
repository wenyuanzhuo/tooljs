const difference = require('../js/difference')
const assert = require('assert');
describe('difference of Array methods', () => {
  const a = [1, 2, 4, 4]
  const b = [1, 2]
  it('power-assert', () => {
    assert(difference(a, b))
  })
})