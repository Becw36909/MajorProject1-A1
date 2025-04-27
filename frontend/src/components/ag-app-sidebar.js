import { LitElement, html, css } from 'lit';
import { anchorRoute, gotoRoute } from '../Router'
import Auth from '../Auth'
import Utils from "../Utils";

class AgAppSidebar extends LitElement {




  
  static styles = css`
    :host {
      display: block;
      width: 280px;
      height: 100vh;
      background-color: var(--sl-color-neutral-100);
      border-right: 1px solid var(--sl-color-neutral-200);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem 1rem;
      box-sizing: border-box;
    }

    .profile-pic {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 1rem;
    }

    .user-name {
      font-weight: bold;
      margin-bottom: 2rem;
      text-align: center;
    }

    sl-button {
      width: 100%;
      margin-bottom: 1rem;
    }
  `;

  render() {
    const user = Auth.currentUser;
    return html`
      <img 
        class="profile-pic" 
        src="/images/${user?.profileImage || 'default-profile.png'}" 
        alt="Profile Picture"
      />
      <div class="user-name">${user?.firstName} ${user?.lastName}</div>

      <sl-button variant="text" @click=${() => gotoRoute('/profile')}>Profile</sl-button>
      <sl-button variant="text" @click=${() => gotoRoute('/horses')}>Horses</sl-button>
      <sl-button variant="text" @click=${() => gotoRoute('/requests')}>Requests</sl-button>
      <sl-button variant="text" @click=${() => gotoRoute('/calendar')}>Calendar</sl-button>
      <sl-button variant="danger" @click=${() => Auth.signOut()}>Sign Out</sl-button>
    `;
  }
}

customElements.define('ag-app-sidebar', AgAppSidebar);
