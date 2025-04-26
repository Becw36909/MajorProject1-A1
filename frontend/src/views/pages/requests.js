import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class RequestsView {
  init(){    
    console.log('requestsView.init')
    document.title = 'Request Services'    
    this.render()    
    Utils.pageIntroAnim()   // is this necessary??  
  }

  render(){
    const template = html`
      
      <div class="page-content">
        <h1 class="anim-in">this is the request services view</h1>

        <h3>Button example:</h3>
        <sl-button class="anim-in" @click=${() => gotoRoute('/')}>back to home</sl-button>

      </div>
     
    `
    render(template, App.rootEl)
  }
}

export default new RequestsView()