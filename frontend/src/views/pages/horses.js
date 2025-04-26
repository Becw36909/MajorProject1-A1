import App from "./../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "./../../Router";
import Auth from "./../../Auth";
import Utils from "./../../Utils";
import HorseAPI from "../../HorseAPI";
import Toast from "../../Toast";

class HorsesView {
  init() {
    console.log("HorseView.init");
    document.title = "Horses";
    this.horses = null;
    this.render();
    Utils.pageIntroAnim();
    this.getHorses();
  }

  async getHorses() {
    try {
      this.horses = await HorseAPI.getHorses();
      console.log(this.horses);
      this.render()
    } catch (err) {
      Toast.show(err, "error");
    }
  }

  render() {
    const template = html`
      <div class="page-content">
        <h1 class="anim-in">this is the Horses view</h1>

        <h3>Button example:</h3>
        <sl-button class="anim-in" @click=${() => gotoRoute("/")}
          >back to home</sl-button
        >

        ${this.horses == 0
          ? html` <h1 class="anim-in">NO HORSES - ONLY SHOW ADD HORSE BUTTON</h1>
          <sl-button size="large"> 
           <p>ADD HORSE BUTTON</p> </sl-button> `
          : html`
              <h1 class="anim-in">
                HERE ARE THE HORSES... LOOP ALL HORSES AS BUTTONS PLUS ADD HORSE BUTTON
              </h1>
            `}
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new HorsesView();
