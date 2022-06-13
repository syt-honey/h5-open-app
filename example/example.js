(async function e() {
  try {
    const { H5_APP } = Whoa;
    const container = document.getElementById("button");
  
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
      text: "",
      config: {
        debug: true
      }
    });
  
    if (dom !== -1) {
      // alert('create success...');
      dom.mount(container);

      dom.openApp.addEventListener('error', (e) => {
        console.log(`open tag call error.${JSON.stringify(e, Object.getOwnPropertyNames(e))}`);
      });
    }
  } catch(e) {
    console.log(e);
  }
})();