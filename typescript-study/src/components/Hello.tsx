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

interface Named {
  name: string;
}

class Person {
  name: string;
}

let p: Named;
// OK, because of structural typing
p = new Person();
function Hello ({name, enthusiasmLevel = 1}: Props) {
  if (enthusiasmLevel <= 0) {
    error('something failed')
  }
  return (
    <div>
      <h1>我是{name}</h1>
      <span>{getExclamationMarks(enthusiasmLevel)}</span>
      <h1>{getDefaultObj({x: 10})}</h1>
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
export default Hello