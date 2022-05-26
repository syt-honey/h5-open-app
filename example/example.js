(async function e() {
  try {
    const { H5_APP } = Whoa;
    const container = document.getElementById("app");
  
    const dom = await H5_APP({
      openTagConfig: {
        appid: "",
        extinfo: ""
      },
      wechatConfig: {
        appId: "",
        timestamp: 0,
        nonceStr: "",
        signature: ""
      },
      btnContainerStyle: "",
      btnStyle: "",
      config: {
        debug: true
      }
    });
  
    if (dom !== -1) {
      alert('create success...');
      dom.mount(container);
    }
  } catch(e) {
    console.log(e);
  }
})();