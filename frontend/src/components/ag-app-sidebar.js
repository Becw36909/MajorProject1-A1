import { LitElement, html, css } from "lit";
import { anchorRoute, gotoRoute } from "../Router";
import Auth from "../Auth";
import Utils from "../Utils";
import App from "../App";
import UserAPI from "../UserAPI";

customElements.define(
  "ag-app-sidebar",
  class AgAppSidebar extends LitElement {
    constructor() {
      super();
    }

    static get properties() {
      return {
        user: { type: Object },
      };
    }

    connectedCallback() {
      super.connectedCallback();
    }

    firstUpdated() {
      super.firstUpdated();

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
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 280px;
            height: 100vh;
            background-color: var(--app-sidebar-bg);
            box-sizing: border-box;
            padding: 2rem 1rem;
            overflow: hidden;
            transition: width 0.3s ease;
          }

          .sidebar-main {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
          }

          .logo {
            text-align: center;
            margin-bottom: 2rem;
          }

          .logo a {
            text-decoration: none;
          }

          .logo img {
            width: 100px;
          }

          .logo-text {
            font-family: "Playfair Display", serif;
            font-weight: 600;
            font-size: 2.8rem;
            color: #e8c872;
          }

          .profile {
            text-align: center;
            margin-bottom: 1rem;
          }

          .profile a {
            text-decoration: none;
          }

          .avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 3px solid #f7f1df;
            margin: 0 auto 0.5rem;
            box-sizing: border-box;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            background-color: #444; /* fallback bg if image fails */
            background-position: center;
          }

          .avatar:hover {
            box-shadow: 0 0 6px #e8c872;
            cursor: pointer;
            transform: scale(1.1);
          }

          .avatar-initials {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            font-weight: bold;
            color: #e8c872;
            background-color: #6b8e23; /* background behind initials */
            text-transform: uppercase;
          }

          .sidebar-links {
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
            padding: 1rem 0;
          }

          .sidebar-links a {
            color: #f7f1df;
            text-decoration: none;
            font-size: 1.5rem;
            padding-left: 1.2rem;
            font-weight: 400;
            transition: 0.2s;
          }

          .sidebar-links a:hover,
          .sidebar-links a.active {
            color: #e8c872;
            font-weight: 600;
            text-decoration: none;
          }

          .sidebar-links a.active {
            color: #e8c872;
            font-weight: bold;
            text-decoration: underline;
          }

          .sign-out-btn {
            margin-top: auto;
            display: flex;
            justify-content: center;
          }

          sl-button::part(base) {
            background-color: #6b8e23;
            color: #f7f1df;
            font-family: "Quicksand", sans-serif;
            font-weight: 600;
            font-size: 1.2rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 3px solid #f7f1df;
          }

          sl-button::part(base):hover {
            transform: scale(1.08);
            box-shadow: 0 0 8px #e8c872;
            cursor: pointer;
          }

          .sidebar-footer {
            margin-top: auto;
            text-align: center;
            font-size: 1rem;
            font-weight: 400;
            font-family: "Quicksand", sans-serif;
            color: #f7f1df;
            opacity: 0.7;
            padding-top: 2.8rem;
          }

          @media (max-width: 1024px) {
            :host {
              width: 200px;
            }

            .logo-text {
              font-size: 1.8rem;
            }

            .sidebar-links a {
              font-size: 1.5rem;
              padding-left: 0.8rem;
            }

            sl-button::part(base) {
              font-size: 1rem;
            }

            .avatar {
              width: 80px;
              height: 80px;
            }

            .avatar-initials {
              font-size: 2rem;
            }
          }

          @media (max-height: 900px) {
            .sidebar-links {
              gap: 1rem;
            }
          }

          @media (max-height: 850px) {
            .logo img {
              width: 80px;
            }

            .logo-text {
              font-size: 2.2rem;
            }

            .avatar {
              width: 90px;
              height: 90px;
            }

            .avatar-initials {
              font-size: 2rem;
            }

            .sidebar-links {
              gap: 0.9rem;
            }

            .sidebar-links a {
              font-size: 1.2rem;
            }

            .sidebar-footer {
              font-size: 0.85rem;
              padding-top: 2rem;
            }

            sl-button::part(base) {
              font-size: 0.9rem;
              padding: 0.4rem 1rem;
            }
          }

          @media (max-height: 790px) {
            .logo img {
              width: 60px;
            }

            .logo-text {
              font-size: 1.8rem;
            }

            .avatar {
              width: 70px;
              height: 70px;
            }

            .avatar-initials {
              font-size: 1.6rem;
            }

            .sidebar-links a {
              font-size: 1rem;
              padding-left: 1rem;
            }

            .sidebar-footer {
              padding-top: 1.5rem;
            }

            sl-button::part(base) {
              font-size: 0.85rem;
            }
          }
        </style>

        <div class="sidebar-main">
          <!-- logo -->
          <div class="logo">
            <a href="/" @click=${anchorRoute}>
              <img src="/images/horse-head.svg" alt="AgistEase Logo" />
              <div class="logo-text">AgistEase</div></a
            >
          </div>

          <!-- profile -->

          <div class="profile">
            <a href="/profile" @click=${anchorRoute}>
              ${this.user && this.user.profileImage
                ? html`
                    <div
                      class="avatar"
                      style="background-image: url('${App.apiBase}/images/${this
                        .user.profileImage}'); background-size: cover;"
                    ></div>
                  `
                : html`
                    <div class="avatar avatar-initials">
                      ${this.user?.firstName
                        ? this.user.firstName[0].toUpperCase()
                        : "U"}
                    </div>
                  `}
            </a>
          </div>

          <!-- links -->

          <nav class="sidebar-links">
            ${this.user?.accessLevel === "admin"
              ? html`
                  <a href="/dashboard" @click=${anchorRoute}>Admin Dashboard</a>
                  <a href="/horses" @click=${anchorRoute}>Manage Horses</a>
                  <a href="/viewRequests" @click=${anchorRoute}
                    >Service Requests</a
                  >
                  <a href="/profile" @click=${anchorRoute}>My Profile</a>
                  <a href="/calendar" @click=${anchorRoute}>Calendar</a>
                `
              : html`
                  <a href="/" @click=${anchorRoute}>Home/Dashboard</a>
                  <a href="/dashboard" @click=${anchorRoute}>Dashboard</a>
                  <a href="/horses" @click=${anchorRoute}>My Horses</a>
                  <a href="/requests" @click=${anchorRoute}>Request Services</a>
                  <a href="/profile" @click=${anchorRoute}>My Profile</a>
                  <a href="/calendar" @click=${anchorRoute}>Calendar</a>
                `}
          </nav>

          <!-- sign-out -->

          <div class="sign-out-btn">
            <a href="#" @click=${() => Auth.signOut()}
              ><sl-button size="medium" pill>Sign Out</sl-button></a
            >
          </div>

          <!-- footer -->

          <div class="sidebar-footer">
            <span>AgistEase v${App.version}</span>
          </div>
        </div>
      `;
    }
  }
);
