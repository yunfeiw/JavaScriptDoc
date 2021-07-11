## 节流与防抖

## 节流

```js

    let box = document.querySelector('.box');

    box.onmousemove = throttle(move,200);

    function move(){
        console.log(this);
    }


    function throttle(fn,delay=500,isStart=false){
        let timer = null;
        return function(...arg){
            if(timer){
                return;
            }

            isStart && fn.apply(this,arg);

            timer = setTimeout(()=>{
                !isStart && fn.apply(this,arg);
                timer = null;
            },delay)
        }
    }

```
## 防抖

```js
let box = document.querySelector('.box');

    box.onmousemove = debounce(move,200);

    function move(){
        console.log(this);
    }

    function debounce(fn,delay=200,isStart=false){
        let timer = null;
        let isEnd = true;
        return function(...arg){
            clearTimeout(timer);

            if(isStart){
                isEnd && fn.apply(this,arg);
                isEnd = false;
            }

            timer = setTimeout(()=>{
                (!isStart) && fn.apply(this,arg);
                isEnd = true;
            },delay)
        }
    }
```