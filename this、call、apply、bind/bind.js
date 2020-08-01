Function.prototype.bind2 = function () {
    var args = Array.prototype.call.splice(arguments,1);
    console.log(args)
    var fToBind = this;
    return function(){
        return fToBind.call(args)
    }
}
function a() {
    console.log(this.name)
}
var b={
    name:'yunfei'
}
a.bind2(b)