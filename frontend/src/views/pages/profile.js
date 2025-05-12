import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import moment from 'moment'
import Toast from "../../Toast";
import HorseAPI from './../../HorseAPI';
import Router from './../../Router' 



class ProfileView {

  constructor() {
    this.horses = [];
  }


  async init(){
    const toastMessage = localStorage.getItem('toastMessage');
    if (toastMessage) {
      Toast.show(toastMessage);
      localStorage.removeItem('toastMessage');
    }
    console.log('ProfileView.init')
    document.title = 'My Profile | AgistEase';

    try {
      const horses = await HorseAPI.getHorses()
      const userId = Auth.currentUser._id
      this.horses = horses.filter(horse => horse.ownerID === userId)
    } catch (err) {
      console.error(err)
      Toast.show('Failed to load horses', 'error')
    }

    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const user = Auth.currentUser;
    const template = html`
   <ag-app-layout>
               <h1>My Profile</h1>

        <div class="three-col-container">
          <!-- Left Column: User Info -->
          <div class="three-col-column profile-info">
            <p><strong class="emphasis">Name:</strong><br />${user.firstName} ${user.lastName}</p>
            <p><strong class="emphasis">Email:</strong><br />${user.email}</p>
            <p><strong class="emphasis">Phone Number:</strong><br />${user.phoneNumber}</p>
<button class="custom-button" @click=${() => gotoRoute("/editProfile")}>
  Update Profile
</button>

          </div>

          <!-- Middle Column: Notes + Avatar -->
          <div class="three-col-column profile-notes">
            <p><strong class="emphasis">Notes:</strong></p>
            <p>${user.bio || 'No bio available.'}</p>
            <sl-avatar
              style="--size: 180px; margin-top: 1.5rem;"
              image="${user.profileImage
                ? `${App.apiBase}/images/${user.profileImage}`
                : ''}"
            ></sl-avatar>
          </div>

           <!-- Right Column -->
          <div class="three-col-column profile-horses">
            <p><strong class="emphasis">My Horses:</strong></p>

   ${this.horses.length > 0
              ? html`
                  ${this.horses.map(
                  
                    (horse) => html`
                      <button class="horse-button" @click=${() => gotoRoute(Router.getHorseRoute(horse._id))}>
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

            <button class="horse-button add-horse" @click=${() => gotoRoute('/addHorse')}>
              <sl-icon name="plus-circle" label="Add Horse"></sl-icon> Add Horse
            </button>
          </div>
        </div>
      </ag-app-layout>
    `
    render(template, App.rootEl)
  }
}


export default new ProfileView()