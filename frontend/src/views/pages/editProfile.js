import App from "./../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "./../../Router";
import Auth from "./../../Auth";
import Utils from "./../../Utils";
import UserAPI from "./../../UserAPI";
import Toast from "../../Toast";
import moment from "moment";

class EditProfileView {
  init() {
    console.log("EditProfileView.init");
    document.title = "Edit Profile";
    this.user = null;
    this.render();
    Utils.pageIntroAnim();
    this.getUser();
  }

  async getUser() {
    try {
      this.user = await UserAPI.getUser(Auth.currentUser._id);
      this.render();
    } catch (err) {
      Toast.show(err, "error");
    }
  }

  async updateProfileSubmitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();

    formData.append("firstName", form.firstName.value);
    formData.append("lastName", form.lastName.value);
    formData.append("email", form.email.value);
    formData.append("phoneNumber", form.phoneNumber.value);
    formData.append("bio", form.bio.value);

    if (form.profileImage.files.length > 0) {
      formData.append("profileImage", form.profileImage.files[0]);
    }

    let result = await UserAPI.updateUser(Auth.currentUser._id, formData);

    if (result.error) {
      Toast.show(result.message, "danger");
    } else {
      localStorage.setItem("toastMessage", "Profile updated");
      window.location.href = "/profile";
    }
  }

  render() {
    // guard clause while user data is being fetched
    if (!this.user) {
      render(html`<p>Loading...</p>`, App.rootEl);
      return;
    }

    const template = html`
 <ag-app-layout>
        <h1>Update Profile</h1>
<form id="edit-profile-form" class="three-col-container form-content app-form-style">
          <!-- Column 1 -->
          <div class="three-col-column">
            <label for="firstName">First Name:</label>
            <input type="text" name="firstName" id="firstName" .value=${this.user.firstName} />

            <label for="lastName">Last Name:</label>
            <input type="text" name="lastName" id="lastName" .value=${this.user.lastName} />

            <label for="email">Email:</label>
            <input type="email" name="email" id="email" .value=${this.user.email} />

            <label for="phoneNumber">Phone Number:</label>
            <input type="tel" name="phoneNumber" id="phoneNumber" .value=${this.user.phoneNumber} />
          </div>

          <!-- Column 2 -->
          <div class="three-col-column">
            <label for="profileImage">Photo Upload:</label>
            <input type="file" name="profileImage" id="profileImage" />

            <label for="bio">Notes:</label>
            <textarea name="bio" id="bio" rows="4">${this.user.bio || ""}</textarea>

            <button type="submit" class="custom-button">Update Profile</button>
          </div>

          <!-- Column 3 -->
<div class="three-col-column avatar-column">
            <sl-avatar
              style="--size: 250px; margin-top: 2rem;"
              image="${this.user.profileImage ? `${App.apiBase}/images/${this.user.profileImage}` : ""}"
            ></sl-avatar>
          </div>
        </form>
      </ag-app-layout>

    `;
    render(template, App.rootEl);
    document
      .querySelector("#edit-profile-form")
      .addEventListener("submit", this.updateProfileSubmitHandler.bind(this));
  }
}

export default new EditProfileView();
