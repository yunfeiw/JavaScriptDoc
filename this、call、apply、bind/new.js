/**
 * 1、创建一个新对象
 * 2、将构造函数的this指向新对象
 * 3、执行这个对象
 * 4、将对象返回
 *  
 */
function  A(params) {
    this.name = 'yunfe'
}
var aa = new A()
console.log(aa)