import { LitElement, html, css } from "lit";

class AgTileGrid extends LitElement {
  static styles = css`
  :host {
    display: block; /* makes margin auto actually work */
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 2.5rem;
    justify-items: center;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
  }
`;


  render() {
    return html`<div class="grid"><slot></slot></div>`;
  }
}

customElements.define("ag-tile-grid", AgTileGrid);
