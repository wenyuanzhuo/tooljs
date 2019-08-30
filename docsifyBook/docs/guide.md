
ES6
========================

## Symbol
  Symbol独一无二
  - 应用场景
    > object只关心 key or values
    ```
    const switchType = {
      a: Symbol(),
      b: Symbol(),
    }
    function chooseType () {
      let area
      switch (type) {
        case switchType.a:
          area = 1
          break
        case switchType.b:
          area = 2
          break
      }
    }

    ```