// src/components/ag-topbar.js
import { LitElement, html, css } from 'lit';

class AgTopbar extends LitElement {
  static styles = css`
    .topbar {
      width: 100%;
      height: 100px; /* Adgust height as needed */
      background-image: url('/images/IMG_0745.JPG'); 
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  `;

  render() {
    return html`
      <div class="topbar"></div>
    `;
  }
}

customElements.define('ag-topbar', AgTopbar);
