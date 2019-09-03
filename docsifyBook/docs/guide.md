
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

  ## this
  1.memberExpression 属性访问表达式 ---  ()的左边 ref = memberExpression
  2.reference  ---  base Value 属性所在对象  name propertyNameString
  3.IsPropertyReference(ref) 是 true --- 当 ref 的 base Value 是对象而非 EnvironmentRecord  
  ```
    2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)

    2.2 如果 ref 是 Reference，并且 base value 值是 Environment Record, 那么this的值为 ImplicitThisValue(ref)

    2.3 如果 ref 不是 Reference，那么 this 的值为 undefined
  ```
