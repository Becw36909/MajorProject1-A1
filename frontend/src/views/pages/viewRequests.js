import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class viewRequestsView {
  init(){    
    console.log('requestsView.init')
    document.title = 'View All Requests'    
    this.render()    
    Utils.pageIntroAnim()  
  }

  render(){
    const template = html`
      
      <div class="page-content">
        <h1 class="anim-in">this is the view all service requests view</h1>

        <h3>Button example:</h3>
        <sl-button class="anim-in" @click=${() => gotoRoute('/')}>back to home</sl-button>

      </div>
     
    `
    render(template, App.rootEl)
  }
}

export default new viewRequestsView()