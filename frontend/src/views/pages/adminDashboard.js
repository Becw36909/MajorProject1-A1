import App from "./../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "./../../Router";
import Auth from "./../../Auth";
import Utils from "./../../Utils";

class AdminDashboardView {
  init() {
    document.title = "Dashboard";
    this.render();
    Utils.pageIntroAnim();
  }

  render() {
    const template = html`
      <div style="display: flex; height: 100vh; overflow: hidden;">
        <ag-app-sidebar></ag-app-sidebar>

        <div style="flex-grow: 1; display: flex; flex-direction: column; overflow-y: auto;">
          <ag-topbar></ag-topbar> <!-- Topbar should only be inside content side -->

          <div class="page-content" style="padding: 2rem;">
            <h1 class="anim-in">Welcome, Admin ${Auth.currentUser.firstName}!</h1>

            <h3>Quick Links:</h3>
            <sl-button class="anim-in" @click=${() => gotoRoute("/profile")}>View Profile</sl-button>
            <sl-button class="anim-in" @click=${() => gotoRoute("/horses")}>Manage Horses</sl-button>
            <sl-button class="anim-in" @click=${() => gotoRoute("/requests")}>Manage Requests</sl-button>
            <sl-button class="anim-in" @click=${() => gotoRoute("/calendar")}>View Calendar</sl-button>

            <p>&nbsp;</p>
            <h3>Quick Links (Anchor Links):</h3>
            <a href="/profile" @click=${anchorRoute}>View Profile</a>
          </div>
        </div>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new AdminDashboardView();
