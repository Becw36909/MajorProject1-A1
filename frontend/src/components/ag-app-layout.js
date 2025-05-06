import { LitElement, html, css } from 'lit';
import Auth from '../Auth';

customElements.define(
  'ag-app-layout',
  class AgAppLayout extends LitElement {
    static properties = {
      user: { type: Object },
    };

    static styles = css`
 :host {
      display: block;
      height: 100vh;
    }

    .layout {
      display: flex;
      height: 100%;
      overflow: hidden;
    }

    ag-app-sidebar {
      flex-shrink: 0;
      width: 250px;
    }

    .main-content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .topbar-wrap {
      flex-shrink: 0;
    }

    .view-wrap {
      flex-grow: 1;
      overflow-y: auto;
      padding: 2rem;
      background-color: var(--body-bg, #faf3e0);
    }

    @media (max-width: 768px) {
      .layout {
        flex-direction: column;
      }

      ag-app-sidebar {
        display: none;
      }

      .main-content {
        width: 100%;
      }

      .view-wrap {
        padding: 1.5rem;
      }
    }
    `;

    constructor() {
      super();
      this.user = Auth.currentUser;
    }

    render() {
      return html`
      <div class="layout">
        <ag-app-sidebar .user=${this.user}></ag-app-sidebar>
        <div class="main-content">
          <div class="topbar-wrap">
            <ag-topbar></ag-topbar>
          </div>
          <div class="view-wrap">
            <slot></slot>
          </div>
        </div>
      </div>
      `;
    }
  }
);
