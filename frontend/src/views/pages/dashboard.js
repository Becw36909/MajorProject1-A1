import App from "./../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "./../../Router";
import Auth from "./../../Auth";
import Utils from "./../../Utils";
import Toast from "../../Toast";

class DashboardView {
  constructor() {
    this.sidebarRendered = false;
  }
  async init() {
    console.log(Auth.currentUser);

    const toastMessage = localStorage.getItem("toastMessage");
    if (toastMessage) {
      Toast.show(toastMessage);
      localStorage.removeItem("toastMessage");
    }
    document.title = "Dashboard | AgistEase";

    this.render();
    Utils.pageIntroAnim();
  }

  render() {
    const template = html`
      <sl-split-panel
        position-in-pixels="275"
        style=" --min: 200px; --max: 300px;"
        disabled
      >
        <div
          slot="start"
          class="sidebar-panel"
          style=" background: var(--app-sidebar-bg); display: flex; align-items: center; justify-content: center;  overflow: hidden;"
        >
          <ag-app-sidebar .user=${Auth.currentUser}></ag-app-sidebar>
        </div>
        <div slot="end">
          <sl-split-panel vertical style="height: 200px;" disabled>
            <div slot="start" style="height: 100px; overflow: hidden;">
              <ag-topbar></ag-topbar>
            </div>
            <div
              slot="end"
              style="height: calc(100vh - 200px); overflow-y: auto; padding: 2rem;"
            >
              <h1>Welcome, ${Auth.currentUser.firstName}</h1>
              <p>This will be your Admin Dashboard page content.</p>
            </div>
          </sl-split-panel>
        </div>
      </sl-split-panel>
    `;
    render(template, App.rootEl);
  }
}

export default new DashboardView();
