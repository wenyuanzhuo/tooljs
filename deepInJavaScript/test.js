const arr = {
  shelf: {
    '11': {},
    '22': {},
    '33': {}
  },
  shoppe: [{
    id: 8,
    name: 'aaron',
    shelfId: '11'
  }, {
    id: 9,
    name: 'aaron',
    shelfId: '22'
  }, {
    id: 19,
    name: 'aaron',
    shelfId: '33'
  }]
}
const isFresh = true
const skey = false
const res = arr.shoppe.filter((item) => {
  return item && arr.shelf[item.shelfId] && (item.id !== 8 || skey)
})
console.log(res)