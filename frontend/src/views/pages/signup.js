import App from "./../../App";
import Auth from "./../../Auth";
import { html, render } from "lit-html";
import { anchorRoute, gotoRoute } from "./../../Router";
import Utils from "./../../Utils";
import Toast from "../../Toast";

class SignUpView {
  init() {
    console.log("SignUpView.init");
    document.title = "Sign Up";
    this.render();
    Utils.pageIntroAnim();
  }

  async signUpSubmitHandler(e) {
    e.preventDefault();

    const firstName = document.querySelector("#firstName")?.value.trim();
    const lastName = document.querySelector("#lastName")?.value.trim();
    const email = document.querySelector("#email")?.value.trim();
    const password = document.querySelector("#password")?.value;
    const accessLevel = document.querySelector(
      "input[name='accessLevel']:checked"
    )?.value;

    // Basic validations
    if (!firstName) return Toast.show("Please enter your first name", "danger");
    if (!lastName) return Toast.show("Please enter your last name", "danger");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email))
      return Toast.show("Please enter a valid email address", "danger");

    if (!password || password.length < 6)
      return Toast.show("Password must be at least 6 characters", "danger");

    if (!accessLevel)
      return Toast.show("Please select an access level", "danger");

    const data = {
      firstName,
      lastName,
      email,
      password,
      accessLevel,
    };

    try {
      // Auth.signUp handles success toasts and navigation
      await Auth.signUp(data);
    } catch (err) {
      Toast.show("Something went wrong during sign up", "danger");
      console.error("Sign up failed:", err);
    }
  }

  render() {
    const template = html`
      <div class="signin-page">
        <div class="signin-box">
          <img
            src="/images/agistease-logo.svg"
            alt="AgistEase Logo"
            class="signin-logo"
          />

          <form class="form-signin" id="signup-form">
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" required />

            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" required />

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required />

            <fieldset>
              <legend>I am a:</legend>
              <label>
                <input type="radio" name="accessLevel" value="user" required />
                Horse Owner
              </label>
              <label>
                <input type="radio" name="accessLevel" value="admin" required />
                Stable Manager
              </label>
            </fieldset>

            <button type="submit" class="btn-primary">Sign Up</button>
          </form>

          <p class="signup-cta">
            Already registered?
            <a href="/signin" @click=${anchorRoute}>Sign in</a>
          </p>
        </div>
      </div>
    `;
    render(template, App.rootEl);
    document
      .querySelector("#signup-form")
      .addEventListener("submit", this.signUpSubmitHandler);
  }
}

export default new SignUpView();
