//============================================
//-- Helpers
export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E }
  
 type SingleOrArray<T> = T | T[]

//=============================================
 //-- Core Domain types
export type Value = object 
export type Entity = {id: number } & Value 
//todo: export Resource = Tree.of<Entity>
export type ArgsObject = SingleOrArray<Value | Entity>        //todo: need better name
export type ResultsObject = SingleOrArray<Value | Entity>        //todo: need better name
export interface Interface<T extends ArgsObject> { 
    [key: string]: (arg: T) => Result<ResultsObject>
}
//todo: export type Event<V> = ?
//todo: export type Protocol<S, I, E> = ?

//==============================================
// testing model type level using core types...
//--

//-- Domain module
type Person = Entity & {
  name: string
  age: number
  married: boolean
}

let presenter: Interface<SingleOrArray<Person>> = {
    show: (person: SingleOrArray<Person>) => {
        console.log(person)
        return  {ok: true, value: person}
    },
    add: (persons: SingleOrArray<Person>) => {
        let sum = persons[0].age + persons[1].age
        return {ok: true, value: sum}
    }
}

//-- App module
const john: Person = {
  id: 1,
  name: 'John',
  age: 30,
  married: false
}
const sam: Person = {
  id: 2,
  name: 'Sam',
  age: 25,
  married: true
}
presenter.show(john) 
let totalAge = presenter.add([john, sam]) 
console.log(totalAge)


//============================================
// examples to use
type F = <T>(p: T) => void

//equivalent to:
interface FInterface {
  <T>(arg: T): void;
}