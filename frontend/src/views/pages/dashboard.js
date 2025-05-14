import App from "./../../App";

import Utils from "./../../Utils";
import Auth from "./../../Auth";
import Toast from "../../Toast";
import { html, render } from "lit-html";
import { sampleCalendarEvents } from "../../data/sampleCalendarEvents";

class DashboardView {
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

  render() {
    const isAdmin = Auth.currentUser?.accessLevel === 'admin';
  
    const template = html`
      <ag-app-layout>
        <h1>Welcome, ${Auth.currentUser.firstName}!</h1>
  
        <ag-tile-grid .center=${true}>
          ${isAdmin
            ? html`  
                <ag-tile-button
                  label="Manage Horses"
                  iconImage="/images/icons/horse-solid.svg"
                  route="/horses"
                ></ag-tile-button>
  
                <ag-tile-button
                  label="Service Requests"
                  iconImage="/images/icons/bell-solid.svg"
                  route="/viewRequests"
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
              `
            : html`
                <ag-tile-button
                  label="My Horses"
                  iconImage="/images/icons/horse-solid.svg"
                  route="/horses"
                ></ag-tile-button>
  
                <ag-tile-button
                  label="Request Services"
                  iconImage="/images/icons/bell-solid.svg"
                  route="/serviceRequests"
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
              `}
        </ag-tile-grid>
  
        <ag-calendar-preview .events=${sampleCalendarEvents}></ag-calendar-preview>
      </ag-app-layout>
    `;
  
    render(template, App.rootEl);
  }
  
}

export default new DashboardView();
