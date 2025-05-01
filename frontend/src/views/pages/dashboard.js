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
      <h1>Welcome, ${Auth.currentUser.firstName}</h1>
      <p>This will be your Dashboard page content.</p>
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
