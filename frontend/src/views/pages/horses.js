import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class HorsesView {
  init(){    
    console.log('HorseView.init')
    document.title = 'Horses'    
    this.render()    
    Utils.pageIntroAnim()   // is this necessary??  
  }

  render(){
    const template = html`
      
      <div class="page-content">
        <h1 class="anim-in">this is the Horses view</h1>

        <h3>Button example:</h3>
        <sl-button class="anim-in" @click=${() => gotoRoute('/')}>back to home</sl-button>

      </div>
     
    `
    render(template, App.rootEl)
  }
}

export default new HorsesView()