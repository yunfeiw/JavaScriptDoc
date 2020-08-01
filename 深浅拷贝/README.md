### 深拷贝

- 利用 JSON 对象中的 parse 和 Stringify
- 利用递归实现第一层都重新创建对象并复制

#### JSON 对象

仅适用简单情况，不适合包含 function、undefined/symbol 的对象；

### 递归方法

```
    function deepClone(source){
        
        const targetObj = source.constructor === Array ? [] : {}; //判断复制目标是数组还是对象
        for(let keys in source){
            if(source.hasOwnProperty(keys)){
                if(source[keys] && typeof source[keys] === 'object'){
                    //如果值是对象，递归
                    targetObj[keys] = source[keys].constructor === Array ? [] : {};
                    targetObj[keys] = deepClone(source[keys]);
                }else{ // 如果不是，就直接赋值
                    targetObj[keys] = source[keys];
                }
            }
        }
        return targetObj;
    }
```
### es6扩展运算符（...） 与 concat()

* concat 只对数组的第一层进行深拷贝
* Object.assign() 拷贝的是属性值。假如源对象的属性值是一个指向对象的引用，它也只拷贝那个引用值。
* ... 实现的是对象第一层的深拷贝。后面的只是拷贝的引用值。

首层浅拷贝

### 总结

* 赋值运算符 = 实现的是浅拷贝，只拷贝对象的引用值；
* js中数组和对象自带的开呗方法都是 首层浅拷贝
* JSON.stringify 实现的是深拷贝，但是对目标对象有要求
* 递归