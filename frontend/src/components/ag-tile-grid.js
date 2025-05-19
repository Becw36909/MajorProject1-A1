import { LitElement, html, css } from "lit";

class AgTileGrid extends LitElement {
  static properties = {
    center: { type: Boolean },
  };

  constructor() {
    super();
    this.center = true; // default is centered
  }

  static styles = css`
  :host {
    display: block; /* makes margin auto actually work */
  }

  .grid {
    display: grid;
    gap: 2.5rem;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
          align-items: start;

  }

    .grid-center {
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); /* evenly spaced */

    justify-items: center;
  }

  .grid-left {
      grid-template-columns: repeat(auto-fit, minmax(180px, max-content)); /* natural wrapping */

    justify-items: start;
  }

  @media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr; /* one tile per row */
    justify-items: stretch; /* stretch tiles to full width */
    gap: 1rem;
    padding: 1rem;
  }
`;

  render() {
    return html`
      <div class="grid ${this.center ? "grid-center" : "grid-left"}">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("ag-tile-grid", AgTileGrid);
