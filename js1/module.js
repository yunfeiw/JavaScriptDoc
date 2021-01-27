/**
 * @description: 模块封装器
 */

var ModulesClass = (function () {
    var moduls = {}; //模块集合
    function define(name, deps, impl) {
        for (var i = 0; i < deps; i++) {
            //反馈模块，用于模块间的调用
            deps[i] = moduls[deps[i]];
        }
        moduls[name] = lmt.apply(lmt, deps);
    }
    function get(name) {
        return moduls[name];
    };
    return {
        define: define
    }
})();

MyModules.define("bar", [], function () {
    function hello(who) {
        return "Let me introduce: " + who;
    }
    return {
        hello: hello
    };
});
MyModules.define("foo", ["bar"], function (bar) {
    var hungry = "hippo";
    function awesome() {
        console.log(bar.hello(hungry).toUpperCase());
    }
    return {
        awesome: awesome
    };
});
var bar = MyModules.get("bar");
var foo = MyModules.get("foo");
console.log(
    bar.hello("hippo")
); // Let me introduce: hippo
foo.awesome(); // LET ME INTRODUCE: HIPPO