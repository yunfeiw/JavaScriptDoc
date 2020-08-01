/**
 * 1）Object.setPropertyOf，给我两个对象，我把其中一个设置为另一个的原型。
 * 2）Object.create，给我一个对象，它将作为我创建的新对象的原型。
 */


// 显示继承
var a = { a: '1' }
var b = { b: '1' }
Object.setPrototypeOf(a, b)
console.log(a)
// 隐式继承 new constructor
function AA(){
    this.name = 'yunfei'
}
const user = new AA()
console.log(user.constructor === AA)


