## 开始

学会搭建 TypeScript 环境

掌握 TypeScript 代码的编译与运行

## 环境搭建

TypeScript 编写的程序并不能直接通过浏览器运行，我们需要先通过 TypeScript 编译器把 TypeScript 代码编译成 JavaScript 代码

TypeScript 的编译器是基于 Node.js 的，所以我们需要先安装 Node.js

## 安装 TypeScript 编译器

通过 NPM 包管理工具安装 TypeScript 编译器

安装完成以后，我们可以通过命令 tsc 来调用编译器

```js

 //安装
 npm i -g typescript

 //查看当前 tsc 编译器版本

 tsc -v
```

## 编译执行

使用我们安装的 TypeScript 编译器 tsc 对 .ts 文件进行编译

```js
tsc ./src/index.ts
```

默认情况下会在当前文件所在目录下生成同名的 js 文件

## 编译选项

编译命令 tsc 还支持许多编译选项，这里我先来了解几个比较常用的

### --outDir

指定编译文件输出目录

### --target

指定编译的代码版本目标，默认为 ES3

### --watch

在监听模式下运行，当文件发生改变的时候自动编译

```js
// ./src/index.ts
let str: string = "yunfei";
```

> tsc ./src/index.ts

> tsc --outDir ./dist ./src/index.ts

> tsc --outDir ./dist --target ES6 ./src/index.ts

> tsc --outDir ./dist --target ES6 --watch ./src/index.ts

## 编译配置文件： tsconfig.json

编译选项保存在指定的 json 文件中，默认情况下 tsc 命令运行的时候会自动去加载运行命令所在的目录下的 tsconfig.json 文件;

配置文件格式如下有了单独的配置文件，我们就可以直接运行指定加载的配置文件使用 --project 或 -p 指定配置文件目录，会默认加载该目录下的 tsconfig.json 文件也可以指定某个具体的配置文件

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "target": "ES2015",
    "watch": true
  },
  // ** : 所有目录（包括子目录）
  // * : 所有文件，也可以指定类型 *.ts
  "include": ["./src/**/*"]
}
```

> tsc

> tsc -p ./configs

> tsc -p ./configs/ts.json
