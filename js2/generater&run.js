/** Promise */
function p1() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res('step1')
        }, 2000)
    })
}
function p3() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res('step3')
        }, 2000)
    })
}

/** generater */

function* bar() {
    console.log('run')

    let v1 = yield p1();
    console.log('v1:', v1);
    
    let v2 = yield 2;
    console.log('v2:', v2);

    let v3 = yield p3();
    console.log('v3:', v3);

    let v4 = yield 4;
    console.log('结束 v4:', v4);
}

/** 自执行 */

function fun(gen){
    let ags = [].slice.call(arguments,1),it;
    it = gen.apply(this,ags);

    return Promise.resolve().then(function handleNext(val){
        let next = it.next(val);

        return (function handleReset(next){
            if(next.done){
                return next.value;
            }else{
                return Promise.resolve(next.value).then(
                    handleNext,
                    function handleErr(err){
                        return Promise.resolve(it.throw(err)).then(handleReset)
                    }
                )
            }
        })(next);
    })
}