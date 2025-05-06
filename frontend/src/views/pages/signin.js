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

    if (!email || !password) {
      Toast.show("Please enter both email and password", "error");
      return;
    }

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
      <div class="page-content page-centered signin-page">
        <div class="signin-box">
          <img src="/images/agistease-logo.svg" alt="AgistEase Logo" class="signin-logo" />
          
          <form class="form-signin" id="signin-form">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required />
            
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required />
            
            <button type="submit" class="btn-primary">Sign in</button>
          </form>

          <p class="signup-cta">
            Need an account? Sign up <a href="/signup" @click=${anchorRoute}>HERE</a>
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
