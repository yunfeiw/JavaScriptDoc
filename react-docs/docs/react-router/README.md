## react-router

根据不同的 url 规则显示不同的视图

## 单页应用 (SPA)

### 基于 Web 的 React Router

基于 web 的 React Router 为：react-router-dom

### 安装

```bash
npm i -S react-router-dom
```

## 模式

history hash

```js
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  dom
);
```

多个`#`

```js
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  dom
);
```

## Route

Route 属性：

    - path 该路由要匹配的路径
    - component 当前路径匹配成功后。显示的视图组件
    - render 接收函数，函数返回值是我们的匹配规则

路由视图组件

Index

```js
function Index() {}

export default Index;
```

About

```js
function About() {}
export default About;
```

使用

```js
import { Route } from "react-router-dom";

function App() {
  return (
    <>
      <Route path="/" component="Index" />
      <Route path="/" component="About" />
    </>
  );
}
```

### path 匹配规则

1. 默认规则

当 url 以当前 path 开始时则匹配

所以 / 与 /about 会同时展示

![匹配](/assets/img/reactRouter/pipei.png)

2.精确匹配

exact 关键字 ： url === path || url === path/

例 1

```js
import { Route } from "react-router-dom";

function App() {
  return (
    <>
      <Route path="/" component="Index" />
      <Route exact path="about/" component="About" />
    </>
  );
}
```

![匹配](/assets/img/reactRouter/pipei2.png)

例 2

```js
import { Route } from "react-router-dom";

function App() {
  return (
    <>
      <Route path="/" component="Index" />
      <Route exact path="/about" component="About" />
      <Route exact path="/about/edit" component="About" />
    </>
  );
}
```

### 严格匹配

strict 关键字 url === path

> 严格匹配基于 精确匹配

```js
import { Route } from "react-router-dom";

function App() {
  return (
    <>
      <Route path="/" component="Index" />
      <Route exact strict path="/about" component="About" />
      <Route exact strict path="/about/edit" component="About" />
    </>
  );
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

当前 Switch 中有多个 Route 其中一项匹配成功，则不再匹配剩余项；

规则 从上到下匹配；

#### 错误界面应用

404

```js
function Err() {
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

> err 界面也会展示

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

### Redirect 重定向

to 重定向 path

from 可选 当前 url 为 form 的值,才执行重定向

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

#### 配合 404 使用

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
function Nav() {
  return (
    <>
      <a href="/"></a>
      <a href="/about"></a>
    </>
  );
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
<a href="https://www.baidu.com"></a>
```

### NavLink

应用内跳转

属性 - activeClassName 当前选中之后的 class; 默认值 `active` - activeStyle 当前选中之后的样式 - isActive 判断当前是否选中 （function return bool）

> 默认处理选中项时 使用 ·模糊匹配·；需要使用 精确匹配 exact

```js
    <NavLink to='/' exact>首页</NavLink>
    <NavLink to='/about'>关于</NavLink>
```

![匹配](/assets/img/reactRouter/navlink.png)

### 自定义 activeClassName

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

## 路由信息

```js
function About(props) {
  console.log(props);
  return <div>关于</div>;
}
```

![匹配](/assets/img/reactRouter/routecs.png)

histroy 当前跳转信息 方法

    - action: "POP" 跳转到当前视图时的类型

        - "POP" 在地址栏直接输入地址，跳转至当前视图，或者在当前视图进行了刷新，或其他站点跳入

        - "PUSH" Link/NavLink，以及push方法跳转至当前视图

        - "REPLACE" 重定向或replace 跳转至当前视图

    - go: ƒ go(n)   在历史记录里回退或前进几项

    - goBack: ƒ goBack() 在历史记录里回退1项

    - goForward: ƒ goForward()在历史记录里前进1项

    - length: 50 当前源在历史记录中记录了几项

    - push: ƒ push(path, state)

    - replace: ƒ replace(path, state)

location 当前地址栏信息

    - hash: "" url # 后边的 hash(哈希) 值

    - pathname: "/join" 当前 url

    - search: "" 当前 search

    - state push或 replace 方法传递的信息

match 当前匹配信息

    - isExact: true 当前项是否是精确匹配的

    - params: {} 动态路由的参数

    - path: "/join" 当前项的path

    - url: "/join" 当前项匹配的 url 的节选

## 路由参数

1. 被 Route 的 component 属性调用的组件，在 props 中就可以拿到 路由参数

2. 被 Route 的 render 属性调用的组件，需要从 render 函数获取路由参数，再传递给组件

3. 非 Route 调用的组件, 可以用个 withRouter 或 Route Hooks 来获取

### withRouter

withRouter 高阶路由(本质是一个高阶组件)

let NewCmp = withRouter(Cmp);

> 适用于 函数组件 与 类组件

例子

```js
import { withRouter } from "react-router-dom";

function App(props) {
  console.log(props); // { histroy,location,match }
  return <div></div>;
}

export default withRouter(App);
```

### HOOKS

- useHistory 获取 history 对象
  - useLocation 获取 location 对象
  - useParams 获取动态路由参数
  - useRouteMatch 获取 Match 对象

## 动态路由

```
/list/分类/页码

/list
/list/分类
/list/分类/页码

```

```js

    <NavLink to='/' exact >首页</NavLink>
    <NavLink to='/list/:type/:page'>列表</NavLink>
```

> 问题 直接放 /list 会 404

#### 改进 1

```js
    <NavLink to='/' exact >首页</NavLink>
    <NavLink to={['/list/:type/:page','/list/:type/','/list']}>列表</NavLink>
```

#### 改进 2

添加 ?（可选项）

```js

    <NavLink to='/' exact >首页</NavLink>
    <NavLink to='/list/:type?/:page?'>列表</NavLink>
```
