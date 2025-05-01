export default class BaseView {
    constructor() {
      this.isMobile = window.innerWidth <= 768;
      this._onResize = () => {
        const nowMobile = window.innerWidth <= 768;
        if (nowMobile !== this.isMobile) {
          this.isMobile = nowMobile;
          this.render();
        }
      };
      window.addEventListener("resize", this._onResize);
    }
  
    destroy() {
      window.removeEventListener("resize", this._onResize);
    }
  }
  