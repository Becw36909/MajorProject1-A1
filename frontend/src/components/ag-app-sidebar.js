import { LitElement, html, css } from "lit";
import { anchorRoute, gotoRoute } from "../Router";
import Auth from "../Auth";
import Utils from "../Utils";

class AgAppSidebar extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      user: { type: Object },
    };
  }

  firstUpdated() {
    this.activateCurrentLink();
  }

  activateCurrentLink() {
    const currentPath = window.location.pathname;
    const navLinks = this.shadowRoot.querySelectorAll(".sidebar-links a");

    navLinks.forEach((link) => {
      if (link.pathname === currentPath) {
        link.classList.add("active");
      }
    });
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
          width: 280px;
          height: 100vh;
          background-color: var(--app-sidebar-bg);
          display: flex;
          flex-direction: column;
          align-items: left;
          padding: 2rem 1rem;
          box-sizing: border-box;
        }

        .logo {
          text-align: center;
          margin-bottom: 2rem;
        }

        .logo img {
          width: 120px;
        }

        .logo-text {
        font-family: 'Playfair Display', serif;
        font-weight: 600;
                  font-size: 3rem;
                  color: #E8C872;

        }

        .profile {
          text-align: center;
          margin-bottom: 2rem;
        }

        sl-avatar {
          --size: 70px;
          margin-bottom: 0.5rem;
        }

        .sidebar-links {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          padding: 1rem 0;
        }

        .sidebar-links a {
                  color: #E8C872;
          text-decoration: none;
          font-size: 1.2rem;
          transition: 0.2s;
        }

        .sidebar-links a:hover,
        .sidebar-links a.active {
          font-weight: bold;
          text-decoration: underline;
        }
      </style>

      <div class="logo"><a href="/" @click=${anchorRoute}>
        <img src="/images/horse-head.svg" alt="AgistEase Logo" />
        <div class="logo-text">AgistEase</div></a>
      </div>

      <div class="profile">
        ${Auth.currentUser.profileImage
          ? html`
              <sl-avatar
                image="/images/${Auth.currentUser.profileImage}"
                label="Profile Image"
              >
              </sl-avatar>
            `
          : html` <sl-avatar label="Default User"> </sl-avatar> `}
        <div>${Auth.currentUser.firstName || ""}</div>
      </div>

      <nav class="sidebar-links">
        <a href="/" @click=${anchorRoute}>Home/Dashboard</a>
        <a href="/horses" @click=${anchorRoute}>My Horses</a>
        <a href="/requests" @click=${anchorRoute}>Request Services</a>

        <a href="/profile" @click=${anchorRoute}>My Profile</a>
        <a href="/calendar" @click=${anchorRoute}>Calendar</a>

        <a href="#" @click=${() => Auth.signOut()}>Sign Out</a>
      </nav>
    `;
  }
}

customElements.define("ag-app-sidebar", AgAppSidebar);
