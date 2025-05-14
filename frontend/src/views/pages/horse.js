import App from "./../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "./../../Router";
import Auth from "./../../Auth";
import Utils from "./../../Utils";
import moment from "moment";
import Toast from "../../Toast";
import ServiceRequestAPI from "./../../ServiceRequestsAPI";
import HorseAPI from "./../../HorseAPI";

class HorseView {
  constructor() {
    this.horse = null;
    this.serviceRequests = [];
    this.deleteHorse = this.deleteHorse.bind(this); // ensure correct `this` binding
  }

  async init() {
    console.log("HorseView.init called");

    document.title = "View Horse | AgistEase";

    const horseId = window.location.pathname.split("/").pop(); // crude but effective
    this.horseId = horseId;

    try {
      this.horse = await HorseAPI.getHorse(horseId);
      this.serviceRequests = await ServiceRequestAPI.getServiceRequestsByHorse(
        horseId
      );
    } catch (err) {
      console.error(err);
      Toast.show("Failed to load horse or services", "error");
    }

    this.render();
    Utils.pageIntroAnim();
  }

  async deleteHorse() {
    try {
      await fetch(`${App.apiBase}/horse/${this.horseId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.accessToken}` },
      });

      await fetch(`${App.apiBase}/serviceRequests/horse/${this.horseId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.accessToken}` },
      });

      Toast.show("Horse deleted successfully");
      gotoRoute("/horses");
    } catch (err) {
      console.error(err);
      Toast.show("Error deleting horse or services", "error");
    }
  }

  render() {
    const horse = this.horse;
    const services = this.serviceRequests;

    const template = html`
      <ag-app-layout>
        <h1>${horse.name}</h1>

        <div class="three-col-container">
          <!-- Column 1: Basic info -->
          <div class="three-col-column horse-info">
            <p><strong class="emphasis">Breed:</strong><br />${
              horse.breed || "—"
            }</p>
            <p><strong class="emphasis">Age:</strong><br />${
              horse.age || "—"
            }</p>
            <p><strong class="emphasis">Height:</strong><br />${
              horse.height || "—"
            }</p>
            <p><strong class="emphasis">Sex:</strong><br />${
              horse.sex || "—"
            }</p>
            <p><strong class="emphasis">Colour:</strong><br />${
              horse.colour || "—"
            }</p>
          </div>

          <!-- Column 2: Notes + Additional Services -->
          <div class="three-col-column horse-notes">
                      <p><strong class="emphasis">Microchip #:</strong><br />${
                        horse.microchipNumber || "—"
                      }</p>

            <p><strong class="emphasis">Notes:</strong>
            <br />${horse.notes || "No notes available."}</p>

                        <p><strong class="emphasis">Additional Services:</strong><br />
            ${
              services.length > 0
                ? html`${services.map(
                    (service) => html`
                <div class="service-request" ><sl-card class="card-basic">
                  <strong>${service.serviceType}</strong><br />
                  ${service.notes || "No notes provided"}</p>
                  <small>${moment(service.date).format("DD MMM YYYY")}</small>
                  </sl-card>

                </div>
              `
                  )}`
                : html`<p>No additional services found.</p>`
            }

          </div>

          <!-- Column 3: Image -->
          <div class="three-col-column horse-services">
          <p class="horse-avatar">
          <sl-avatar
              style="--size: 300px;"
              image="${
                horse.image ? `${App.apiBase}/images/${horse.image}` : ""
              }"
            ></sl-avatar> </p>
                      <p>
                      <sl-tooltip content="Delete this Horse">
                        <sl-icon-button name="trash" style="font-size: 2rem; label="Delete Horse" @click=${() =>
                          document
                            .getElementById("delete-horse-modal")
                            .show()}></sl-icon-button>
                            </sl-tooltip></p>
                            </div>
                            </div>

                <!-- Delete Confirmation Modal -->
        <sl-dialog id="delete-horse-modal" label="Confirm Delete" class="dialog-overview">
          <p>Are you sure you want to delete this horse and all associated service requests?</p>
          <sl-button slot="footer" variant="primary" @click=${() =>
            this.deleteHorse()}>Yes, delete</sl-button>
          <sl-button slot="footer" variant="neutral" @click=${() =>
            document
              .getElementById("delete-horse-modal")
              .hide()}>Cancel</sl-button>
        </sl-dialog>
      </ag-app-layout>

    `;
    render(template, App.rootEl);
  }
}

export default new HorseView();
