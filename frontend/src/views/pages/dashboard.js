import Utils from "./../../Utils";
import Auth from "./../../Auth";
import Toast from "../../Toast";
import { html } from "lit-html";
import BaseSplitView from "../layouts/BaseSplitView";
import { sampleCalendarEvents } from "../../data/sampleCalendarEvents";


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
      <ag-tile-grid>
        <ag-tile-button
          label="My Horses"
          iconImage="/images/icons/horse-solid.svg"
          route="/horses"
        ></ag-tile-button>

        <ag-tile-button
          label="Request Services"
          iconImage="/images/icons/bell-solid.svg"
          route="/requests"
        ></ag-tile-button>

        <ag-tile-button
          label="My Profile"
          iconImage="/images/icons/user-solid.svg"
          route="/profile"
        ></ag-tile-button>

        <ag-tile-button
          label="Calendar"
          iconImage="/images/icons/calendar-days-solid.svg"
          route="/calendar"
        ></ag-tile-button>
      </ag-tile-grid>

      <!-- Placeholder calendar section -->
        <ag-calendar-preview .events=${sampleCalendarEvents}></ag-calendar-preview>

      </div>
    `;
  }


}

export default new DashboardView();
