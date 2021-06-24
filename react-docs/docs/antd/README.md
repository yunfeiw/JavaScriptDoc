## antd cra

## 严格模式(Strict Mode)

`use strict`
识别具有不安全生命周期的组件
有关旧式字符串 ref 用法的警告
检测意外的副作用
检测遗留 context API

> react 默认使用严格模式

## css Modules

```js
import { useState } from "react";

function Count() {
  const [count, setCount] = useState[0];
  return <div>111</div>;
}
export default Count;
```

```js
import Count from "./Count";
import "./app.css";
class App extends Component {
  render() {
    return <div></div>;
  }
}
```

```css
/* app.css */
.warp {
  width: 300px;
  height: 100px;
}
```

- 在 create-react-app 中的使用：
  - .css .sass 正常文件
  - [name].module.css [name].module.sass 需要模块化的文件
- CSS Modules 使用
  - 局部 声明:local(.className) .className 使用 styled.className
  - 全局 :global(.className)
  - composes 引入其他样式
  -

> css 没有作用域

css 模块化;命名方式 style.module.css

案例

app.module.css

```css
.warp {
  width: 300px;
  height: 100px;
}
```

app.js

```js
import appcss from "./app.module.css";
// appcss 对象 {key:string}
function app() {
  return <div className={appcss.div}></div>;
}
```

> className 自动将 appcss 对象的 val(string)封装成一个 真实 `class`名

### css 公共样式

app.module.css

使用 `global` 包裹 即可

> 默认私有。语法： local(className)

```css
.warp {
  width: 300px;
  height: 100px;
}

/* 公共样式 */
:global(.nav) {
}

/* 私有样式 */
:local(.footer) {
}
```

### css 复用

使用 comnposes 关键字

> 注意 只能使用在 ·class· 中

```css
.warp {
  width: 300px;
  height: 100px;
  composes: yunfei;
}
/* 复用class */
.yunfei {
  background: red;
}
```

## 修改或添加 CRA 环境中 Webpack 配置

- 运行 npm run eject

  暴漏 cra 的 webpack 配置。方法不可逆

- 使用第三方提供的一些工具，来对 CRA 中 webpack 配置做扩展
  - craco
  - react-app-rewired
  - customize-cra

> 自动支持 sass 不支持 less

### craco

安装

```
 yarn add @craco/craco
```

[craco](https://github.com/gsoft-inc/craco) （一个对 create-react-app 进行自定义配置的社区解决方案）

package.json

/_ package.json _/
"scripts": {

- "start": "react-scripts start",
- "build": "react-scripts build",
- "test": "react-scripts test",

* "start": "craco start",
* "build": "craco build",
* "test": "craco test",
  }

项目根目录创建一个 craco.config.js 用于修改默认配置

```js
/* craco.config.js */
module.exports = {
  // ...
};
```

例子 自定义主题

```js
const CracoLessPlugin = require("craco-less"); // 使用less

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
```

配置参数

```
@primary-color: #1890ff; // 全局主色
@link-color: #1890ff; // 链接色
@success-color: #52c41a; // 成功色
@warning-color: #faad14; // 警告色
@error-color: #f5222d; // 错误色
@font-size-base: 14px; // 主字号
@heading-color: rgba(0, 0, 0, 0.85); // 标题色
@text-color: rgba(0, 0, 0, 0.65); // 主文本色
@text-color-secondary: rgba(0, 0, 0, 0.45); // 次文本色
@disabled-color: rgba(0, 0, 0, 0.25); // 失效色
@border-radius-base: 2px; // 组件/浮层圆角
@border-color-base: #d9d9d9; // 边框色
@box-shadow-base: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),  0 9px 28px 8px rgba(0, 0, 0, 0.05); // 浮层阴影

```

或者

修改 src/App.css，在文件顶部引入 antd/dist/antd.css。

```js
@import '~antd/dist/antd.css';
```

### Ant Design

官网: https://ant.design/index-cn

#### 使用

- 最基本使用

  - 安装 npm install antd

  - 引入

    import { DatePicker } from 'antd';

    import 'antd/dist/antd.css';

- 自定义主题

  - npm i @craco/craco yarn add @craco/craco

    craco （一个对 create-react-app 进行自定义配置的社区解决方案）

  - 修改 package.json

    ```
      "scripts": {
        -   "start": "react-scripts start",
        -   "build": "react-scripts build",
        -   "test": "react-scripts test",
        +   "start": "craco start",
        +   "build": "craco build",
        +   "test": "craco test",
      }
    ```

  - 创建一个 craco.config.js 用于修改默认配置

    ```
        /* craco.config.js */
        module.exports = {
          // ...
        };
    ```

  - 安装 \$ yarn add craco-less
  - 修改 craco.config.js 配置


    ```
        const CracoLessPlugin = require('craco-less');
        module.exports = {
                plugins: [
                    {
                    plugin: CracoLessPlugin,
                    options: {
                        lessLoaderOptions: {
                        lessOptions: {
                            modifyVars: { '@primary-color': '#1DA57A' },
                            javascriptEnabled: true,
                        },
                        },
                    },
                },
            ],
        };
    ```
