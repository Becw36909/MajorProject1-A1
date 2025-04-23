import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from './../../UserAPI'
import Toast from '../../Toast'
import moment from 'moment'

class EditProfileView {
  init(){
    console.log('EditProfileView.init')
    document.title = 'Edit Profile'    
    this.user = null
    this.render()    
    Utils.pageIntroAnim()
    this.getUser()    
  }

  async getUser(){
    try {
      this.user = await UserAPI.getUser(Auth.currentUser._id)      
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  async updateProfileSubmitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();

    formData.append("firstName", form.firstName.value);
    formData.append("lastName", form.lastName.value);
    formData.append("email", form.email.value);

    if (form.avatar.files.length > 0) {
      formData.append("avatar", form.avatar.files[0]);
    }

    let result = await UserAPI.updateUser(App.state.user._id, formData);
    if (result.error) {
      Toast.show(result.message, "danger");
    } else {
      Toast.show("Profile updated", "success");
      window.location.href = "/profile";
    }
  }

  render(){
    const template = html`
<div class="page-content">
        <h2>Edit Profile</h2>
        <form id="edit-profile-form" class="page-form">
          <div class="input-group">
            <label for="firstName">First Name</label>
            <input type="text" name="firstName" id="firstName" value="${this.user.firstName}" required />
          </div>
          <div class="input-group">
            <label for="lastName">Last Name</label>
            <input type="text" name="lastName" id="lastName" value="${this.user.lastName}" required />
          </div>
          <div class="input-group">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" value="${this.user.email}" required />
          </div>
          <div class="input-group">
            <label>Avatar</label><br>
            ${this.user.profileImage ? html`<img src="${App.apiBase}/images/${this.user.profileImage}" width="60" />` : html``}
            <input type="file" name="avatar" />
          </div>
          <button type="submit" class="submit-btn">Update Profile</button>
        </form>
      </div>
    `;
    render(template, App.rootEl)
    document.querySelector("#edit-profile-form").addEventListener("submit", this.updateProfileSubmitHandler.bind(this));

  }
}

export default new EditProfileView()