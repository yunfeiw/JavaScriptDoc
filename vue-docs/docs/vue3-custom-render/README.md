## custom-render api


- template  
- render
- vnode(tree) 
- mountElemnt
- UI(dom)  pc 移动 小程序

![渲染流程](/assets/img/xuan-ran-liu-cheng.png)

### 自定义 渲染
```js
import {createApp,createRenderer} from 'vue';

const App = {
  template:'<div>app</div>'
}

// createApp 默认创建 dom元素节点
createApp(App).mount('#app');
//createRenderer

createRenderer({
  // 创建节点
  createElement(type){
    // type 创建元素类型
    // return rendererElement
    return document.createElement(type);
  },
  // 设置节点文本
  setElementText(node,text){
    // node 为 上面createElement 返回值；
    // text 为 组件文本  例：App中的 app
    node.textContent = text;

  },
  // 注入 UI(元素中)
  insert(el,parent){
    // el 创建元素
    // parent 被插入节点
    parent.append(el)
  }

}) //参数对象


```

### 例子

基于[pixiJS](https://www.pixijs.com/)实现自定义渲染

![pixijs](/assets/img/pixijs.png)


```js
// 安装
npm i pixi.js
```

```js
import {Application,Graphics} from 'pixi.js'


const gram = new Application({
  width:500,
  height:500
});

document.querySelector('body').append(game.view);

// 创建矩形

const rect = new Graphics();
rect.beginFill(0xff0000);
rect.drawRect(0,0,50,50)
rect.x = 100
rect.y=100;

//添加事件
rect.interactive = true;//开启


// 容器概念
game.stage.addChild(rect)

// 创建图片

const img = new Sprite()

img.texture = Texture.from('src');
game.stage.addChild(img)

// 创建容器

const box = new Container();
game.stage.addChild(box);

const img2 = new Sprite();
img2.texture = Texture.from('src')

box.stage.addChild(img2)

box.x =100；
// 容器内的元素 随元素移动而变化

// 帧循环

const hanlder = ()=>{
  img.x++
}
// 绑定
game.ticker.add(hanlder)
// 移出
game,ticker.remove(hanlder)


```

实现
```js

const renderer = createRenderer({
  createElement(type) {
    // 容器 以及 图片
    console.log(type);
    let element;
    switch (type) {
      case "container":
        element = new Container();
        break;
      case "sprite":
        element = new Sprite();
        break;
    }

    return element;
  },

  insert(el, parent) {
    if (el) {
      parent.addChild(el);
    }
  },
  parentNode(node) {
    // 获取当前 node 的父级节点
    // parent
    return node.parent;
  },
  remove(el) {
    // 当删除一个元素的时候 进行调用
    if (el && el.parent) {
      // removeChild(el)
      el.parent.removeChild(el);
    }
  },
  patchProp(el, key, prevValue, nextValue) {
    // props
    // console.log("key", key);
    switch (key) {
      case "texture":
        // 给图片 src 的时候
        el.texture = Texture.from(nextValue);
        break;
      case "onClick":
        // onClick
        el.on("pointertap", nextValue);
        break;
      default:
        // x y
        // interactive
        // el.x = nextValue
        // el.y = nextValue
        el[key] = nextValue;
        break;
    }
  },
  // 必须要的
  createText(text) {
    return new Text(text);
  },

  nextSibling() {},
  createComment() {},
});
```