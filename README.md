# Hoa

微信 H5 唤起 App 解决方案

## 使用

#### Vanilla JavaScript

```html
  <!-- 将文件下载到本地，然后配好路径 -->
  <script src="/path/hoa.min.js"></script>
```

```js
  (async function e () {
    const { H5_APP } = Hoa;
    const container = document.getElementById("app");

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
      // 开启调试
      config: {
        debug: true
      }
    });

    if (dom !== -1) {
      alert('create success...');
      dom.mount(container);
    }
  });
```

## 注意事项

* 在开始之前，先确保已经按照文档准备好了配置信息。可以参考：[解读微信内网页跳转到APP方法，使用微信开放标签：<wx-open-launch-app>](https://developers.weixin.qq.com/community/develop/article/doc/0004ce19a04320850a5a114ab5b013)
* 可以通过添加 `config` 参数设置是否进行 debug。
