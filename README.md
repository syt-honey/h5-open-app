# Whoa

Whoa(Open App In WeChat H5)，微信 H5 唤起 App 解决方案

## 使用

* [原生](#vanilla-javascript)
* [Vue3](#vue3)

### Vanilla JavaScript

```html
  <!-- 将文件下载到本地，然后配好路径 -->
  <script src="/path/whoa.min.js"></script>
```

```js
  (async function e() {
    const { H5_APP } = Whoa;

    // 唤起按钮将会覆盖的父级元素
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

      // 将生成的按钮覆盖在指定元素上
      dom.mount(container);

      // 唤起失败时的错误处理逻辑
      dom.openApp && dom.openApp.addEventListener("error", (e) => {
        console.log(e);
      });
    }
  });
```

### Vue3

```bash
  yarn add @honeysyt/h5-open-app
```

```vue
<template>
  <div
    :id="getId"
    class="open-app-btn"
    @click="toDownload"
  ></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { computed } from "@vue/reactivity"
import Whoa from "@honeysyt/h5-open-app"

export interface AppConfig {
  appid: string
  extinfo: string
}

export interface WechatConfig {
  app_id: string
  timestamp: string
  nonce_str: string
  signature: string
}

// 为每个组件生成不同的 id
const getId = "open-btn" + Math.random() * 10

const props = defineProps<{
  appConfig: AppConfig
  wechatConfig: WechatConfig
  text?: string
  btnContainerStyle?: string
  btnStyle?: string
}>()

const getAppConfig = computed(() => {
  return props.appConfig
})

const getWechatConfig = computed(() => {
  return props.wechatConfig
})

const getText = computed(() => {
  return props.text || "打开App"
})

const getContainerStyle = computed(() => {
  return props.btnContainerStyle || ""
})

const getBtnStyle = computed(() => {
  return (
    props.btnStyle ||
    "padding: 5px 20px;width: 90px;height: 30px;line-height: 28px;font-size: 12px;background: #FACD04;border-radius: 16px;"
  )
})

onMounted(() => {
  genBtn()
})

async function genBtn() {
  try {
    const openBtn = document.getElementById(getId)

    const { app_id, timestamp, nonce_str, signature } = getWechatConfig.value
    const { appid, extinfo } = getAppConfig.value

    const params = {
      wechatConfig: {
        appId: app_id,
        timestamp,
        nonceStr: nonce_str,
        signature,
      },
      openTagConfig: {
        appid,
        extinfo,
      },
      btnContainerStyle: getContainerStyle.value,
      btnStyle: getBtnStyle.value,
      text: getText.value,
    }

    const { H5_APP } = Whoa

    const openBtnDom = await H5_APP(params)

    if (openBtnDom !== -1) {
      openBtnDom.mount(openBtn)
      openBtnDom.openApp &&
        openBtnDom.openApp.addEventListener("error", () => {
          toDownload()
        })
    }
  } catch (e) {
    console.log(e)
  }
}

const toDownload = () => {
  // to download page
}
</script>

<style lang="less" scoped>
.open-app-btn {
  position: relative;
  font-size: 12px;
  background: #facd04;
  color: #111;
}
</style>
```
## API 说明

| API | 子属性/默认值  | 用途 | 是否必填 | 文档 |
| ------ | ------------- | ---------- | -------- | -------------------------------- |
| wechatConfig | appId、timestamp、nonceStr、signature   | 用于微信权限验证 | 是  | [JS-SDK 说明文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html) |
| openTagConfig | appid：App 唯一 Id，可在微信开放平台查看<br>extinfo：页面信息。通常为页面路径，如： yt://push.exclusive.co?page=xxx&params=xxx  | 被唤起的 APP 的相关信息 | 是 | 无  |
| btnContainerStyle | 默认值：`position: absolute;top: 0;left: 0;bottom: 0;right: 0;width: 100%;height: 100%;` | 按钮容器样式 | 否 | 无 |
| btnStyle          | 默认值：`display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;color: #252525;outline: none;background: none;box-sizing: border-box;border-color: transparent;border: none;` | 按钮样式 | 否 | 无 |
| text | 默认值：`打开APP` | 按钮文字 | 否 | 无 |
| config  | debug： 是否开启调试。Boolean，默认 false | 库配置信息 | 否 | 无 |

## 提示

* 实现的基本逻辑是：生成唤起按钮，然后直接将其挂载在父元素上（生成一个按钮，覆盖在指定元素上）。**基于这个逻辑，那么就需要实现者自己判断什么时候显示该组件。**
* 唤起按钮的样式、文本等可以根据暴露的接口自定义
* 按钮生成失败时的回调可以自定义内容

## 注意

* 在开始之前，先确保已经按照文档准备好了配置信息。可以参考：[解读微信内网页跳转到APP方法，使用微信开放标签](https://developers.weixin.qq.com/community/develop/article/doc/0004ce19a04320850a5a114ab5b013)
* 如果要覆盖父级容器的样式，需要显示的设置定位方式。如设置 `position: relative;`
* ~~基于框架的使用方式暂未测试~~(已测试通过)
