## React 高阶技巧


目录结构


```js
|—— public          //静态资源文件
|—— src 
  |—— assets
  |—— components    //组件
  |—— hooks         //hooks组件
  |—— routers
      |—— views
          |—— views                 //视图组件
          |—— IndexRouter.js        //生成 Route
          |—— routes.config.js      //路由配置文件 [{},{}]
  |—— store
      |—— reducers      //reducers
          |——login.js
          |——list.js
      |—— actions.async.js  //异步action
      |—— actions.js        //action
      |—— index.js          //store入口文件
  |—— App.js
  |—— index.js

|—— craco.config.js //webpack 扩展文件

```

### routers

IndexRouter.js
```js
import {Switch,Route} from 'react-router-dom';
import {routes} from './routes.config';
function IndexRouter(){
    return <Switch>
         {routes.map((item,index)=>{
             return <Route key={index} path={item.path} exact={item.exact} render={(props)=>{
                 return item.render(props);
             }} />
         })}   
    </Switch>
};

export default IndexRouter;

```

routes.config.js
```js
import {lazy,Suspense} from 'react';
import { Redirect } from "react-router-dom";

const GetStartView = lazy(()=>import("./views/getstart/getstart"));
// 路由表
const routes = [
  {
    path:["/","/home","/index"],
    exact: true,
    render(props){ 
        return <HomeView {...props} />;
    }
  }, {
    path: "/getstart",
    exact: true,
    render(props) {
      return <Suspense fallback={<div>组件请求中……</div>}>
          <GetStartView {...props} />
      </Suspense>
    }
  }
]
export {routes};
```

### store

index.js
```js
import {createStore,combineReducers} from 'redux';
import a from './reducers/a';
import b from './reducers/b';

export default createStore(combineReducers({a,b}))
```
actions
```js
const actions = {
    list: {
        loading: Symbol(),
        update: Symbol()
    },
    login: {
        login: Symbol()
    }
};


export default actions;

```

## 基于 Hooks 的异步请求

## 渲染属性(Render Props)

复用逻辑 自定义视图 代码共享

http://react.caibaojian.com.cn/docs/render-props.html
术语 “render prop” 是指一种简单的技术，用于使用一个值为函数的 prop 在 React 组件之间的代码共享。
带有渲染属性(Render Props)的组件需要一个返回 React 元素并调用它的函数，而不是实现自己的渲染逻辑。

```js
function Popup(props) {
    const {render,afterClose=()=>{}} = props;
    const [showPopup,setShowPopup] = useState(true);
    const close = ()=>{
      setShowPopup(false);
    };
    const mask = useRef();
    const popup = useRef();
    useEffect(()=>{
      if(showPopup){
        mask.current.style.opacity = 1; 
        popup.current.style.transform = "translateY(0)";
      } else {
        mask.current.style.opacity = 0; 
        popup.current.style.transform = "translateY(-1000px)";
        setTimeout(() => {
          afterClose();
        }, 500);
      }
    },[showPopup]);
    return <>
        <div className="mask" ref={mask}></div>
        <div className="popup" ref={popup}>
            {render(close)}
        </div>
    </>
}
```
## 高阶组件

### 高阶函数

如果一个函数操作其他函数，即将其他函数作为参数或将函数作为返回值，将其称为高阶函数。

### 高阶组件

高阶组件(high-order component)类似于高阶函数，接收 React 组件作为输入，输出一个新的 React 组件。高阶组件让代码更具有复用性、逻辑性与抽象特征。
https://react.docschina.org/docs/higher-order-components.html


## 路由守卫 navigation-guards

路由跳转前做一些验证，比如登录验证，是网站中的普遍需求。

- 高阶组件版

```js
function Guards(props) { 
    const {isLogin} = useSelector(state=>state);
    const {Cmp,parentProps} = props;
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    useEffect(
    	()=>{
            if(!isLogin){
               dispatch({
                  type: "setPrevPath",
                  path:pathname
                })
            }
        },[isLogin]
    )
    if(isLogin){
        return <Cmp {...parentProps}/> 
    }    
    return <Redirect to="/login" />
}
function guards(Cmp) {
  return (props)=>{
    return <Guards Cmp={Cmp} parentProps={props} />
  }
}
```
- hooks 版
- 
```js
function useGuards() {
  const isLogin = useSelector(state=>state.isLogin);
  const {replace} = useHistory();
  const dispatch = useDispatch();
  const {pathname} = useLocation();
   useEffect(()=>{
            if(!isLogin){
                dispatch({
                  type: "setPrevPath",
                  path:pathname
                });
                replace("/login");
              }
        },[isLogin]
    )
}
```

## 路由按需加载处理

- suspense 和 lazy 进行懒加载设置

suspense 

fallback 加载组件过程中`占位符`；
```js
  import {lazy,susoense} from 'react';

  const Child = lazy(()=>import("./child"));

  <Suspense fallback={<div>视图请求中</div>} >
     <Child />
  </Suspense>
```
## 组件卸载

```js
import ReactDom from 'react-dom';
const dom = document.createElement('div');
// 卸载当前dom 下的所有 组件 不包含本身
ReactDom.unmountComponentAtNode(dom)
// 挂载当前dom
ReactDom.render(<>,dom)
```

