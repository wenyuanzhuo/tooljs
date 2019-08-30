var myObj = { 
  name: '极客时间',
  showThis: function() {
    console.log(this)
  }
}
var foo = function() {
  myObj.showThis()
}
foo()