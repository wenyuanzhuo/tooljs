import * as React from 'react'

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}
export enum NameEnum {
  Nick = 'nick',
  Guuka = 'guuka'
}

export interface DefaultObj {
  age?: number;
  address?: string;
  readonly x?: number; // 只读
}

// interface Named {
//   name: string;
// }

// class Person {
//   name: string;
// }

// let p: Named;
// // OK, because of structural typing
// p = new Person();
function Hello ({name, enthusiasmLevel = 1}: Props) {
  if (enthusiasmLevel <= 0) {
    error('something failed')
  }
  return (
    <div>
      <h1>我是{name}</h1>
      <span>{getExclamationMarks(enthusiasmLevel)}</span>
      <h1>{getDefaultObj({x: 10})}</h1>
      <h2>{identity<string>("我是泛型函数")}</h2>
    </div>
  )
}

function getExclamationMarks(numChars: number): string {
  return Array(numChars + 1).join('!')
}
function error(message: string): never {
  throw new Error(message)
}
function getDefaultObj(obj: DefaultObj) {
  return Object.keys(obj).join('')
}
// 接口
// 描述普通对象
// interface SquareConfig {
//   color?: string;
//   width?: number;
//   // [propName: string]: any;
// }
// function createSquare(config: SquareConfig): { color: string; area: number } {
//   return { color: config.color || '1', area: config.width || 0 }
// }
// // let mySquare = createSquare({ colour: "red", width: 100 } as SquareConfig);
// let Squareoptions = { colour: "red", width: 100 }
// let mySquare = createSquare(Squareoptions);
// 要留意，在像上面一样的简单代码里，你可能不应该去绕开这些检查。 
// 对于包含方法和内部状态的复杂对象字面量来讲，你可能需要使用这些技巧，但是大部额外属性检查错误是真正的bug。

// 描述函数对象
interface SearchFunc {
  (source: string, subString: string): boolean;
}

// -----------------

let mySearch: SearchFunc;
mySearch = (src: string, subS: string): boolean => {
  const result = src.search(subS)
  console.log(result)
  return result > -1
}
mySearch('www.123.com', '123')

// -------------
interface MyInterface {
  // This is call signature
  // It is used inside object type, function expression, function declaration, etc...
   (x:number, y:number): number; 
}

const myOne : MyInterface = (x,y) => {
  console.log(111)
  return x + y
};
myOne(1, 2)
// 泛型
function identity<T>(arg: T): T {
  return arg
}
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}
loggingIdentity<string>(["我是泛型T[] Array<T>"])
const myIdentity: <T>(arg: T) => T = identity
// let myIdentity: {<T>(arg: T): T} = identity
// interface GenericIdentityFn<T> {
//   (arg: T): T;
// }
// let myIdentity: GenericIdentityFn<string> = identity


console.log(myIdentity('111'))



export default Hello