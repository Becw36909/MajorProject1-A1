import App from "./../../App";
import Auth from "./../../Auth";
import { html, render } from "lit-html";
import { anchorRoute, gotoRoute } from "./../../Router";
import Utils from "./../../Utils";
import Toast from '../../Toast';


class SignUpView {
  init() {
    console.log("SignUpView.init");
    document.title = "Sign In";
    this.render();
    Utils.pageIntroAnim();
  }

  async signUpSubmitHandler(e) {
    e.preventDefault();

    const firstName = document.querySelector("#firstName")?.value;
    const lastName = document.querySelector("#lastName")?.value;
    const email = document.querySelector("#email")?.value;
    const password = document.querySelector("#password")?.value;
    const accessLevel = document.querySelector("sl-radio-group[name='accessLevel']")?.value;

    const data = {
      firstName,
      lastName,
      email,
      password,
      accessLevel
    };

    try {
      await Auth.signUp(data);
      // Auth.signUp already handles toasts and navigation
    } catch (err) {
      Toast.show("Something went wrong during sign up", "danger");
      console.error("Sign up failed:", err);
    }
    
  }
  

  render() {
    const template = html`
       <div class="page-content page-centered">
        <div class="signinup-box">
          <img class="signinup-logo" src="/images/logo.svg">
          <form class="form-signup dark-theme" id="signup-form">
            <sl-input name="firstName" id="firstName" label="First Name" required></sl-input>
            <sl-input name="lastName" id="lastName" label="Last Name" required></sl-input>
            <sl-input name="email" id="email" label="Email" type="email" required></sl-input>
            <sl-input name="password" id="password" label="Password" type="password" required></sl-input>
            <sl-radio-group name="accessLevel" label="Access Level" required>
              <sl-radio value="user">Horse Owner</sl-radio>
              <sl-radio value="admin">Stable Manager</sl-radio>
            </sl-radio-group>
            <sl-button type="submit" variant="primary">Sign Up</sl-button>
          </form>
          <p>Already registered? <a href="/signin" @click=${anchorRoute}>Sign In</a></p>
        </div>
      </div>
    `;
    render(template, App.rootEl);
    document.querySelector("#signup-form").addEventListener("submit", this.signUpSubmitHandler);

  }
}

export default new SignUpView();
