import wx from './utils/weixin-js-sdk/index.js';

class H5 {
  #DEFAULT_STYLE = "padding: 6px 10px;border: none;border-radius: 16px;cursor: pointer";

  constructor(options) {
    const { wechatConfig, openTagConfig, btnContainerStyle, btnStyle, text = "打开APP"} = options;

    this.wechatConfig = wechatConfig;
    
    const { appid, extinfo } = openTagConfig;
    this.openTagConfig = { appid, extinfo };

    this.btnStyle = btnStyle + this.#DEFAULT_STYLE;
    this.btnContainerStyle = btnContainerStyle;
    this.text = text;
    this.openApp = null;
  }

  createDom() {
    this.openApp = document.createElement("wx-open-launch-app");

    this.openApp.setAttribute('style', this.btnContainerStyle);
    this.openApp.setAttribute('appid', this.openTagConfig.appid);
    this.openApp.setAttribute('extinfo', this.openTagConfig.extinfo);
    this.openApp.setAttribute('id', H5.#genTagId());

    const script = document.createElement("script");
    script.setAttribute('type', "text/wxtag-template");

    const btn = document.createElement("button");
    btn.setAttribute("style", this.btnStyle);
    btn.innerHTML = this.text;
    btn.classList.add("open-btn");
    script.appendChild(btn);
    this.openApp.appendChild(script);

    ["error", "launch"].map((i) => {
      this.openApp.addEventListener(i, (e) => {
        this[`handle${H5.#titleFormat(i)}`](e);
      });
    });
  }

  handleError(e) {
    throw new Error(
      `open tag call error.${JSON.stringify(e, Object.getOwnPropertyNames(e))}`
    );
  }

  handleLaunch(e) {
    console.log(e, 'call success');
  }

  verify() {
    const {
      appId,
      timestamp,
      nonceStr,
      signature
    } = this.wechatConfig;

    wx.config({
      debug: false,
      appId,
      timestamp,
      nonceStr,
      signature,
      jsApiList: ["onMenuShareTimeline"],
      openTagList: ["wx-open-launch-app"]
    });

    wx.error((e) => {
      throw new Error(
        `config error.${JSON.stringify(e, Object.getOwnPropertyNames(e))}`
      );
    });

    wx.ready(() => {
      // share to 
      wx.onMenuShareTimeline({
        title: "xxx",
        link: "",
        imgUrl: "",
        success: () => {
         console.log('share success')
        },
        cancel: () => {}
      });
    });
  }

  mount(container, target = this.openApp) {
    container.appendChild(target);
  }

  static #titleFormat(str) {
    return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase();
  }

  static #genTagId() {
    return `lanunch-btn-${new Date().getTime()}`
  }
}

export { H5 };
