import App from "./../../App";
import { html, render } from "lit-html";
import { gotoRoute } from "./../../Router";
import Auth from "./../../Auth";
import Utils from "./../../Utils";
import Toast from "../../Toast";
import ServiceRequestAPI from "./../../ServiceRequestsAPI";

class ServiceRequestsView {
  constructor() {
    this.horses = [];
  }

  async init() {
    console.log("ServiceRequestsView.init");
    document.title = "Request Services";

    try {
      const res = await fetch(`${App.apiBase}/horse`);
      const horses = await res.json();
      this.horses = horses.filter((h) => h.ownerID === Auth.currentUser._id);
    } catch (err) {
      console.error("Failed to load horses", err);
      Toast.show("Could not load horses", "error");
    }

    this.render();
    Utils.pageIntroAnim();
  }

  async submitHandler(e) {
    e.preventDefault();
    const form = e.target;

    const requestData = {
      horseID: form.horseID.value,
      serviceType: form.serviceType.value,
      notes: form.notes.value,
    };

    if (!requestData.horseID || !requestData.serviceType) {
      Toast.show("Please fill in all required fields", "error");
      return;
    }

    try {
      const res = await ServiceRequestAPI.createServiceRequest(requestData);

      Toast.show("Service request submitted");
      gotoRoute("/dashboard");
    } catch (err) {
      console.error("Submit error:", err);
      Toast.show(err.message || "Something went wrong", "error");
    }
  }

  render() {
    const horses = this.horses;

    const template = html`
      <ag-app-layout>
        <h1>Request a Service</h1>

        <form
          class="three-col-container form-content app-form-style two-column-layout"
          @submit=${this.submitHandler}
        >
          <!-- Column 1: Info Box -->
          <div class="three-col-column">
            <div class="service-info-box">
              <h3>Base Services Included</h3>
              <ul>
                <li>Private paddock</li>
                <li>Hard feeds per day (1x am/pm)</li>
                <li>Grass hay per day (2x am/pm)</li>
                <li>Stable at night/Stable cleaning</li>
                <li>Paddock cleaning</li>
              </ul>
            </div>
          </div>

          <!-- Column 2: Full Form -->
          <div class="three-col-column">
            <label for="horseID">Select Horse:</label>
            <select name="horseID" id="horseID" required>
              <option value="">-- Select Horse --</option>
              ${horses.map(
                (horse) =>
                  html`<option value="${horse._id}">${horse.name}</option>`
              )}
            </select>

            <label for="serviceType">Service Type:</label>
            <select name="serviceType" id="serviceType" required>
              <option value="">-- Select --</option>
              <option value="Extra Hay">Extra Hay</option>
              <option value="Rug Change">Rug Change</option>
              <option value="Holding for Vet">Holding for Vet</option>
              <option value="Exercise/Training">Exercise/Training</option>
              <option value="Lesson">Lesson</option>
              <option value="Other">Other</option>
            </select>

            <label for="notes">Notes:</label>
            <textarea
              name="notes"
              id="notes"
              rows="5"
              placeholder="Include preferred dates, time, or additional instructions..."
            ></textarea>

            <!-- Desktop Submit -->
            <div
              class="form-submit-container desktop-only request-submit-container"
            >
              <button type="submit" class="custom-button">
                Submit Request
              </button>
            </div>
          </div>

          <!-- Hide third column completely -->
          <div class="three-col-column hide-column"></div>

          <!-- Mobile Submit -->
          <div class="form-submit-container mobile-only">
            <button type="submit" class="custom-button">Submit Request</button>
          </div>
        </form>
      </ag-app-layout>
    `;

    render(template, App.rootEl);
  }
}

export default new ServiceRequestsView();
