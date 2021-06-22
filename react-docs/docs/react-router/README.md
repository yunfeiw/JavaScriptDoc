## react-router

根据不同的url规则显示不同的视图

## 单页应用 (SPA)

### 基于 Web 的 React Router

基于 web 的 React Router 为：react-router-dom

### 安装

```bash
npm i -S react-router-dom
```

## 模式

history  hash

```js
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    dom
)

```


多个`#`
```js
import {HashRouter} from 'react-router-dom';

ReactDOM.render(
    <HashRouter>
        <App/>
    </HashRouter>,
    dom
)

```

## Route

Route属性：

    - path 该路由要匹配的路径
    - component 当前路径匹配成功后。显示的视图组件
    - render 接收函数，函数返回值是我们的匹配规则

路由视图组件

Index
```js
    function Index(){}

    export default Index;
```
About
```js
    function About(){}
    export default About;
```

使用

```js
import {Route} from 'react-router-dom'

function App(){
    return(
        <>
            <Route path='/' component='Index' />
            <Route path='/' component='About' />
        </>
    )
}

```

### path匹配规则

1. 默认规则

当url以当前path开始时则匹配

所以 / 与 /about 会同时展示

![匹配](/assets/img/reacrRouter/pipei.png)

2.精确匹配

exact关键字 ： url === path || url === path/

例1
```js
import {Route} from 'react-router-dom'

function App(){
    return(
        <>
            <Route path='/' component='Index' />
            <Route exact path='about/' component='About' />
        </>
    )
}

```
![匹配](/assets/img/reacrRouter/pipei2.png)

例2

```js
import {Route} from 'react-router-dom'

function App(){
    return(
        <>
            <Route path='/' component='Index' />
            <Route exact path='/about' component='About' />
            <Route exact path='/about/edit' component='About' />
        </>
    )
}

```

### 严格匹配

strict 关键字 url === path

> 严格匹配基于 精确匹配

```js
import {Route} from 'react-router-dom'

function App(){
    return(
        <>
            <Route path='/' component='Index' />
            <Route exact strict path='/about'  component='About' />
            <Route exact strict path='/about/edit' component='About' />
        </>
    )
}

```

### 多路径匹配

[]


```js
import {Route} from 'react-router-dom'

function App(){
    return(
        <>
            <Route path=['/','/home'] component='Index' />
            <Route exact strict path='/about'  component='About' />
            <Route exact strict path='/about/edit' component='About' />
        </>
    )
}

```

### Switch

当前 Switch中有多个 Route 其中一项匹配成功，则不再匹配剩余项；

规则 从上到下匹配；

#### 错误界面应用

404

```js
function Err(){
    return 404;
}
```

```js
import {Route} from 'react-router-dom'

function App(){
    return(
        <>
            <Route path=['/','/home'] component='Index' />
            <Route exact strict path='/about'  component='About' />
            <Route exact strict path='/about/edit' component='About' />
            <Route  component='Err' />
        </>
    )
}

```

> err界面也会展示

修改，添加 switch 包裹

```js
import {Route} from 'react-router-dom'

function App(){
    return(
        <Switch>
            <Route path=['/','/home'] component='Index' />
            <Route exact strict path='/about'  component='About' />
            <Route exact strict path='/about/edit' component='About' />
            <Route  component='Err' />
        </Switch>
    )
}

```


### 动态路由


### render

接收函数，函数返回值是我们的匹配规则

```js
import {Route} from 'react-router-dom'

function App(){
    return(
        <Switch>
            <Route path=['/','/home'] component='Index' />
            <Route exact strict path='/about'  render={
                ()=><div>哈哈</div>
            } />
      
        </Switch>
    )
}
```

> render 方便传递数据 或 鉴权

###  Redirect 重定向

to  重定向path

from 可选 当前url为form的值,才执行重定向

```js
import {Route} from 'react-router-dom'

function App(){
    return(
        <Switch>
            <Route path=['/','/home'] component='Index' />
            <Route exact strict path='/about' component='About' />
            <Redirect form='yunfei' to='.' />
        </Switch>
    )
}
```

#### 配合 404使用

```js
import {Route} from 'react-router-dom'

function App(){
    return(
        <Switch>
            <Route path=['/','/home'] component='Index' />
            <Route exact strict path='/about' component='About' />
            <Redirect form='yunfei' to='/404' />
        </Switch>
    )
}
```

## 内链 外链

内链 应用内 

外链 跳转到应用外

```js
function Nav(){
    return (
        <>
            <a href='/'></a>
            <a href='/about'></a>
        </>
        )
}
```
> 界面 刷新

### link

内链
```js
<Link to='/'>首页</Link>
<Link to='/about'>关于</Link>
```
外链
```js
<a href='https://www.baidu.com'></a>
```

### NavLink

应用内跳转

属性
    - activeClassName 当前选中之后的 class; 默认值 `active`
    - activeStyle 当前选中之后的样式
    - isActive 判断当前是否选中 （function return bool）
  
> 默认处理选中项时 使用 ·模糊匹配·；需要使用 精确匹配 exact

```js
    <NavLink to='/' exact>首页</NavLink>
    <NavLink to='/about'>关于</NavLink>
```

![匹配](/assets/img/reacrRouter/navlink.png)

### 自定义  activeClassName 

```js
    <NavLink to='/' exact activeClassName='yunfei'>首页</NavLink>
    <NavLink to='/about'>关于</NavLink>
```

当 首页 选中时 className 为 yunfei; 关于 界面不变（active）


### activeStyle

```js
    <NavLink to='/' exact activeStyle={
        {color:'red'}
    }>首页</NavLink>
    <NavLink to='/about'>关于</NavLink>
```


### isActive

```js
    <NavLink to='/' exact 
        isActive ={
            ()=>{
                return true //选中 首页
            }
        }
    
    >首页</NavLink>
    <NavLink to='/about'>关于</NavLink>
```


## 路由参数

```js

function About(props){
    console.log(props)
    return <div>关于</div>
}

```

![匹配](/assets/img/reacrRouter/routecs.png)


histroy 当前跳转信息 方法
    action: "POP" 跳转到当前视图时的类型
        - "POP" 在地址栏直接输入地址，跳转至当前视图，或者在当前视图进行了刷新，或其他站点跳入
        - "PUSH" Link/NavLink，以及push方法跳转至当前视图
        - "REPLACE" 重定向或replace 跳转至当前视图
location 当前地址栏信息
match    当前匹配信息