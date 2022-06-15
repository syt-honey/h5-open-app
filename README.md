# Whoa

Whoa(Open App In WeChat H5)，微信 H5 唤起 App 解决方案

## 使用

### Vanilla JavaScript

```html
  <!-- 将文件下载到本地，然后配好路径 -->
  <script src="/path/whoa.min.js"></script>
```

```js
  (async function e() {
    const { H5_APP } = Whoa;
    const container = document.getElementById("button");

    const dom = await H5_APP({
      // 需要唤起的 app 信息
      openTagConfig: {
        appid: "", // appid，可在微信开放平台查看
        extinfo: "" // 唤起页面信息
      },
      // 后端返回的鉴权信息
      wechatConfig: {
        appId: "", // 公众号 id
        timestamp: 0,
        nonceStr: "",
        signature: ""
      },
      // 默认样式：https://github.com/syt-honey/h5-open-app/blob/main/core.js
      btnContainerStyle: "", // 按钮容器样式
      btnStyle: "", // 按钮样式
      text: "", // 按钮文本。默认为：打开APP
      // 开启调试
      config: {
        debug: true
      }
    });

    if (dom !== -1) {
      alert('dom create success...');
      dom.mount(container);

      // 唤起失败时的错误处理逻辑
      dom.openApp && dom.openApp.addEventListener("error", (e) => {
        console.log(e);
      });
    }
  });
```

### 框架

```bash
  yarn add @honeysyt/h5-open-app
```

```js
  // main.js
  import Whoa from "@honeysyt/h5-open-app";

  const { H5_APP } = Whoa;
  const container = document.getElementById("button");

  const dom = await H5_APP({
    // 需要唤起的 app 信息
    openTagConfig: {
      appid: "", // appid，可在微信开放平台查看
      extinfo: "" // 唤起页面信息
    },
    // 后端返回的鉴权信息
    wechatConfig: {
      appId: "", // 公众号 id
      timestamp: 0,
      nonceStr: "",
      signature: ""
    },
    // 默认样式：https://github.com/syt-honey/h5-open-app/blob/main/core.js
    btnContainerStyle: "", // 按钮容器样式
    btnStyle: "", // 按钮样式
    text: "", // 按钮文本。默认为：打开APP
    // 开启调试
    config: {
      debug: true
    }
  });

  if (dom !== -1) {
    alert('dom create success...');
    dom.mount(container);

    // 唤起失败时的错误处理逻辑
    dom.openApp && dom.openApp.addEventListener("error", (e) => {
      console.log(e);
    });
  }
```

## 注意事项

* 在开始之前，先确保已经按照文档准备好了配置信息。可以参考：[解读微信内网页跳转到APP方法，使用微信开放标签](https://developers.weixin.qq.com/community/develop/article/doc/0004ce19a04320850a5a114ab5b013)
* 父级容器（如上面的 `container`）需要显示的设置定位方式。如设置 `position: relative;`
* 可以通过添加 `config` 参数设置是否进行 debug
* 不支持 IE 浏览器和 `Opera Mini` 浏览器
* 基于框架的使用方式暂未测试
