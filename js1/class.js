/* class */
/**
 * 1、不在引用杂乱的.prototype了。
 * 2、Button 声明时直接“继承”了wdget,不再需要通过Object.create(...)
 * 来替换.prototype对象，也不需要设置.__proto__或者Object.setProtoTypeOf(...)。
 * 3、可以通过super(...)来实现多态，这样任何方法都可以引用原型上层的同名方法
 * 4、class字面语法不能声明属性（只能声明方法）。看起来这是一种限制，但是他会排除
 * 掉许多不好的情况，如果没有这种限制的话，原型链末端的“实例”可能会意外地获取其他
 * 地方的属性（这些属性隐式被所有“实例”所“共享”）。所以，class语法实际上可以帮助
 * 你避免犯罪
 * 5、可以通过extends很自然地扩展对象（子）类型，甚至是内置的对象
 * 
 * 
 */
class P {
    foo() { console.log("P.foo"); }
}
class C extends P {
    foo() {
        super();
    }
}
var c1 = new C();
c1.foo(); // "P.foo"