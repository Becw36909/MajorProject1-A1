import App from "./../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "./../../Router";
import Auth from "./../../Auth";
import Utils from "./../../Utils";

class AdminDashboardView {
  init() {
    document.title = "Admin Dashboard";
    this.render();
    Utils.pageIntroAnim();
  }

  render() {
    const template = html`
      <div class="dashboard-layout">
        <ag-app-sidebar></ag-app-sidebar>

        <div class="dashboard-content">
          <ag-topbar></ag-topbar>

          <div class="page-content">
            <h1>Welcome, ${Auth.currentUser.firstName}!</h1>

            <h3>Quick Links:</h3>
            <div class="dashboard-buttons">
              <sl-button @click=${() => gotoRoute("/profile")}>View Profile</sl-button>
              <sl-button @click=${() => gotoRoute("/horses")}>Manage Horses</sl-button>
              <sl-button @click=${() => gotoRoute("/requests")}>Manage Requests</sl-button>
              <sl-button @click=${() => gotoRoute("/calendar")}>View Calendar</sl-button>
            </div>
          </div>
        </div>
      </div>
    `;

    render(template, App.rootEl);
  }
}

export default new AdminDashboardView();
