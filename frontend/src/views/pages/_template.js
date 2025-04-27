import App from "./../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "./../../Router";
import Auth from "./../../Auth";
import Utils from "./../../Utils";

class TemplateView {
  init() {
    document.title = "Template";
    this.render();
    Utils.pageIntroAnim();
  }

  render() {
    const template = html`
      <div class="dashboard-wrapper">
        <ag-app-sidebar></ag-app-sidebar>
        <div class="main-content">
          <ag-topbar></ag-topbar>
          <div class="page-content">
            <h1>Page title</h1>
            <p>Page content goes here...</p>
          </div>
        </div>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new TemplateView();
