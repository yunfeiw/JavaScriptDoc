## redux

- 掌握自定义 hooks
- 掌握 redux 三大原则
- 掌握 redux 基础使用
- 掌握 react-redux 使用
- 掌握 redux-thunk 使用

## redux

- Redux 是一个独立的 JavaScript 状态管理库，不依赖于任何其他库
- https://www.redux.org.cn/

## 安装 Redux

npm i redux
yarn add redux

### 核心概念

- state 状态
- reducer 纯函数 - 提供修改状态的方法
- store 仓库 - 管理状态
- action 动作 - 对 state 的修改动作

### redux 三大原则

- 单一数据源: 整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中
- state 是只读的: 唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象
- 使用纯函数来执行修改，映射出新的 state

## 例子

```js
import {createStore} from 'redux';
const reducer  =(state={conut:1},action)=>{
   switch(action.type){
      case 'add':
         return {
            count:state.count++
         }
      case 'jj':
         return {
            count:state.count--
         }
   }

   return state;
}

const store = createStore(reducer);
console.log(store);{count:1}
store.dispatch({type:'add'})
console.log(store.getState()){count:2}
store.dispatch({type:'add'})
console.log(store.getState()){count:3}
store.dispatch({type:'add'})
console.log(store.getState()){count:4}
```

store 仓库 用来对状态进行管理

- getState: f getstate()

当前 store 中的状态

- dispatch: f dispatch(action)
  修改状态指令，store 重新调用 reduce 函数，reducer 函数获取当前- action 之后，跟据 action 来映射出新的 state

> 注意 该方法是同步方法

- replaceReducer: f replaceReducer(nextReducer)
  替换掉原来的 reducer
  ```js
  store.replaceReducer((state = { conut: 1 }, action) => {
    switch (action.type) {
      case "add":
        return {
          count: state.count + 2,
        };
      case "jj":
        return {
          count: state.count - 2,
        };
    }
    return state;
  });
  ```
  -subscribe: f subscribe(listner)
  监听 state

```js
const unSubscribe = store.subscribe(() => {
  console.log(store.getState);
});
```

reducer 纯函数，用来修改状态，在 redux 中，只能在 reducer 中进行状态修改

- state 当前状态
- action 对状态的修改指令
  默认情况下 是对象 由 type payload；type 是做何种操作；payload 是可选参数（type 是规定属性名）

> 纯函数：一个纯粹的函数，内部没有副作用；不依赖外部作用，只依赖于参数；
> 相同的输入永远返回相同的输出
> 不修修改函数的输入值
> 不依赖外部环境状态，只依赖器其参数
> 无任何副作用

## react-redux

- Provider
  react-redux 提供组件，基于 react context 开发组件
- connect
  react-redux 提供组件，提供的高级组件，适用于 react 类组件或函数组件，获取 redux 中定义的`state`或`dispatch`方法

是一个普通方法，调用 connect 时，要传入一个 select 函数，connect 会返回一个 withConnet 高阶组件

select 函数，用于选择状态中，需要的部分，即 state{name:1,age:2},只取 name 即可;

select 返回值，必须是一个对象，对象中包括的是选中的状态（即选择的值 name）

- react-redux 提供的 hooks

  - useDispatch 获取 dispatch;
  - useStore 获取 store
  - useSelector 获取 state
    > 注意 react-redux 只能使用在·函数组件·中；
    > 注意 react-redux 7 之后版本可用
    > 声明

  ```js
   import react,{Component} from 'react';
   import ReactDOM from 'react-dom';
   import {Provide} from 'react-reducs';
   import App from './app';
   import store from './store';
   ReactDOM.render(
      <Provider
         store={store}
      >
         <App/>
      </Provider>,
      document.querySelector('#root');
   )
  ```

- connect：react-redux

```js
// app.js
import{connect} from 'react-redux';

function App(props){
   const {count} = props
   return(
      <div>
         count:{count}
      </div>
   )
};
// 命名 习惯性 首部加 with
const withConnect = connect(state=>{
   return {
      count:state.count
   }
});
const newApp = wwithConnect(App);
export defualt newApp
```

组件 a 传入 withConnect，withConnect 返回组件 b,b 被调用时会调用 a，并且会将 select 函数中选择到的 状态 以及 `dispatch`方法传递给 a

> 高阶组件 是一个高阶函数的进化版，接受一个组件，返回一个新的组件

- react-redux 提供 hooks

```js

// app.js
import{useSelector,useDispatch,useStore} from 'react-redux';

function App(){
   const {count} = useSelector(state => state)；
   const dispatch = useDispatch(); //dispatch 方法
   return(
      <div>
         count:{count}
         <button onClick={()=>{dispatch({
            type:'add'
         })}}>新增</button>
      </div>
   )
};
export defualt App
```

> 注意 react 所有 hooks 只能在*函数*中使用

---

## reducer 拆分

```js
function name(state={name:'yunfei'},action)(){
   switch(action.type){
      case 'set':
         return {name:action};
      case 'rm':
         return ''
   }
}
function age(state={age:18},action)(){
   switch(action.type){
      case 'add':
         return {age:state.age++};
      case 'jj':
         return {age:state.age--};
   }
}

function reducer(state={
   name:undefined,
   age:undefined
},action){
   return{
      name:name(state.name,action),
      age:name(state.age,action),
   }
}

const store = createStore(reducer);
```

react-redux 提供方法

combineReducers 返回如上实现的 reducers 方法

```js
const reducer = combineReducers({
  name,
  age,
});
const store = createStore(reducer);
```

> 注意 使用 redux 时 action 的 type 唯一（例如 加上 reducer 前缀）

## 中间件

applyMiddleware

无中间件： a->b dispatch --> reducer

有中间件：a->中间件->b dispatch -->中间件 --> reducer

react-thunk 可以使 diapatch 接收一个值为 函数的 action(异步 action)
  
以往

    对象：dispatch --> reducer

添加 think 后

    函数：dispatch --> 执行该函数 --> reducer
    dispatch((dispatch,getState)=>{
       ...
    })
    接受两个参数 dispatch getState

```js
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
const reducer = function(
  state = {
    page: 1,
    list: [],
    loading: false,
  },
  action
) {
  console.log(action);
  switch (action.type) {
    case "loading":
      return {
        ...state,
        loading: true,
      };
    case "update":
      return {
        ...state,
        list: action.list,
        loading: false,
      };
    case "prev":
      return {
        ...state,
        page: state.page > 1 ? state.page - 1 : state.page,
      };
    case "next":
      return {
        ...state,
        page: state.page + 1,
      };
  }
  return state;
};
export default createStore(reducer, applyMiddleware(thunk));
```

app.js

```js
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getListData } from "./actions";

function App() {
  const { loading, list, page } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListData);
  }, [page]);
  return (
    <div>
      <h2>列表</h2>
      {loading ? (
        <p>数据获取中</p>
      ) : (
        <ul>
          {list.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
      <button
        onClick={() => {
          dispatch({
            type: "perv",
          });
        }}
      >
        上一页
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "next",
          });
        }}
      >
        下一页
      </button>
    </div>
  );
}

export default App;
```

actions.js

```js
import axios from "axios";
function getListData(dispatch, getState) {
  dispatch({
    type: "loading",
  });
  const { page } = getState();
  axios
    .get(`https://cnodejs.org/api/v1/topics?page=${page}&limit=5`)
    .then((res) => {
      dispatch({
        type: "update",
        list: res.data.data,
      });
    });
}

export { getListData };
```

## 集成 symbol

例子

```js
const countActions = {
  plus: Symbol(),
  mius: Symbol(),
};

function count(count = 1, action) {
  switch (action.type) {
    case countActions.plus:
      return count + 1;
    case countActions.mius:
      return count - 1;
    default:
      return count;
  }
}

export { countActions };
export default count;
```
