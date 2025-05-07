import App from './../../App'
import Utils from "./../../Utils";
import Auth from "./../../Auth";
import {html, render } from 'lit-html'

class AddHorseView  {

  init() {
    document.title = "Add Horse | AgistEase";
    this.render();
    Utils.pageIntroAnim();
  }

  render() {
    const template = html`
          <ag-app-layout>
      <h1>ADD HORSE!</h1>

      <ag-tile-grid>
        <ag-tile-button
          label="Example Tile"
          iconImage="/images/icons/horse-solid.svg"
          route="/example"
        ></ag-tile-button>
        <ag-tile-button
          label="Another Action"
          iconImage="/images/icons/bell-solid.svg"
          route="/another"
        ></ag-tile-button>
      </ag-tile-grid>

      <div class="template-preview">
        <h2>Placeholder Section</h2>
        <p>This area can be used to prototype further sections or embed test content.</p>
      </div>
                  </ag-app-layout>

    `;
        render(template, App.rootEl);
    
  }
}

export default new AddHorseView();
