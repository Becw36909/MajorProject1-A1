import { LitElement, html, css } from "lit";
import { anchorRoute } from "../Router";
import Auth from "../Auth";

class AgTopbar extends LitElement {
  static styles = css`
    .topbar {
      width: 100%;
      height: 100px;
      background-image: url("/images/IMG_0745.JPG");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

    .mobile-bar {
      display: none;
      width: 100%;
      height: 80px;
      background-color: var(--app-sidebar-bg, #1e1e1e);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      box-sizing: border-box;
    }

    .logo-text {
      font-family: "Playfair Display", serif;
      font-size: 2rem;
      color: #e8c872;
      font-weight: 600;
    }

    .hamburger {
      background: none;
      border: none;
      font-size: 2rem;
      color: #f7f1df;
      cursor: pointer;
    }

    .nav-links {
      display: none;
      flex-direction: column;
      align-items: flex-start;
      padding: 1rem;
      background-color: #2e2e2e;
    }

    .nav-links.show {
      display: flex;
    }

    .nav-links a {
      color: #e8c872;
      text-decoration: none;
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
      font-family: "Quicksand", sans-serif;
    }

    .logo-wrap {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

        .logo-wrap a {
      text-decoration: none;
    }
      

    .logo-icon {
      height: 50px;
      width: auto;
    }

    @media (max-width: 768px) {
      .topbar {
        display: none;
      }

      .mobile-bar {
        display: flex;
      }
    }

    @media (min-width: 769px) {
      .mobile-bar,
      .nav-links {
        display: none !important;
      }
    }
  `;

  static properties = {
    navOpen: { type: Boolean },
  };

  constructor() {
    super();
    this.navOpen = false;
  }

  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  render() {
    return html`
      <!-- Desktop: Image topbar -->
      <div class="topbar"></div>

      <!-- Mobile: Brand and hamburger -->
      <div class="mobile-bar">
        <div class="logo-wrap">
          <a href="/" @click=${anchorRoute}>
            <img
              class="logo-icon"
              src="/images/horse-head.svg"
              alt="AgistEase logo"
            />
            <span class="logo-text">AgistEase</span></a
          >
        </div>
        <button class="hamburger" @click=${this.toggleNav}>☰</button>
      </div>

      <!-- Mobile: Nav links toggle -->
      <div class="nav-links ${this.navOpen ? "show" : ""}">
        ${Auth.currentUser?.accessLevel === "admin"
          ? html`
              <a href="/dashboard" @click=${anchorRoute}>Admin Dashboard</a>
              <a href="/horses" @click=${anchorRoute}>Manage Horses</a>
              <a href="/viewRequests" @click=${anchorRoute}>Service Requests</a>
              <a href="/profile" @click=${anchorRoute}>My Profile</a>
              <a href="/calendar" @click=${anchorRoute}>Calendar</a>
              <a href="#" @click=${() => Auth.signOut()}>Sign Out</a>
            `
          : html`
              <a href="/" @click=${anchorRoute}>Home/Dashboard</a>
              <a href="/dashboard" @click=${anchorRoute}>Dashboard</a>
              <a href="/horses" @click=${anchorRoute}>My Horses</a>
              <a href="/requests" @click=${anchorRoute}>Request Services</a>
              <a href="/profile" @click=${anchorRoute}>My Profile</a>
              <a href="/calendar" @click=${anchorRoute}>Calendar</a>
              <a href="#" @click=${() => Auth.signOut()}>Sign Out</a>
            `}
      </div>
    `;
  }
}

customElements.define("ag-topbar", AgTopbar);
