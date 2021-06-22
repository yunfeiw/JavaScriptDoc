### antd

## 严格模式

`use strict`

react 默认使用严格模式

```js
import {useState} from 'react'

function Count(){
   const [count,setCount] = useState[0];
   return <div>
      <p>{count}</p>
      <button onClick={()=>{setCount(count++)}}>按钮</button>
   </div>
}
export default Count

```

```js
import Count from './Count';
import './app.css'
class App extends Component{
   render(){
      return(
         <div>
         
         </div>
      )
   }
}
```
```css
/* app.css */
.warp{
   width:300px;
   height:100px;

}
```

## css Modules

> css没有作用域

css模块化;命名方式 style.module.css

使用

app.module.css

```css
.warp{
   width:300px;
   height:100px;
}
```

app.js
```js
import appcss from './app.module.css'
// appcss 对象 {key:string}
function app(){
   return(
      <div className={appcss.div}></div>
   )
}
```
className 自动将 appcss对象的val(string)封装成一个 真实 `class`名


### css公共化

app.module.css

使用 `global` 包裹 即可

> 默认私有。语法： local(className)

```css
.warp{
   width:300px;
   height:100px;

}

/* 公共样式 */
:global(.nav){}

:local(.footer){}
```

### css复用性

使用 comnposes 关键字

> 注意 只能使用在 ·class· 中

```css
.warp{
   width:300px;
   height:100px;
   composes: yunfei;
}
/* 复用class */
.yunfei{
   background:red;
}
```

## ant design


## 扩展ant，配置webpack

1. craco 
2. react-app-rewired
3. customize-cra


craco.config.js

