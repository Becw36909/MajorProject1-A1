import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import BaseSplitView from "../layouts/BaseSplitView";


class CalendarView {
  init(){    
    console.log('calendarView.init')
    document.title = 'Calendar'    
    this.render()    
    Utils.pageIntroAnim()   
  }

  render(){
    const template = html`
      
      <div class="page-content">
        <h1 class="anim-in">this is the calendar view</h1>

        <h3>Button example:</h3>
        <sl-button class="anim-in" @click=${() => gotoRoute('/')}>back to home</sl-button>

      </div>
     
    `
    render(template, App.rootEl)
  }
}

export default new CalendarView()