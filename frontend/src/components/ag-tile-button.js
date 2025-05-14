import { LitElement, html, css } from "lit";
import { anchorRoute, gotoRoute } from "../Router";

class AgTileButton extends LitElement {
  static properties = {
    label: { type: String },
    image: { type: String },
    icon: { type: String },
    iconImage: { type: String },
    route: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      width: 180px;
      height: 180px;
      background-color: #d2691e;
      border: 10px solid #5A3E2B-; /* Border color */

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
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 0.8rem;
      border: 2px solid white;
    }

    .icon {
      font-size: 2.5rem;
      margin-bottom: 0.8rem;
    }

    .icon-image {
      width: 52px;
      height: 52px;
      margin-bottom: 0.8rem;
      object-fit: contain;
      filter: brightness(0) invert(1); /* Optional: make white if needed */
    }

    .icon-image,
    .icon,
    .circle-image {
      margin-bottom: 0.4rem; /* was 0.8rem */
    }

    .tile-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .label {
      font-size: 1.1rem;
      font-weight: 500;
    }

@media (max-width: 768px) {
  :host {
    width: 100%;
    height: auto;
    border-radius: 10px;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
  }

  .tile-content {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    margin-left: 1.5rem; /* Push tile content slightly to the right */
  }

  .icon-image,
  .circle-image {
    width: 42px;
    height: 42px;
    margin: 0;
    flex-shrink: 0;
  }

  .label {
    font-size: 1rem;
    text-align: left;
    line-height: 1.2;
  }
}

    }
  `;

  constructor() {
    super();
    this.label = "";
    this.image = "";
    this.icon = "";
    this.route = ""; // default: do nothing
  }

  _handleClick() {
    if (this.route) {
      gotoRoute(this.route);
    }
  }

  render() {
    return html`
      <div class="tile-content" @click=${() => gotoRoute(this.route)}>
        ${this.image
          ? html`<img
              class="circle-image"
              src="${this.image}"
              alt="Tile image"
            />`
          : this.iconImage
          ? html`<img class="icon-image" src="${this.iconImage}" alt="icon" />`
          : this.icon
          ? html`<div class="icon">${this.icon}</div>`
          : html`<slot></slot>`}

        <div class="label">${this.label}</div>
      </div>
    `;
  }
}

customElements.define("ag-tile-button", AgTileButton);
