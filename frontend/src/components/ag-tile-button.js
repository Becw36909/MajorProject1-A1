import { LitElement, html, css } from 'lit';

class AgTileButton extends LitElement {
  static properties = {
    label: { type: String },
    image: { type: String }, // Optional: circular image in center
    icon: { type: String },  // Optional: emoji/character
    clickable: { type: Boolean },
  };

  static styles = css`
    :host {
      display: block;
      width: 160px;
      height: 160px;
      background-color: #D2691E;
      border-radius: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
      color: white;
      font-family: "Quicksand", sans-serif;
      text-align: center;
      padding: 1rem;
      box-sizing: border-box;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      cursor: pointer;
    }

    :host(:hover) {
      transform: scale(1.05);
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.4);
    }

    .circle-image {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 0.8rem;
      border: 2px solid white;
    }

    .icon {
      font-size: 2.5rem;
      margin-bottom: 0.8rem;
    }

    .label {
      font-size: 1.1rem;
      font-weight: 500;
    }
  `;

  constructor() {
    super();
    this.label = '';
    this.image = '';
    this.icon = '';
    this.clickable = true;
  }

  render() {
    return html`
      ${this.image
        ? html`<img class="circle-image" src="${this.image}" alt="Tile image" />`
        : this.icon
        ? html`<div class="icon">${this.icon}</div>`
        : html`<slot></slot>`}

      <div class="label">${this.label}</div>
    `;
  }
}

customElements.define('ag-tile-button', AgTileButton);
