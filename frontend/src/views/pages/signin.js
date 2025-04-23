import App from './../../App'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import Toast from '../../Toast';


class SignInView {
  init(){
    console.log('SignInView.init')
    document.title = 'Sign In'
    this.render()
    Utils.pageIntroAnim()
  }

  async signInSubmitHandler(e) {
    e.preventDefault();
  
    const emailEl = document.querySelector("sl-input#email");
    const passwordEl = document.querySelector("sl-input#password");
  
    const email = emailEl?.value;
    const password = passwordEl?.value;
  
    const credentials = { email, password };
  
    try {
      const result = await Auth.signIn(credentials);
  
      if (result?.error) {
        Toast.show(result.message || "Invalid credentials", "danger");
      }
      // no need for success toast — Auth.js already does that
    } catch (err) {
      console.error("Sign in failed:", err);
      Toast.show("Sign in failed. Please try again.", "danger");
    }
  }
  
  


  render(){    
    const template = html`      
    <div class="page-content page-centered">
      <div class="signinup-box">
        <img class="signinup-logo" src="/images/logo.svg" />
        <form class="form-signin dark-theme" id="signin-form">
          <sl-input name="email" id="email" label="Email" type="email" required></sl-input>
          <sl-input name="password" id="password" label="Password" type="password" required></sl-input>
          <sl-button type="submit" variant="primary">Sign In</sl-button>
        </form>
        <p>Don’t have an account? <a href="/signup" @click=${anchorRoute}>Sign Up</a></p>
      </div>
    </div>
    `;
    render(template, App.rootEl)    
    document.querySelector("#signin-form").addEventListener("submit", this.signInSubmitHandler);

  }
}

export default new SignInView()