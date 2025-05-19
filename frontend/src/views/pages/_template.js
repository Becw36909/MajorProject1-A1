import App from "./../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "./../../Router";
import Auth from "./../../Auth";
import Utils from "./../../Utils";
import moment from "moment";
import Toast from "../../Toast";

class TemplateView {
  init() {
    document.title = "Template | AgistEase";
    this.render();
    Utils.pageIntroAnim();
  }

  render() {
    const template = html`
      <ag-app-layout>
        <h1>Hello, ${Auth.currentUser.firstName}!</h1>

        <ag-tile-grid>
          <ag-tile-button
            label="Example Tile"
            iconImage="/images/icons/horse-solid.svg"
            route="/example"
          ></ag-tile-button>
          <ag-tile-button
            label="Another Action"
            iconImage="/images/icons/bell-solid.svg"
            route="/another"
          ></ag-tile-button>
        </ag-tile-grid>

        <div class="template-preview">
          <h2>Placeholder Section</h2>
          <p>
            This area can be used to prototype further sections or embed test
            content.
          </p>
        </div>
      </ag-app-layout>
    `;
    render(template, App.rootEl);
  }
}

export default new TemplateView();
