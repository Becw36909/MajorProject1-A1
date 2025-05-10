import App from './../../App'
import Utils from "./../../Utils";
import Auth from "./../../Auth";
import {html, render } from 'lit-html'
import Toast from "../../Toast";
import { gotoRoute, anchorRoute } from "./../../Router";



class AddHorseView  {

  init() {
    document.title = "Add Horse | AgistEase";
    this.render();
    Utils.pageIntroAnim();
  }

  handleImagePreview(e) {
    const file = e.target.files[0];
    const preview = document.getElementById("image-preview");
    if (file && preview) {
      preview.setAttribute('image', URL.createObjectURL(file));
    }
  }
  

  async addHorseSubmitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();

    if (!form.name.value.trim()) {
      Toast.show("Please enter the horse's name", "error");
      return;
    }

    formData.append("name", form.name.value);
    formData.append("age", form.age.value);
    formData.append("height", form.height.value);
    formData.append("microchipNumber", form.microchipNumber.value);
    formData.append("colour", form.colour.value);
    formData.append("breed", form.breed.value);
    formData.append("notes", form.notes.value);
    formData.append("sex", form.sex.value);
    formData.append("ownerID", Auth.currentUser._id);



    if (form.image.files.length > 0) {
      formData.append("image", form.image.files[0]);
    }

    try {
      const res = await fetch(`${App.apiBase}/horse`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let errMessage = "Error adding horse";
        try {
          const err = await res.json();
          errMessage = err.message || errMessage;
        } catch (jsonErr) {
          console.warn("Non-JSON error response", jsonErr);
        }
        Toast.show(errMessage, "error");
        return;
      }

      Toast.show("Horse added successfully");
      gotoRoute("/horses");
    } catch (err) {
      Toast.show("Something went wrong", "error");
      console.error("Horse submit error:", err);
    }
  }

  render() {
    const template = html`
      <ag-app-layout>
        <h1>Add New Horse</h1>
        <form
          id="add-horse-form"
          class="three-col-container form-content app-form-style"
          
        >
          <!-- Column 1 -->
          <div class="three-col-column">
            <label for="name">Horse Name:</label>
            <input type="text" name="name" id="name" required />

            <label for="age">DOB:</label>
            <input type="text" name="age" id="age" placeholder="DD/MM/YYYY" />

            <label for="height">Height:</label>
            <input type="text" name="height" id="height" />

            <label for="colour">Colour/Markings:</label>
            <input type="text" name="colour" id="colour" />

            <label for="breed">Breed:</label>
            <input type="text" name="breed" id="breed" />
          </div>

          <!-- Column 2 -->
          <div class="three-col-column">
            <label for="microchipNumber">Microchip Number:</label>
            <input type="text" name="microchipNumber" id="microchipNumber" />

              <label for="sex">Sex:</label>
  <select name="sex" id="sex" required>
    <option value="">-- Select --</option>
    <option value="Mare">Mare</option>
    <option value="Gelding">Gelding</option>
    <option value="Stallion">Stallion</option>
  </select>

            <label for="notes">Notes:</label>
            <textarea name="notes" id="notes" rows="4"></textarea>

            <label for="image">Photo Upload:</label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              @change=${this.handleImagePreview}
            />

            <button type="submit" class="custom-button">Add Horse</button>
          </div>

          <!-- Column 3 -->
          <div class="three-col-column avatar-column">
          
<sl-avatar
  id="image-preview"
  style="--size: 250px; margin-top: 2rem;"
  alt="Horse Preview"
></sl-avatar>
          </div>
        </form>
      </ag-app-layout>
    `;
    render(template, App.rootEl);

    document
      .querySelector("#add-horse-form")
      .addEventListener("submit", this.addHorseSubmitHandler.bind(this));
  }
}

export default new AddHorseView();
