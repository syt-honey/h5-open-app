// @ts-ignore
import wx from 'weixin-js-sdk';

interface WechatConfig {
  appId: string,
  timestamp: number,
  nonceStr: string,
  signature: string
}

interface OpenTagConfig {
  appid: string,
  extinfo: string
}

class H5 {
  readonly DEFAULT_STYLE: string = "padding: 6px 10px;border: none;border-radius: 16px;cursor: pointer";
  
  wechatConfig: WechatConfig;
  btnStyle: string;
  openTagConfig: OpenTagConfig;
  btnContainerStyle: string;
  text: string;

  constructor(options: {
    wechatConfig: WechatConfig,
    openTagConfig: OpenTagConfig,
    btnContainerStyle?: string,
    btnStyle?: string,
    text?: string
  }) {
    const { wechatConfig, openTagConfig, btnContainerStyle, btnStyle, text = "打开APP"} = options;

    this.wechatConfig = wechatConfig;
    this.btnStyle = btnStyle + this.DEFAULT_STYLE;
  
    const { appid, extinfo } = openTagConfig;
    this.openTagConfig = { appid, extinfo };
    this.btnContainerStyle = btnContainerStyle;
    this.text = text;
  }

  createDom(container: HTMLElement) {
    const openApp = document.createElement("wx-open-launch-app");

    openApp.setAttribute('style', this.btnContainerStyle);
    openApp.setAttribute('appid', this.openTagConfig.appid);
    openApp.setAttribute('extinfo', this.openTagConfig.extinfo);
    openApp.setAttribute('id', this.genTagId());

    const script = document.createElement("script");
    script.setAttribute('type', "text/wxtag-template");

    const btn = document.createElement("button");
    btn.setAttribute("style", this.btnStyle);
    btn.innerHTML = this.text;
    btn.classList.add("open-btn");
    script.appendChild(btn);
    openApp.appendChild(script);

    this.mount(container, openApp);

    ["error", "launch"].map((i: string) => {
      openApp.addEventListener(i, (e: Event) => {
        this[`handle${this.titleFormat(i)}`](e);
      });
    });
  }

  handleError(e: Event): void {
    throw new Error(
      `open tag call error.${JSON.stringify(e, Object.getOwnPropertyNames(e))}`
    );
  }

  handleLaunch(e: Event): void {
    console.log(e, 'call success');
  }

  titleFormat(str: string): string {
    return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase();
  }


  verify(): void {
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

    wx.error((e: Error): void => {
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

  mount(container: HTMLElement, target: HTMLElement) {
    container.appendChild(target);
  }

  genTagId(): string {
    return `lanunch-btn-${new Date().getTime()}`
  }

  
}

export default H5;
