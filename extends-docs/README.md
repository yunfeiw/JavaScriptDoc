前端发展 --> 编译原理

工程化 

babel 

工程化工具 

webpack vite rollup

#### vite

利用浏览器对 es6 import 支持，开发时不需要打包，提高开发效率与体验

#### webpack

不说了 开发 打包工具

#### rollup

vue2 就是rollup打包，特点是 tree-shaking
### 前端职位

p6 独挡一面

1. 项目
2. 产品讨论，带领团队
3. 负责人，与后端指定规范
4. 性能优化

p7 领域专家

1. 领域专业
2. 搭建系统，性能优化，跨段，mvvm框架

p8 行业专家+规划

### 前端能做什么

性能优化和防御式编程
兼容性


## vite实现原理

- 搭建本地serve 通过es6实现模块化导入js; 
- 无需打包，直接启动dev serve 开始本地开发;
- vite 打包依然走的是rollup


### 目录

```js
|—— src             // 组件、静态资源
|—— index.html      //html文件
|—— server.js       //本地服务
```

### 本地服务

koa

```js
const Koa = require('koa')
const fs = require('fs')
const path = require('path');

const app = new Koa();

app.use(async (ctx) => {
    const { request: { url } } = ctx;
    console.log(ctx)
    if (url === '/') {
        ctx.type = 'text/html';
        ctx.body = fs.readFileSync('./index.html', 'utf-8');
    } else if (url.endsWith('.js')) {
        ctx.type = 'application/javascript';
        ctx.body = fs.readFileSync(path.resolve(__dirname,url.slice(1)), 'utf-8')
    }
})

app.listen(8082, (err) => {
    console.log(err,'success');
})
```
index.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./src/main.js" type="module"></script>
</head>

<body>
    <h3>hello</h3>
</body>

</html>
```
main.js
```js
import {app} from './module/yunfei.js'

console.log('我是 main')
app()
```

> 注意

```js
import vue from 'vue'
```

此类包引入方式 会报错；因为浏览器不识别；需要转换成浏览器可识别的路径；在·服务端·做处理；


改进如下

```js
const Koa = require('koa')
const fs = require('fs')
const path = require('path');

const app = new Koa();

app.use(async (ctx) => {
    const { request: { url } } = ctx;

    if (url === '/') {
        // 匹配html
        ctx.type = 'text/html';
        const content  = fs.readFileSync('./index.html', 'utf-8');
        
        // 因为 vue 使用process ，基于node环境，所以在window下挂载该环境变量 add
        ctx.body = content.replace('<script ',`
            <script>
                window.process = {
                    env:{
                        NODE_ENV:'dev'
                    }
                }
            </script>
            <script
        `)
    } else if (url.endsWith('.js')) {
        // 匹配js
        const p = path.resolve(__dirname, url.slice(1));
        ctx.type = 'application/javascript';
        ctx.body = rewriteimport(fs.readFileSync(p, 'utf-8'));

    } else if (url.startsWith('/@module/')) {   //add
        // 匹配模块
        const prefix = path.resolve(__dirname, 'node_modules', url.replace('/@module/', ''));
        // console.log('666',prefix,url.replace('/@module', ''))
        
        const module = require(prefix + '/package.json').module;
        const p = path.resolve(prefix, module);
        const res = fs.readFileSync(p, 'utf-8');
        ctx.type = 'application/javascript';
        // 注意 res 内也需要 进行 配置
        ctx.body = rewriteimport(res);
    }
})

app.listen(8082, (err) => {
    console.log(err, 'success');
})


// 匹配 src下content替换 import 包 为 node_module

function rewriteimport(content) {
    return content.replace(/ from ['|"]([^'"]+)['|"]/g, function (s0, s1) {
        if (s1[0] !== '.' && s1[1] !== '/') {
            return `from '/@module/${s1}'`;
        } else {
            return s0
        }
    })
}

```

### .vue文件支持

前提安装包 @vue/compiler=sfc @vue/compiler-dom

新增 .vue判断
```js
 } else if (url.indexOf('.vue') > -1) {
        const p = path.resolve(__dirname, url.split('?')[0].slice(1));
        const { descriptor } = compilerSfc.parse(fs.readFileSync(p, 'utf-8'));

        if (!query.type) {

            ctx.type = 'application/javascript';
            ctx.body = `${rewriteimport(
                descriptor.script.content.replace('export default', 'const __script = ')
            )}
            import {render as __render} from '${url}?type=template'
            
                __script.render = __render
                export default __script
            `
        } else {
            ctx.type = 'application/javascript';
            const render = compilerDom.compile(descriptor.template.content, {
                mode: 'module'
            }).code;
            ctx.body = rewriteimport(render);

        }

    }

```

### css支持

```js
} else if (url.endsWith('.css')) {
    const p = path.resolve(__dirname,url.slice(1));
    const file = fs.readFileSync(p,'utf-8');
    const content = `
        const css = \`${file.replace(/\n/g,'')}\`;
        const link = document.createElement('style');
        link.setAttribute('type','text/css');
        document.head.appendChild(link);
        link.innerHTML = css;
        export default css;
    `
    ctx.type = 'application/javascript';
    ctx.body = content;
}

```
```css
body{
    background-color: royalblue;
}
h3{ 
    color: red;
}

> 注意 读取css文件内容后，需要inner到style标签内，因为字符串的特殊性，所以使用·模板字符·来设置。否则会有问题；

```
### vite其他支持

- .vue单文件组件的支持
- 热更新hmr
- 预先打包（将 较大的包 预先打包）

## 扩展

#### 文件上传


1. 文件上传 axios.post
2. 文件2个G，需要断点续传
3. 计算md5卡、web wrkder、time-slice、抽样哈希（布隆过滤器）

#### 用户列表
1. 虚拟滚动

