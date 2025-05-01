import { LitElement, html, css } from 'lit';

class AgTileGrid extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 2rem;
      justify-items: center;
      margin: 2rem 0;
      padding: 0 1rem;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('ag-tile-grid', AgTileGrid);
