import App from './../../App'
import {html, render } from 'lit-html'
import Utils from './../../Utils'


class CalendarView  {

 
   init() {
    document.title = "Calendar | AgistEase";
     this.render();
     Utils.pageIntroAnim();
   }
 
   render() {
    const template = html`
          <ag-app-layout>
      <h1>My Calendar</h1>
      <ag-calendar-full></ag-calendar-full>
                  </ag-app-layout>

    `;
        render(template, App.rootEl);
    
  }
  
 }
 

export default new CalendarView()