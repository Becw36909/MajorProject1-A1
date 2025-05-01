import Utils from "./../../Utils";
import Auth from "./../../Auth";
import BaseSplitView from "../layouts/BaseSplitView";
import { html } from "lit-html";

class TemplateView extends BaseSplitView {
  constructor() {
    super();
  }

  init() {
    document.title = "Template";
    this.render();
    Utils.pageIntroAnim();
  }

  renderContent() {
    return html`
      <h1>Template View</h1>
      <p>This is the full-width content area for large screens.</p>
    `;
  }

  renderMobileContent() {
    return html`
      <h1>Template View</h1>
      <p>This is the mobile version of the template view.</p>
    `;
  }
}

export default new TemplateView();
