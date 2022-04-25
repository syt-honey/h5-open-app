import H5 from "./index";

try {
  const dom = new H5({
    wechatConfig: {
      appId: "wx45aba6737c7e1a9f",
      timestamp: 0,
      nonceStr: "",
      signature: ""
    },
    openTagConfig: {
      appid: "wx2be01a0789566f6d",
      extinfo: ""
    },
    btnContainerStyle: "",
    btnStyle: ""
  });

  const container = document.getElementById("app");
  dom.createDom(container);
  dom.verify();
  
} catch(e) {
  console.log(e);
}