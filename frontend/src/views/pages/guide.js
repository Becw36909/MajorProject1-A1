import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from '../../UserAPI'
import Toast from '../../Toast'

class GuideView {

  constructor() {
    this.isMobile = window.innerWidth <= 768;
    this.slides = [
      {
        title: "🐴 Welcome to Your Dashboard",
        paragraphs: [
          "Here’s where you’ll manage everything day to day — from requesting services to updating your horse’s details.",
          "Use the sidebar to navigate between your horses, profile, calendar and more. You’re all set to make agisting simpler and more organised!"
        ],
        image: "/images/guideImages/dashboard-preview.png",
        alt: "Dashboard Preview"
      },
      {
        title: "👤 Keep Your Details Up to Date",
        paragraphs: [
          "Your profile is where we keep your contact info and preferences — so make sure it's always current.",
          "Add a profile photo, update your number or email, and let us know the best way to reach you."
        ],
        image: "/images/guideImages/profile-view.png",
        alt: "Profile Preview"
      },
      {
        title: "🗓️ Stay Organised with the Calendar",
        paragraphs: [
          "Check upcoming lessons, services, or events scheduled for your horse at a glance.",
          "The calendar keeps you in the loop so you never miss a booking or appointment."
        ],
        image: "/images/guideImages/calendar-view.png",
        alt: "Calendar Preview"
      },
      {
        title: "🐴 Add Your Horse in Seconds",
        paragraphs: [
          "Use the Add Horse form to enter your horse’s details like breed, height, and microchip number.",
          "You can even upload a photo to personalise their profile — it only takes a moment!"
        ],
        image: "/images/guideImages/add-horse-view.png",
        alt: "Add Horse Preview"
      },
      {
        title: "✍️ Need Something Extra? Request Services Easily",
        paragraphs: [
          "Select your horse, choose the extra service you need, and add a note if you'd like.",
          "Whether it’s a training session or extra feed, submitting a request is quick and simple."
        ],
        image: "/images/guideImages/request-service-view.png",
        alt: "Request Services Preview"
      },
      {
        title: "🐎 See All Your Horses at a Glance",
        paragraphs: [
          "Tap a horse to view their details, notes, and any additional services they’ve received.",
          "Manage everything from microchip numbers to service history, all in one place."
        ],
        image: "/images/guideImages/horses-view.png",
        alt: "Horses Preview"
      },


      // Add more slides here if needed
    ];
    this.handleResize = this.handleResize.bind(this);
  }


  init(){
    document.title = 'Guide Page'    
    this.render()    
    Utils.pageIntroAnim()
    this.updateCurrentUser();
    window.addEventListener('resize', this.handleResize);
    
  }

  async updateCurrentUser(){

    try{

        const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, {newUser: false}, 'json')
    }
    catch(err){
        Toast.show(err, 'error')

    }

  }

  handleResize() {
    const isNowMobile = window.innerWidth <= 768;
    if (isNowMobile !== this.isMobile) {
      this.isMobile = isNowMobile;
      this.render(); // re-render when crossing the breakpoint
    }
  }


    render() {
    const renderSlide = (slide) => html`
      <div class="guide-slide">
        <div class="guide-text">
          <h2>${slide.title}</h2>
          ${slide.paragraphs.map(p => html`<p>${p}</p>`)}
        </div>
        <div class="guide-image">
          <img src="${slide.image}" alt="${slide.alt}" />
        </div>
      </div>
    `;

    const template = html`
      <div class="guide-page-scroll-container">
        <div class="guide-page-wrapper">
          <div class="guide-logo-container">
    <img src="/images/agistease-logo.svg" alt="AgistEase Logo" class="guide-logo" />
  </div>
  
  <h1 class="guide-heading">Welcome to AgistEase - let’s have a quick rundown of how it works, and what we do!</h1>
          <div class="carousel-full-wrapper">
            ${this.isMobile
              ? html`${this.slides.map(renderSlide)}`
              : html`
                  <sl-carousel class="guide-carousel" navigation loop pagination>
                    ${this.slides.map(slide => html`
                      <sl-carousel-item>
                        ${renderSlide(slide)}
                      </sl-carousel-item>
                    `)}
                  </sl-carousel>
                `}
          </div>

          <div style="text-align: center; margin-top: 2rem;">
            <button class="custom-button" @click=${() => gotoRoute("/dashboard")}>
  Get Started
</button>
          </div>
        </div>
      </div>
    `;

    render(template, App.rootEl);
  }
  
  
}


export default new GuideView()