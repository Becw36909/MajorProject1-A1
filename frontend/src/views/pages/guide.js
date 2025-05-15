import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from '../../UserAPI'
import Toast from '../../Toast'

class GuideView {
  init(){
    document.title = 'Guide Page'    
    this.render()    
    Utils.pageIntroAnim()
    this.updateCurrentUser();
  }

  async updateCurrentUser(){

    try{

        const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, {newUser: false}, 'json')
    }
    catch(err){
        Toast.show(err, 'error')

    }

  }

  render() {
    const template = html`
        <h1 style="margin-bottom: 0;">Welcome to AgistEase</h1>
        <p style="margin-top: 0;">Let’s have a quick rundown of how it works, and what we do!</p>
  
        <div class="carousel-full-wrapper">

        <sl-carousel class="guide-carousel" navigation loop>
          <!-- Slide 1: Dashboard Overview -->
          <sl-carousel-item>
            <div class="guide-slide">
              <div class="guide-text">
                <h2>🐴 Welcome to Your Dashboard</h2>
                <p>Here’s where you’ll manage everything day to day — from requesting services to updating your horse’s details.</p>
                <p>Use the sidebar to navigate between your horses, profile, calendar and more. You’re all set to make agisting simpler and more organised!</p>
              </div>
              <div class="guide-image">
                <img src="/images/guideImages/dashboard-preview.png" alt="Dashboard Preview" />
              </div>
            </div>
          </sl-carousel-item>
  
          <!-- Add additional slides here if needed -->
  
        </sl-carousel>
        </div>

  
        <div style="text-align: center; margin-top: 2rem;">
          <sl-button variant="primary" @click=${() => gotoRoute('/dashboard')}>Get Started</sl-button>
        </div>
    `;
  
    render(template, App.rootEl);
  }
  
}


export default new GuideView()