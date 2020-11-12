// var arr = [1, 2, 3, 4];
// var str = 'abcdef';
// 字符换
// substring    arg1: 开始下标，arg2：结束下标 --不改变原元素
// substr       arg1: 开始下标，arg2：截取几个 --不改变原元素
// 数组
// slice        arg1: 开始下标，arg


// var a = { name: b, age: 18 };
// var b = { name: a, age: 19 };


// . 方式 属性描述符；
// [] 方式 键访问；

// getOwnPropertDescriptor

// function ParseFun() {
//     this.xx = "123"; 
//     // 解析
//     this.cusDefineProperty('xx', this.xx)
// }

// ParseFun.prototype.cusDefineProperty = function (name, value) {
//     Object.defineProperty(this, name, {
//         set: function (v) {
//             value = v;
//             console.log("监听到了")
//         },
//         get: function () {
//             console.log('拿数据')
//             return value;
//         }
//     })
// }
// let aa = new ParseFun();
// aa.xx= 'wang'

// Object.preventExtensions({}) //禁止扩展
// Object.seal() //密封 在preventExtendsions基础上调用 configurabel
// Object.freeze() //冻结 在seal基础上 调用 writable


// //判断对象是否包含属性


// "a" in obj //判定同事会在 prototype原型链中查找
// obj.hasOwnProperty("a") //仅在自身查找


function person() {
    this.name = 'yunfei'
}
person.prototype.getName = function () {
    console.log(this.name)
}
var wang = new person()