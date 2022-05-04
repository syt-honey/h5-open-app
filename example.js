import { H5_APP } from "./index.js";

try {
  const container = document.getElementById("app");

  const dom = await H5_APP({
    wechatConfig: {
      appId: "",
      timestamp: 0,
      nonceStr: "",
      signature: ""
    },
    openTagConfig: {
      appid: "",
      extinfo: ""
    },
    btnContainerStyle: "",
    btnStyle: ""
  });

  dom.mount(container);

  console.log(dom)
  
} catch(e) {
  console.log(e);
}