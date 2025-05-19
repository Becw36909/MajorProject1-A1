import App from "./../../App";
import { html, render } from "lit-html";
import { gotoRoute } from "./../../Router";
import Auth from "./../../Auth";
import Utils from "./../../Utils";
import HorseAPI from "../../HorseAPI";
import Toast from "../../Toast";
import Router from "./../../Router";

class HorsesView {
  constructor() {
    this.horses = [];
  }

  async init() {
    console.log("HorsesView.init");
    document.title = "My Horses | AgistEase";

    try {
      const horses = await HorseAPI.getHorses();
      const user = Auth.currentUser;

      if (user.accessLevel === "admin") {
        this.horses = horses;
      } else {
        this.horses = horses.filter((horse) => horse.ownerID === user._id);
      }

      this.render();
      Utils.pageIntroAnim();
    } catch (err) {
      console.error(err);
      Toast.show("Failed to load horses", "error");
    }
  }

  render() {
    const template = html`
      <ag-app-layout>
        <h1>
          ${Auth.currentUser.accessLevel === "admin"
            ? "Manage Horses"
            : "My Horses"}
        </h1>

        <ag-tile-grid .center=${false}>
          ${this.horses.length > 0
            ? this.horses.map(
                (horse) => html`
                  <ag-tile-button
                    label="${horse.name}"
                    image="${horse.image
                      ? `${App.apiBase}/images/${horse.image}`
                      : ""}"
                    route="${Router.getHorseRoute(horse._id)}"
                  ></ag-tile-button>
                `
              )
            : html`<p>No horses found.</p>`}

          <!-- Add Horse tile -->
          <ag-tile-button
            class="add-horse-tile"
            label="Add Horse"
            iconImage="/images/icons/plus-solid.svg"
            route="/addHorse"
          ></ag-tile-button>
        </ag-tile-grid>
      </ag-app-layout>
    `;

    render(template, App.rootEl);
  }
}

export default new HorsesView();
