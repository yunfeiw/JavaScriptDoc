Promise.resolve
Promise.reject

### Promise.all

all 决议为完成，则完成。一个 resolve 为 reject 则结束，抛出异常

### Promise.race

一旦有一个结束则结束，有一个决议为拒绝则立即决议，抛出异常

### Promise.observe （自定义）

辅助用来查看 promise 的执行过程；同时增加辅助函数，不改变其原有值。

```
if(Promise.observe){

    Promise.observe = function(pr,cb){

        pr.then(
            function finally(msg){
                Promise.resolve(msg).then(cb);
            },
            function reject(err){
                Promise.resolve(err).then(cb);
            }
        )
    }
}

function foo(){
    return new Promise((res,rej)=>{
        res(1)
    })
}

Promise.race([
    Promise.observe(foo(),()=>{console.log(‘任务结束’)}),
    Promise.resolve(2)
]).then(msg=>{console.log(msg)})

```

### Promise.any

同 race 差不多

### Promise.first

返回第一个决议的 Promise

```
    if(Promise.first){
        // pres 为promise数组
        Promise.first=function(pres){
            return new Promise((res,rej)=>{
                pres.forEach(e=>{
                    Promise.resolve(e).then(res)
                })
            })
        }
    }

    var p1 = Promise.resolve(1)
    var p2 = Promise.resolve(2)
    var p3 = Promise.resolve(3)

    Promise.first([p1,p2,p3]).then(msg=>{
        console.log(msg)
    })
```

### Promise.last

返回最后一个决议 Promise

```
    if(Promise.last){
        // pres 为promise数组
        Promise.last=function(pres){
            let tag = pres.length;
            return new Promise((res,rej)=>{
                pres.forEach(e=>{
                    Promise.resolve(e).then((msg)=>{
                        if(tag==1){
                            res(msg);
                        }else{
                            tag --;
                        }
                    })
                })
            })
        }
    }

    var p1 = Promise.resolve(1)
    var p2 = Promise.resolve(2)
    var p3 = Promise.resolve(3)

    Promise.last([p1,p2,p3]).then(msg=>{
        console.log(msg)
    })

```

### 并发迭代 Promise.map

```
if(Promise.map){
    Promise.map = (pres,cb)=>{
       return Promise.all(
           pres.map((v)=>{
               return new Promise((res)=>{
                   cb(v,res);
               });
           })
       )
    }
}
```
