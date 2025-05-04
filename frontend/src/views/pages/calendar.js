import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import BaseSplitView from "../layouts/BaseSplitView";


class CalendarView extends BaseSplitView {
   constructor() {
     super();
   }
 
   init() {
     document.title = "Calendar | AgistEase";
     this.render();
     Utils.pageIntroAnim();
   }
 
   renderContent() {
    return html`
      <h1>My Calendar</h1>
      <ag-calendar-full></ag-calendar-full>
    `;
  }
  
 }
 

export default new CalendarView()