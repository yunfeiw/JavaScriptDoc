### dva-umi

## 前言

### 生成器

Generator 函数是 ES6 提供的⼀种异步编程解决⽅案

例子

```js
function* fn() {
  yield 1;
  console.log(1);
  yield 2;
  console.log(2);
  yield 3;
  console.log(3);
  yield 4;
  console.log(4);
}

const f = fn();

console.log(f); //返回个迭代器

f.next(); //1  {value:1,done:false}
f.next(); //2
f.next(); //3
f.next(); //4
f.next(); //null {value:undefind,done:true}
```

yield 表达式后⾯的表达式，只有当调⽤ next ⽅法、内部指针指向该语句时才会执⾏

## redux-saga

redux-saga 是一个用于管理应用程序 Side Effect（副作用，例如异步获取数据，访问浏览器缓存等）的 library，它的目标是让副作用管理更容易，执行更高效，测试更简单，在处理故障时更容易

### 区别

- think
  {} --> dispatch --> reducer
  fun --> 执行函数 --> dispatch --> reducer

- redux-sage

监听器 --> 请求（是否异步）

### 创建

安装

```JavaScript
npm install --save redux-saga
```

使用

```js
import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-sage";
import logo from "./logo";
// 创建 saga
const SagaMiddleware = createSagaMiddleware();
// 注册saga 中间件
const store = createStore(
  combineReducers({ logo }),
  applyMiddleware(SagaMiddleware)
);

// 监听
SagaMiddleware.run(logo);
```

### 多个 sage

使用 rootSaga

```js
import { all } from "redux-saga/effects";
import logo from "./logo";

export default function* rootSaga() {
  yield all([logo]);
}
```

组件中使用时 加上 命名空间

```js
dispatch({
  type: "nameSpace/nextPage",
});
```

#### 工作 saga - Worker saga

```js
function* getTopics(action) {
  yield put({
    type: "loading",
  });
  const res = yield call(
    fetch,
    "https://cnodejs.org/api/v1/topics?limit=10&page=" + action.page
  );
  const data = yield res.json();
  console.log(data);
  yield put({
    type: "update",
    data: data.data,
  });
}
```

#### 监听 saga - _Watcher saga_

```js
function* watchTopics() {
  yield takeEvery("getTopics", getTopics);
}
```

### dva

基于 React 和 redux 的轻量级 elm 风格框架

官网地址：[https://dvajs.com/](https://dvajs.com/)

### umi

插件化的企业级前端应用框架

官网地址：[https://umijs.org/zh-CN](https://umijs.org/zh-CN)

### 脚手架

```JavaScript
npm install create-umi -g
```

### 项目安装

```JavaScript
create-umi appName
```

### 目录结构

[https://umijs.org/zh-CN/docs/directory-structure](https://umijs.org/zh-CN/docs/directory-structure)

### 要注意问题

1. .umirc

&ensp;&ensp;&ensp;&ensp;.umirc 最终会编译成临时文件 .umi，要注意路径问题

2. .**eslintrc**

```JavaScript
{
  "extends": "eslint-config-umi",
  "rules":{
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off"
  }
}
```

2. 鉴权处理

```JavaScript
{
  path: '/setting',
  Routes: ["/src/components/auth"], // 路由守卫组件
  component: '../pages/setting'
}
```

anth

> 注意 在调用 dispatch 时 type 要添加 命名空间名

```JavaScript
import React from "react";
import useUser from "../hooks/useUser";
import { useDispatch, useLocation } from "dva"
import { useEffect } from "react";
import { Redirect } from "react-router-dom"
export default function (props) {
    const user = useUser();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    useEffect(() => {
        if (!user) {
            dispatch({
                type: "user/setPrevPath",
                prevPath: pathname
            })
        }
    }, [])
    if (user) {
        return <>{props.children}</>
    }
    return <Redirect to="/login" />
}
```

4. 状态管理

modules 的 effects 调用 put 时不需要 写命名空间

```JavaScript
import api from "../assets/js/api";
export default {
    namespace: "articles",
    state:{
        articles: [],
        count: 0,
        limit: 0,
        page: 0,
        pages: 0,
    },
    reducers: {
       upload(state,payload){
            return payload.data;
       }
    },
    effects: {
        *getData({categoryId,page},{call,put}){
            let data;
            const res = yield call(api.getArticles,{categoryId,page});
            data = res.data.results;
            yield put({
                type: "upload",
                data
            })
        }
    }
}

```

#### 注意

1. console 两次

umi 环境 遵循严格模式 所以会进行 代码检查 所以 console 会打印两次

2. 样式

样式 遵循 style-module
