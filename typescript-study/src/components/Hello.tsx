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