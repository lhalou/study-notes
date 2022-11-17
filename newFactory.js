//模拟new 的实现~
//创建一个对象
//对象的__proto__ = 构造函数的.prototype
//构造函数的this指向为创建的对象
//返回对象
function newFactory () {
    let obj = {};
    let result = null;
    const argumentsList = [].slice.call(arguments)
    const constructor = argumentsList[0]
    if(typeof constructor !== "function")return ;
    obj = Object.create(constructor.prototype)
    result =  constructor.apply(obj,argumentsList.slice(1))
    const isObj = result && (typeof result === "object" || typeof result === "function")
    return isObj ? result : obj
}

function Person(name) {
    this.name = name
}
const test = newFactory(Person, 'nihao')
console.log(test,'test')


// 对象

function obj1(name,age) {
    this.name = name
    this.age=age
    return {
        direction: "背景"
    }
}
const obj1Test = new obj1("你好",18)
obj1Test.name // undefined
obj1Test.age // undefined
obj1Test.direction //背景



function obj2(name,age) {
    this.name = name
    this.age = age
    return 1
}
const obj12Test = new obj1("你好",18)
obj2Test.name // "你好"
obj2Test.age // 18
obj2Test.direction //undefined