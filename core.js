import wx from './utils/weixin-js-sdk/index.js';

class H5 {
  #DEFAULT_BTN_STYLE = "display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;color: #252525;outline: none;background: none;box-sizing: border-box;border-color: transparent;border: none;";
  #DEFAULT_CONTAINER_STYLE = "position: absolute;top: 0;left: 0;bottom: 0;right: 0;width: 100%;height: 100%;";

  constructor(options) {
    const { wechatConfig, openTagConfig, btnContainerStyle, btnStyle, text = "打开APP", config } = options;
    
    this.wxDebugger = !!config.debug;
    this.wechatConfig = wechatConfig;
    
    const { appid, extinfo } = openTagConfig;
    this.openTagConfig = { appid, extinfo };

    this.btnStyle = this.#DEFAULT_BTN_STYLE + btnStyle;
    this.btnContainerStyle = this.#DEFAULT_CONTAINER_STYLE + btnContainerStyle;
    this.text = text;
    this.openApp = null;

    this.isCallError = false;
  }

  createDom() {
    this.openApp = document.createElement("wx-open-launch-app");

    this.openApp.setAttribute('style', this.btnContainerStyle);
    this.openApp.setAttribute('appid', this.openTagConfig.appid);
    this.openApp.setAttribute('extinfo', this.openTagConfig.extinfo);
    this.openApp.setAttribute('id', this.genTagId());

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
        this[`handle${this.titleFormat(i)}`](e);
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
      debug: this.wxDebugger,
      appId,
      timestamp,
      nonceStr,
      signature,
      jsApiList: ["onMenuShareTimeline"],
      openTagList: ["wx-open-launch-app"]
    });

    wx.ready(() => {
      if (!this.isCallError) {
        wx.onMenuShareTimeline({
          title: "xxx",
          link: "",
          imgUrl: "",
          success: () => {
            console.log('share success')
          },
          cancel: () => {}
        });
      }
    });

    wx.error(e => {
      this.isCallError = true;
      throw new Error(
        `config error.${JSON.stringify(e, Object.getOwnPropertyNames(e))}`
      );
    });
  }

  mount(container, target = this.openApp) {
    container.appendChild(target);
  }

  titleFormat(str) {
    return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase();
  }

  genTagId() {
    return `lanunch-btn-${new Date().getTime()}`
  }
}

export { H5 };
