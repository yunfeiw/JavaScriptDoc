## reactive

响应式

1. 依赖收集
2. 触发依赖

```js
import {ref,effect} from 'vue/reactivity/dist/reactivity.esm-browser.js';

const a = ref(10)
effect(()=>{
    // get
    b = a.value + 10;
    consoe.log(b)
})
// set
a.value =20
```

例子

```js
const App{
    render(context){
        effect(()=>{
            document.body.textContent = '';

            const div = document.createElement('div');
            div.textContent = context.a.value;

            document.body.append(div);
        })
    }
    setup(){
        const a = ref('hello world');
        window.a = a;
        return {
            a
        }
    }
}

App.render(App.setup())
```

发布 订阅

```js
let currentEffect;

class Dep{
    constructor(val){
        this._val = val;
        this.effects = new Set();//存储 收集器
    }
    get value(){
        this.depend();
        return this._val;
    }
    set value(val){
        this._val = val;
        this.notice();
        return this._val;
    }
    depend(){
        if(currentEffect){
            this.effects.add(currentEffect);
        }
    }
    notice(){
        this.effects.forEach((effect)=>{
            effect();
        })
    }
}


function effectWatch(effect){
    currentEffect = effect;
    effect();
    currentEffect = null;
}

const a = new Dep(10);
let b;

effectWatch(()=>{
    b = a.value*10;
    console.log(b)
})

// update
a.value = 20;

```