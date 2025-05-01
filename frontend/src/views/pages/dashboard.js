import Utils from "./../../Utils";
import Auth from "./../../Auth";
import Toast from "../../Toast";
import { html } from "lit-html";
import BaseSplitView from "../layouts/BaseSplitView";

class DashboardView extends BaseSplitView {
  constructor() {
    super();
  }

  init() {
    const toastMessage = localStorage.getItem("toastMessage");
    if (toastMessage) {
      Toast.show(toastMessage);
      localStorage.removeItem("toastMessage");
    }

    document.title = "Dashboard | AgistEase";
    this.render();
    Utils.pageIntroAnim();
  }

  renderContent() {
    return html`
      <h1>Welcome, ${Auth.currentUser.firstName}!</h1>
  
      <!-- Tile buttons row -->
      <div class="tile-row">
        <ag-tile-button
          label="My Horses"
          icon="🐴"
          @click=${() => Utils.gotoRoute('/horses')}
        ></ag-tile-button>
  
        <ag-tile-button
          label="Request Services"
          icon="🔔"
          @click=${() => Utils.gotoRoute('/requests')}
        ></ag-tile-button>
  
        <ag-tile-button
          label="My Profile"
          icon="👤"
          @click=${() => Utils.gotoRoute('/profile')}
        ></ag-tile-button>
  
        <ag-tile-button
          label="Calendar"
          icon="📅"
          @click=${() => Utils.gotoRoute('/calendar')}
        ></ag-tile-button>
      </div>
  
      <!-- Placeholder calendar section -->
      <div class="calendar-preview">
        <h2>Upcoming calendar events</h2>
        <table>
          <thead>
            <tr>
              <th>Date:</th>
              <th>Time:</th>
              <th>Horse:</th>
              <th>Service:</th>
              <th>Notes:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10 Apr</td><td>16:30</td><td>Bella</td><td>Training Session</td><td></td>
            </tr>
            <tr>
              <td>12 Apr</td><td>8:30</td><td>Max</td><td>Lesson</td><td></td>
            </tr>
            <tr>
              <td>28 Apr</td><td>9:00</td><td>Bella</td><td>Training Session</td><td>Showjumping over 90cm course</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }
  

  renderMobileContent() {
    return html`
      <h1>Welcome, ${Auth.currentUser.firstName}</h1>
      <p>This is the mobile version of your Dashboard.</p>
    `;
  }
}

export default new DashboardView();
