import App from "./../../App";
import { html, render } from "lit-html";
import { anchorRoute, gotoRoute } from "./../../Router";
import Auth from "./../../Auth";
import Utils from "./../../Utils";
import Toast from "../../Toast";

class SignInView {
  init() {
    console.log("SignInView.init");
    document.title = "Sign In";
    this.render();
    Utils.pageIntroAnim();
  }

  async signInSubmitHandler(e) {
    e.preventDefault();

    const email = document.querySelector("#email")?.value.trim();
    const password = document.querySelector("#password")?.value.trim();

    // Client-side validation
    if (!email || !password) {
      Toast.show("Please enter both email and password", "error");
      return;
    }

    // Optional: basic email pattern check
    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailPattern.test(email)) {
      Toast.show("Please enter a valid email address", "error");
      return;
    }

    try {
      await Auth.signIn({ email, password });
    } catch (err) {
      Toast.show("Unexpected error, please try again", "error");
      console.error(err);
    }
  }

  render() {
    const template = html`
      <div class="page-content page-centered">
        <div class="signinup-box">
          <img class="signinup-logo" src="/images/agistease-logo.svg" />
          <form class="form-signin dark-theme" id="signin-form">
            <sl-input
              name="email"
              id="email"
              label="Email"
              type="email"
              required
            ></sl-input>
            <sl-input
              name="password"
              id="password"
              label="Password"
              type="password"
              required
            ></sl-input>
            <sl-button type="submit" variant="primary">Sign In</sl-button>
          </form>
          <p>
            Don’t have an account?
            <a href="/signup" @click=${anchorRoute}>Sign Up</a>
          </p>
        </div>
      </div>
    `;
    render(template, App.rootEl);
    document
      .querySelector("#signin-form")
      .addEventListener("submit", this.signInSubmitHandler);
  }
}

export default new SignInView();
