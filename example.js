import { H5_APP } from "./index.js";

try {
  const container = document.getElementById("app");

  const dom = await H5_APP({
    // 需要唤起的 app 信息
    openTagConfig: {
      appid: "",
      extinfo: ""
    },
    // 通过 url 拿到的鉴权信息
    wechatConfig: {
      appId: "",
      timestamp: 0,
      nonceStr: "",
      signature: ""
    },
    btnContainerStyle: "", // 按钮容器的样式
    btnStyle: "", // 按钮样式
    text: "" // 按钮文案
  });

  if (dom !== -1) {
    dom.mount(container);
  }
} catch(e) {
  console.log(e);
}