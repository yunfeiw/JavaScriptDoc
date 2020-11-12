// function a(i, sum) {
//     if (i <= 0) { return sum }
//     sum += i;
//     return arguments.callee(--i, sum)
// }

// (function foo() {
//     console.log('这是foo')
// })()
// var obj = { name: 'yunfei', age: 18 };
// (function () {
//     console.log(arguments)
// })(obj);
// undefined = true; // 给其他代码挖了一个大坑！绝对不要这样做！
// (function IIFE(undefined) {
//     var a;
//     if (a === undefined) {
//     }
// })();

// (function (foo) {
//     foo("yunfei")
// }(function (arg) {
//     console.log(arg)
// }))

// for (var i = 0; i < 10; i++) {
//     console.log(i)
// }
// console.log(i)

// function foo(num) {
//     console.log("foo: " + num);
//     console.log("foo: " + this.count);
//     // 记录 foo 被调用的次数
//     this.count++;
// }
// foo.count = 0;
// var i;
// for (i = 0; i < 10; i++) {
//     if (i > 5) {
//         foo(i);
//     }
// }
// var obj ={name:'yunfei'}
// var arr = [1,2,3,4,5]
// arr.forEach(function (e){
//     console.log(e)
//     console.log(this.name)
// },obj)

var array = [1, 2, 3, 4]
console.log("length-before", array.length)
delete array[3]
console.log(array)
console.log("length-end", array.length)
