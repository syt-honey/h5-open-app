import { H5 }  from "./core.js";

const H5_APP = (options) => {
  return new Promise((resolve, reject) => {
    try {
      const { wechatConfig, openTagConfig, btnContainerStyle, btnStyle, text, config = {} } = options;

      const dom = new H5({
        wechatConfig,
        openTagConfig,
        btnContainerStyle,
        btnStyle,
        text,
        config
      });

      dom.createDom();
      dom.verify();

      return resolve(dom);
    } catch(e) {
      return reject(-1);
    }
  });
}

export default { H5_APP };