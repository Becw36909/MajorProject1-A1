import App from "../../App";
import { html, render } from "lit-html";
import Auth from "../../Auth";
import BaseView from "./BaseView";

export default class BaseSplitView extends BaseView {
  constructor() {
    super();
  }

  render() {
    if (this.isMobile) {
      const template = html`
        <div class="mobile-topbar">
          <ag-topbar .user=${Auth.currentUser}></ag-topbar>
        </div>
        <div class="mobile-content" style="padding: 1.5rem;">
          ${this.renderMobileContent()}
        </div>
      `;
      render(template, App.rootEl);
      return;
    }

    const topbarHeight = 300;

    const template = html`
      <sl-split-panel
        position-in-pixels="275"
        style=" --min: 200px; --max: 300px;"
        disabled
      >
        <!-- Sidebar -->
        <div
          slot="start"
          class="sidebar-panel"
          style=" background: var(--app-sidebar-bg); display: flex; align-items: center; justify-content: center;  overflow: hidden;"
        >
          <ag-app-sidebar .user=${Auth.currentUser}></ag-app-sidebar>
        </div>

        <!-- Right panel: Topbar + Main Content -->
        <div slot="end">
          <sl-split-panel vertical style="height: 100vh;" disabled position-in-pixels="100">

                    <!-- Topbar image -->
            <div slot="start" style="height: 100px; overflow: hidden;">
              <ag-topbar></ag-topbar>
            </div>

            <!-- Main Content Panel -->
            <div
              slot="end"
              style="overflow-y: auto; padding: 2rem; height: 100%; box-sizing: border-box;"
            >
              ${this.renderContent()}
            </div>
          </sl-split-panel>
        </div>
      </sl-split-panel>
    `;
    render(template, App.rootEl);
  }

  // These methods must be implemented by subclasses:
  renderContent() {
    return html`<p>[Implement renderContent()]</p>`;
  }

  renderMobileContent() {
    return html`<p>[Implement renderMobileContent()]</p>`;
  }
}
