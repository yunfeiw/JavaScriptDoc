### dva-umi

## 前言

### 生成器

generator

```js
function *fn(){
   yield console.log(1);
   yield console.log(2);
   yield console.log(3);
   yield console.log(4);
}

const f = fn()

console.log(f) //返回个迭代器

f.next(); //1  {value:fn,done:false}
f.next(); //2
f.next(); //3
f.next(); //4
f.next(); //null {value:undefind,done:true}

```


###  think

{} --> dispatch --> reducer
fun --> 执行函数 --> dispatch --> reducer


### redux-sage
```js
import createSagaMiddleware from 'redux-sage'

const sage = createSagaMiddleware()
```

监听器 --> 请求（是否异步）