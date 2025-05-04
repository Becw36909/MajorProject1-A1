import Utils from "./../../Utils";
import Auth from "./../../Auth";
import BaseSplitView from "../layouts/BaseSplitView";
import { html } from "lit-html";

class TemplateView extends BaseSplitView {
  constructor() {
    super();
  }

  init() {
    document.title = "Template | AgistEase";
    this.render();
    Utils.pageIntroAnim();
  }

  renderContent() {
    return html`
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
        <p>This area can be used to prototype further sections or embed test content.</p>
      </div>
    `;
  }
}

export default new TemplateView();
