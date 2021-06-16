## hooks

逻辑复用成本

16.7 test
16.8 正式
### 函数组件
```js
function App(props){
    return <div>app</div>
}
```
1. 函数组件本质就是个常规函数 接受一个参数 props 返回一个 reacNodes
2. 独立的作用域
3. 没有this 和 生命周期


### 函数组件更新

会重新执行整个函数


### useState
声明组件状态
1. 一个组件中，可以使用`useState`声明多个状态
2. useState 返回的状态是一个引用类型，修改时，只修改其中一个值，不会进行`浅合并`
3. useState 结构出来的 `setState方法`同样是异步，同样会被批处理监管
4. 不接受函数类型
```js
function App(props){
    const [state,setState] = useState(1)
    return (<div>app</div>)
}
```

> 注意： hooks使用必须保证其调用顺序，不能将hooks的调用，房子 if for 等流程控制语句中，也不能放在·子函数·中
> hooks只能放在自定义组件的 最外层。                                                                            
> 必须保证其调用顺序：就是每次执行该函数，hooks的调用顺序，不会改变
> hooks只能字react函数中使用（函数组件，自定义hook）


## useState 原理

```js
    // let state = null; //存储中心 简单     
    let state = [];
    let index = 0;
    function useState(init){
        // let nowState = state ? state : init // 简单
        let nowIndex = index++;
        if(state[newIndex] ==undefined){
            state[nowIndex] = init
        }
        return [state[nowIndex],(v)=>{
            state[nowIndex] = v ;
            render(); //更新
        }]
    }
    render();
    // 执行函数
    function render(){
        let [count,setCount] = useState(0);
        // create DOM
        // append
    }

```


## useEffect
副作用(DOM操作、数据请求)

处理组件中的作用类型，用于替代生命周期；

类似 Vue中的watch



语法
```js
useEffect(
    ()=>{
        // 副作用函数
        return ()=>{} //清理函数 cleanup
    },
    [] //依赖参数
)
```

### 挂载阶段
从上到执行函数组件，如果碰到useEffect 将其中effect 存储到一个队列中，当组件挂载完成之后，按照队列顺序执行effect函数，并获取 cleanup 函数，存储至一个新队列

### 更新阶段 
从上到执行函数组件，如果碰到useEffect 将其中effect 存储到一个队列中，当组件更新完成之后，会将之前存储的 cleanup 函数按照队列顺序执行，然后执行effect函数，并获取 cleanup 函数，存储至一个新队列

#### 依赖参数
会观察依赖参数 是否有所改变，没改变则不执行 cleanup effect
1. null 每次更新都执行
2. []组件更新时 不执行
3. [1,2,3]


### 卸载阶段

找到之前的 cleanup 队列 依次执行
```js
import {useState,useEffect} from 'react'
function App(){

    useEffect(()=>{
        console.log('effect1')
    })

    useEffect(()=>{
        console.log('effect2')
    })

    return(
        <div>app</div>
    )
} 

```
## 常见副作用处理地方

1. componentDidiMount
2. componentDidUpdate
3. componentWillMount

useEffect 替换 三者


```js
function Child(){
    const isMount = useRef(false)

    // 挂载完成 & 更新完成
    useEffect(()=>{})
    // 挂载完成
    useEffect(()=>{},[])
    // 卸载
    useEffect(()=>{
        return()=>{
            console.log('卸载')
        }
    })
    //组件更新
    useEffect(()=>{
        if(isMount.current){
            console.log('组件更新')
        }else{
            isMount.current = true;
        }
    })

}

```

## useRef

useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变
```js
const refContainer = useRef(initialValue);
```

本质上，useRef 就像是可以在其 .current 属性中保存一个可变值的“盒子”。

你应该熟悉 ref 这一种访问 DOM 的主要方式。如果你将 ref 对象以 `<div ref={myRef} />` 形式传入组件，则无论该节点如何改变，React 都会将 ref 对象的 .current 属性设置为相应的 DOM 节点。

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

## memo

用于优化父组件更新 引起的 子组件更新问题

memo 本身是一个高阶组件（高阶组件： 一个普通函数，特征，接收一个参数（函数），返回一个函数）

语法
```js
NewCmp = memo(Cmp, compare:()=> false|true)
```
例子
```js
const NewCmp = memo(Cmp,(props,nextProps)=>{
    return false
})
```


当父组件更新时,newCmp会调用 compare,返回 false 则不更新，true 则更新

函数的每次执行都会在改函数内产生一个新的作用域

> 注意 引用类型数据在 memo 中会导致 错误相等

## useMemo

返回值

```js
function App(){
    const {a,setA} = useState(1);
    const {b,setB} = useState(10);
    // const c = a * 2 //重复执行 增加性能损耗
    const c = useMemo(()=>{
        return ()=>{
            return a*2
        }
    })  //当a改变时 执行相应函数 
    return (
        <div>
            <p>a:{a}</p>
            <button onClick={()=>{
                setA(a++)
            }}>a++</button>

            <b>b:{b}</p>
            <button onClick={()=>{
                setB(b++)
            }}>b++</button>

            <p>c:{ c}</p>

        </div>
    )
}
```

## useCallback

与useMemo区别在于返回的是 function ，需要调用

```js
function App(){
    const {a,setA} = useState(1);
    const {b,setB} = useState(10);

    const c = useCallback(()=>{
        return a*2
    },[a])  //当a改变时 执行相应函数 
    return (
        <div>
            <p>a:{a}</p>
            <button onClick={()=>{
                setA(a++)
            }}>a++</button>

            <b>b:{b}</p>
            <button onClick={()=>{
                setB(b++)
            }}>b++</button>

            <p>c:{ c()}</p>
        </div>
    )
}
```

## style

```js
function App(){
    const {a,setA} = useState(1);

    return (
        <div className='box'>
            <style>
               {` 
                   .box div{
                        width:100px;
                        height:100px;
                        border:1px solid;
                   }
               `}
            </style>

            <div>a:{a}</div>
            <div>a:{a}</div>
            <div>a:{a}</div>
            <div>a:{a}</div>
          
        </div>
    )
}
```

## 自定义hook

1. 以use开始命名
2. 解决逻辑复用问题

```js
// 其他地方引用 使用
export function useScroll(){
    const [y,sety] = useState(0);

    useEffect(()=>{
        sety(window.scrollY)
        // 监听
        window.onscroll = ()=>{
            setY(window.scrollY)
        }

        return ()=> window.onscroll = null
    },[])

    // 返回 Y
    return [
        y,
        (newY)=>{sety(newY)}
    ]
} 

```