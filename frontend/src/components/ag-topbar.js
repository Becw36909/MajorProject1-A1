import { LitElement, html, css } from 'lit';

class AgTopbar extends LitElement {
  static styles = css`
    .topbar {
      width: 100%;
      height: 300px;
      background-image: url('/images/IMG_0745.JPG'); 
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* subtle drop shadow */

    }
  `;

  render() {
    return html`
      <div class="topbar"></div>
    `;
  }
}

customElements.define('ag-topbar', AgTopbar);
