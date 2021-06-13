## vue router

[vue-router 官网](https://router.vuejs.org/zh/)

> 将组件 (components) 映射到路由 (routes)，然后告诉 Vue Router 在哪里渲染它们

Vue Router 是 Vue.js (opens new window)官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。包含的功能有：

- 嵌套的路由/视图表
- 模块化的、基于组件的路由配置
- 路由参数、查询、通配符
- 基于 Vue.js 过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的 CSS class 的链接
- HTML5 历史模式或 hash 模式，在 IE9 中自动降级
- 自定义的滚动条行为

## 基础使用

```HTML
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

> 如果使用模块化机制编程，导入 Vue 和 VueRouter，要调用 Vue.use(VueRouter)

```js
    // 1.定义(路由)组件
    const Foo = {template:'<div>Foo</div>'};
    const Bar = {template:'<div>Bar</div>'};

    // 2.定义路由
    // 每个路由应该映射一个组件，其中‘component’可以是
    // 通过 Vue.extend()创建的组件构造器
    // 或者，只是一个组件配置对象

    const routes = [
        {path:'/foo'.component:foo},
        {path:'/bar'.component:foo},
    ]

    // 3.创建router实例，然后传‘route’配置
    const router = new VueRouter({
        routes
    })

    // 4.创建和挂载实例
    const app = new Vue({
        router
    }).$mount('#app')
```

```vue
const Foo = {
  template:`<div>Foo</div>`,
  mounted(){
    this.$router // 路由器
    this.$route  // 当前路由
  }
}
```

### 动态路由

```js
  const User = {
    template:`<div>user</div>`,
  }
  
  const router = new VueRouter({
    routes:[
      // 动态路由参数 以冒号开头
      {path:'/user/:id',component:User}
    ]
  })

```

> 路径参数 映射到 $router.params[key]

/user/:username/post/:post_id  

/user/evan/post/123

{ username: 'evan', post_id: '123' }


### 响应路由参数的变化

当使用路由参数时，例如从 /user/foo 导航到 /user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。

复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) $route 对象；

```js
  const User = {
    template:'...',
    watch:{
      $route(to,from){
        // do somthing
      }
    }
  }
```


### 捕获所有路由或 404 Not found 路由

常规参数只会匹配被 / 分隔的 URL 片段中的字符。如果想匹配任意路径，我们可以使用通配符 (*)：

```js
{
  // 会匹配所有路径
  path: '*'
}
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
}
```

> 当使用通配符路由时，请确保路由的顺序是正确的
> 含有通配符的路由应该放在最后
> 路由 { path: '*' } 通常用于客户端 404 错误
> 使用了History 模式，请确保正确配置你的服务器。


当使用一个通配符时，$route.params 内会自动添加一个名为 pathMatch 参数。它包含了 URL 通过通配符被匹配的部分：
```js
// 给出一个路由 { path: '/user-*' }
this.$router.push('/user-admin')
this.$route.params.pathMatch // 'admin'
// 给出一个路由 { path: '*' }
this.$router.push('/non-existing')
this.$route.params.pathMatch // '/non-existing'

```

### 匹配优先级

同一个路径可以匹配多个路由，匹配的优先级就按照路由的定义顺序：路由定义得越早，优先级就越高。

## 嵌套路由


```
/user/foo/profile                     /user/foo/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

```html
<div id="app">
  <router-view></router-view>
</div>
```
```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [{ path: '/user/:id', component: User }]
})
```

这里的 `<router-view>` 是最顶层的出口，渲染最高级路由匹配到的组件


一个被渲染组件同样可以包含自己的嵌套 `<router-view>`


例如，在 User 组件的模板添加一个 `<router-view>`：

```js
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}
```

要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置：

```js
const router = new vueRouter({
  routes:[
    {
      path:'/user/:id',
      component:User,
      children:[
        {
          // 当 /user/:id/a 匹配成功，
          // A 会被渲染在user的<router-view />中
          path:'a',
          component:A
        },
        {
          // /user/:id/b 匹配成功
          // B 会被渲染到User的<router-view/>
          path:'b',
          component:B
        }
      ]
    }
  ]
})
```
要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。


## 编程式的导航

router.push(location, onComplete?, onAbort?)

在 Vue 实例内部，你可以通过 `$router` 访问路由实例。因此你可以调用 `this.$router.push`


该方法的参数可以是一个字符串路径，或者一个描述地址的对象

```js
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

> 如果提供了 path，params 会被忽略，

```js
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

同样的规则也适用于 `router-link` 组件的 to 属性。

在 2.2.0+，可选的在 router.push 或 router.replace 中提供 onComplete 和 onAbort 回调作为第二个和第三个参数。

注意： 如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 `/users/1` -> `/users/2`)，你需要使用 beforeRouteUpdate 来响应这个变化 (比如抓取用户信息)。


## 命名路由

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',  //命名为 user
      component: User
    }
  ]
})
```

使用

```html
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

```js
router.push({ name: 'user', params: { userId: 123 } })
```

## 命名视图

同时 (同级) 展示多个视图，而不是嵌套展示

例如创建一个布局，有 sidebar (侧导航) 和 main (主内容) 两个视图，这个时候命名视图就派上用场了

如果 router-view 没有设置名字，那么默认为 default。

```html
<router-view class='viewOne'/>
<router-view class='viewTwo' name='a' />
<router-view class='viewThree' name='b' />
```

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置 (带上 s)；

```js
  const router = new vueRouter({
    routes:[
      {
        path:'/',
        components:{
          default:Foo,
          a:Bar,
          b:Baz
        }
      }
    ]
  })
```

```
/settings/emails                                       /settings/profile
+-----------------------------------+                  +------------------------------+
| UserSettings                      |                  | UserSettings                 |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
| | Nav | UserEmailsSubscriptions | |  +------------>  | | Nav | UserProfile        | |
| |     +-------------------------+ |                  | |     +--------------------+ |
| |     |                         | |                  | |     | UserProfilePreview | |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
+-----------------------------------+                  +------------------------------+
```

* Nav 只是一个常规组件。
* UserSettings 是一个视图组件。
* UserEmailsSubscriptions、UserProfile、UserProfilePreview 是嵌套的视图组件。

```html
<!-- UserSettings.vue -->
<div>
  <h1>User Settings</h1>
  <NavBar/>
  <router-view/>
  <router-view name="helper"/>
</div>
```

```js
{
  path: '/settings',
  // 你也可以在顶级路由就配置命名视图
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      helper: UserProfilePreview
    }
  }]
}
```

## 重定向和别名

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```

重定向的目标也可以是一个命名的路由：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})
```

甚至是一个方法，动态返回重定向目标：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }}
  ]
})
```

## 别名

/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。

```js
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```

## 路由组件传参

### 取代与 $route 的耦合

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [{ path: '/user/:id', component: User }]
})
```

### 通过 props 解耦

### 布尔模式

如果 props 被设置为 true，route.params 将会被设置为组件属性。

### 对象模式

如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用。

```js
const router = new VueRouter({
  routes: [
    {
      path: '/promotion/from-newsletter',
      component: Promotion,
      props: { newsletterPopup: false }
    }
  ]
})
```

### 函数模式

你可以创建一个函数返回 props。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。

```js
const router = new VueRouter({
  routes: [
    {
      path: '/search',
      component: SearchUser,
      props: route => ({ query: route.query.q })
    }
  ]
})
```

## HTML5 History 模式

vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。

```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了

服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。

### 后端配置例子

#### Apache

```js
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

除了 mod_rewrite，你也可以使用 FallbackResource (opens new window)。

#### nginx
```js
location / {
  try_files $uri $uri/ /index.html;
}
```
#### 原生 Node.js

```js
const http = require('http')
const fs = require('fs')
const httpPort = 80

http.createServer((req, res) => {
  fs.readFile('index.html', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.html" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})
```

## 导航守卫

vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航

参数或查询的改变并不会触发进入/离开的导航守卫

### 全局前置守卫

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```
当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。


每个守卫方法接收三个参数：

* to: Route: 即将要进入的目标 路由对象

* from: Route: 当前导航正要离开的路由

* next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。


```js
// GOOD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```

### 全局解析守卫

router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。


### 全局后置钩子

你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身：

router.afterEach((to, from) => {
  // ...
})

### 路由独享的守卫

```js
const router = new VueRouter({
  routes:[
    {
      path:'/foo',
      component:Foo,
      beforeEnter:(to,from,next)=>{
        // ...
      }
    }
  ]
})
```

### 组件内的守卫

* beforeRouteEnter
* beforeRouteUpdate
* beforeRouteLeave

```js
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 beforeRouteLeave 守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

## 路由元信息

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```

```js
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```

## 过渡动效

`<router-view>` 是基本的动态组件，所以我们可以用 `<transition>` 组件给它添加一些过渡效果：
```html
<transition>
  <router-view></router-view>
</transition>
```


### 基于路由的动态过渡

```html
<!-- 使用动态的 transition name -->
<transition :name="transitionName">
  <router-view></router-view>
</transition>
```
```js
// 接着在父组件内
// watch $route 决定使用哪种过渡
watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}
```

## 数据获取

有时候，进入某个路由后，需要从服务器获取数据

* 导航完成之后获取：先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示“加载中”之类的指示。

* 导航完成之前获取：导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航。


### 导航完成后获取数据

```html
<template>
  <div class="post">
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>
```

```js
export default {
  data () {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      // replace getPost with your data fetching util / API wrapper
      getPost(this.$route.params.id, (err, post) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.post = post
        }
      })
    }
  }
}
```

### 在导航完成前获取数据

通过这种方式，我们在导航转入新的路由前获取数据。我们可以在接下来的组件的 beforeRouteEnter 守卫中获取数据，当数据获取成功后只调用 next 方法。

```js
export default {
  data () {
    return {
      post: null,
      error: null
    }
  },
  beforeRouteEnter (to, from, next) {
    getPost(to.params.id, (err, post) => {
      next(vm => vm.setData(err, post))
    })
  },
  // 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  beforeRouteUpdate (to, from, next) {
    this.post = null
    getPost(to.params.id, (err, post) => {
      this.setData(err, post)
      next()
    })
  },
  methods: {
    setData (err, post) {
      if (err) {
        this.error = err.toString()
      } else {
        this.post = post
      }
    }
  }
}
```

## 滚动行为

使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。

注意: 这个功能只在支持 history.pushState 的浏览器中可用。

```js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})
```
scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。

这个方法返回滚动位置的对象信息，长这样：

* { x: number, y: number }
* { selector: string, offset? : { x: number, y: number }} (offset 只在 2.6.0+ 支持)


如果返回一个 falsy (译者注：falsy 不是 false，参考这里 (opens new window))的值，或者是一个空对象，那么不会发生滚动。

举例：
```js
scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```

如果你要模拟“滚动到锚点”的行为：
```js
scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }
}
```

### 异步滚动
2.8.0 新增

你也可以返回一个 Promise 来得出预期的位置描述：

```js
scrollBehavior (to, from, savedPosition) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ x: 0, y: 0 })
    }, 500)
  })
}
```

### 平滑滚动

只需将 behavior 选项添加到 scrollBehavior 内部返回的对象中，就可以为支持它的浏览器 (opens new window)启用原生平滑滚动：

```js
scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash,
      behavior: 'smooth',
    }
  }
}
```

## 路由懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载.

把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件

结合 Vue 的异步组件 (opens new window)和 Webpack 的代码分割功能 (opens new window)，轻松实现路由组件的懒加载。

首先，可以将异步组件定义为返回一个 Promise 的工厂函数 (该函数返回的 Promise 应该 resolve 组件本身)：

```js
const Foo = () =>
  Promise.resolve({
    /* 组件定义对象 */
  })
```

第二，在 Webpack 2 中，我们可以使用动态 import (opens new window)语法来定义代码分块点 (split point)：

```js
import('./Foo.vue') // 返回 Promise
```

> 如果您使用的是 Babel，你将需要添加 [syntax-dynamic-import](https://babeljs.io/docs/plugins/syntax-dynamic-import/) (opens new window)插件，才能使 Babel 可以正确地解析语法。


结合这两者，这就是如何定义一个能够被 Webpack 自动代码分割的异步组件。

```js
const Foo = () => import('./Foo.vue')
```

在路由配置中什么都不需要改变，只需要像往常一样使用 Foo：

```js
const router = new VueRouter({
  routes: [{ path: '/foo', component: Foo }]
})
```

### 把组件按组分块

有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用 命名 chunk (opens new window)，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。

```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```
Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中


## [导航故障](https://router.vuejs.org/zh/guide/advanced/navigation-failures.html#%E6%A3%80%E6%B5%8B%E5%AF%BC%E8%88%AA%E6%95%85%E9%9A%9C)
