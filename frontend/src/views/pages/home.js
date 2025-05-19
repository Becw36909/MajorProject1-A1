import App from "./../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "./../../Router";
import Auth from "./../../Auth";
import Utils from "./../../Utils";

class HomeView {
  init() {
    console.log("HomeView.init");
    document.title = "Home";
    this.render();
    Utils.pageIntroAnim();
  }

  render() {
    const template = html`
      <ag-app-header
        title="Home"
        user=${JSON.stringify(Auth.currentUser)}
      ></ag-app-header>

      <div class="page-content">
        <h1 class="anim-in">Hey ${Auth.currentUser.firstName}</h1>

        <h3>Button example:</h3>
        <sl-button class="anim-in" @click=${() => gotoRoute("/profile")}
          >View Profile</sl-button
        >
        <sl-button class="anim-in" @click=${() => gotoRoute("/horses")}
          >My Horses</sl-button
        >
        <sl-button class="anim-in" @click=${() => gotoRoute("/requests")}
          >Request Services</sl-button
        >
        <sl-button class="anim-in" @click=${() => gotoRoute("/calendar")}
          >Calendar</sl-button
        >

        <sl-button class="anim-in" @click=${() => gotoRoute("/dashboard")}
          >DASHBOARD</sl-button
        >

        <sl-button @click="${() => Auth.signOut()}">Sign Out</sl-button>

        <p>&nbsp;</p>
        <h3>Link example</h3>
        <a href="/profile" @click=${anchorRoute}>View Profile</a>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new HomeView();
