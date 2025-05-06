import App from "./../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "./../../Router";
import Auth from "./../../Auth";
import Utils from "./../../Utils";
import moment from "moment";
import Toast from "../../Toast";

class ProfileView {
  init() {
    const toastMessage = localStorage.getItem("toastMessage");
    if (toastMessage) {
      Toast.show(toastMessage);
      localStorage.removeItem("toastMessage");
    }
    console.log("ProfileView.init");
    document.title = "My Profile | AgistEase";
    this.render();
    Utils.pageIntroAnim();
  }

  render() {
    const user = Auth.currentUser;
    const template = html`
      <ag-app-layout>
        <div class="profile-container">
          <!-- Left Column: User Info -->
          <div class="profile-column profile-info">
            <h2>My Profile</h2>
            <p>
              <strong>Name:</strong><br />${user.firstName} ${user.lastName}
            </p>
            <p><strong>Email:</strong><br />${user.email}</p>
            <p><strong>Phone Number:</strong><br />${user.phone}</p>
            <sl-button @click=${() => gotoRoute("/editProfile")}
              >Update Profile</sl-button
            >
          </div>

          <!-- Middle Column: Notes + Avatar -->
          <div class="profile-column profile-notes">
            <p><strong>Notes:</strong></p>
            <p>${user.bio || "No bio available."}</p>
            <sl-avatar
              style="--size: 180px; margin-top: 1.5rem;"
              image="${user.profileImage
                ? `${App.apiBase}/images/${user.profileImage}`
                : ""}"
            >
            </sl-avatar>
          </div>

          <!-- Right Column: My Horses -->
          <div class="profile-column profile-horses">
            <p><strong>My Horses:</strong></p>

            ${user.horses && user.horses.length > 0
              ? html`
                  ${user.horses.map(
                    (horse) => html`
                      <button class="horse-button">
                        <img
                          class="horse-icon"
                          src="${App.apiBase}/images/${horse.image}"
                          alt="${horse.name}"
                        />
                        ${horse.name}
                      </button>
                    `
                  )}
                `
              : html`<p>No horses yet.</p>`}

            <button
              class="horse-button add-horse"
              @click=${() => gotoRoute("/addHorse")}
            >
              <sl-icon name="plus-circle" label="Add Horse"></sl-icon> Add Horse
            </button>
          </div>
        </div>
      </ag-app-layout>
    `;
    render(template, App.rootEl);
  }
}

export default new ProfileView();
