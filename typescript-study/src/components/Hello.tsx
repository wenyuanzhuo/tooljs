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

function Hello ({name, enthusiasmLevel = 1}: Props) {
  if (enthusiasmLevel <= 0) {
    error('something failed')
  }
  return (
    <div>
      <h1>我是{name}</h1>
      <span>{getExclamationMarks(enthusiasmLevel)}</span>
      <h1>{getDefaultObj({x: 10})}</h1>
      {/* <h2>{identity<string>("我是泛型函数")}</h2> */}
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
// interface SearchFunc {
//   (source: string, subString: string): boolean;
// }
// let mySearch: SearchFunc;
// mySearch = (src: string, subS: string): boolean => {
//   const result = src.search(subS)
//   console.log(result)
//   return result > -1
// }
// mySearch('www.123.com', '123')

// 可索引类型
// interface StringArray {
//   [index: number]: string;
// }
// let myArray: StringArray
// myArray = ['Bob', 'Fred']
// const myString = myArray[0]
// console.log(myString)

// 类类型
// interface ClockInterface {
//   currentTime: Date;
//   setTime(d: Date): any;
// }

// class Clock implements ClockInterface {
//   currentTime: Date;
//   setTime(d: Date) {
//     this.currentTime = d;
//   }
// constructor(h: number, m: number) { }
// }

// interface ClockConstructor {
//   new (h: number, m: number): ClockInterface;
// }

// interface ClockInterface {
//   tick(): any;
// }

// function createClock(ctor: ClockConstructor, h: number, m: number): ClockInterface {
//   return new ctor(h, m)
// }

// class AnalogClock implements ClockInterface {
//   constructor(hour: number, minute: number) {
//   }
//   tick() {
//     console.log('analog clock')
//   }
// }
// const myChild: AnalogClock = createClock(AnalogClock, 1, 2)
// console.log(myChild)


// class Control {
//   private state: any;
// }

// interface SelectableControl extends Control {
//   select(): void;
// }
// class TextBox extends Control {
//   select() { }
// }
// class Button extends Control implements SelectableControl {
//   select() { }
// }
// // 错误：“Image”类型缺少“state”属性。
// class Image implements SelectableControl {
//   select() { }
// }
// --------------------------------------------------------------








// 泛型
// function identity<T>(arg: T): T {
//   return arg
// }
// function loggingIdentity<T>(arg: T[]): T[] {
//   console.log(arg.length)
//   return arg
// }
// loggingIdentity<string>(["我是泛型T[] Array<T>"])
// // const myIdentity: <T>(arg: T) => T = identity
// // let myIdentity: {<T>(arg: T): T} = identity
// interface GenericIdentityFn<T> {
//   (arg: T): T;
// }
// const myIdentity: GenericIdentityFn<string> = identity
// console.log(myIdentity('111'))

// 泛型类
// class GenericNumber<T> {
//   zeroNumber: T;
//   add: {(x: T, y: T): T};
//   del: (x: T, y: T) => T;
// }

// const myGenericNumber = new GenericNumber<number>()
// myGenericNumber.zeroNumber = 1
// myGenericNumber.add = (x, y) => {å
//   return x + y
// }
// console.log(myGenericNumber.add(1,2))

// 泛型约束
// interface Lengthwise {
//   length: number
// }
// class LengthClass {
//   length: number
// }
// function identity<T extends Lengthwise>(arg: T): T {
//   console.log(arg.length)
//   return arg
// }
// function a(b: number[]) {
//   identity(b)
// }
// a([111, 22])
// 泛型中使用类类型
// function createFunc<T>(arg: {new (): T}): T {
//   return new arg()
// }

// class BeeKeeper {
//   hasMask: boolean;
// }

// class ZooKeeper {
//   nametag: string;
// }

// class Animal {
//   numLegs: number;
// }

// class Bee extends Animal {
//   keeper: BeeKeeper;
// }

// class Lion extends Bee {
//   keeper: BeeKeeper;
// }

// function createInstance<A extends Animal>(c: new () => A): A {
//   return new c();
// }
// createInstance(Lion).keeper.hasMask
// createInstance(Bee).keeper.hasMask


// 类
// class Animal {
//   private name: string;
//   constructor(theName: string) { this.name = theName; }
// }

// class Rhino extends Animal {
//   constructor() { super("Rhino"); }
// }

// class Employee {
//   private name: string;
//   constructor(theName: string) { this.name = theName; }
// }

// let animal = new Animal("Goat");
// let rhino = new Rhino();
// let employee = new Employee("Bob");

// animal = rhino;
// animal = employee; // 错误: Animal 与 Employee 不兼容.
