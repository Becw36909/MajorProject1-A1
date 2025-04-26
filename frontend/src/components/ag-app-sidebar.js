// src/components/ag-app-sidebar.js
import { LitElement, html, css } from 'lit';

class AgAppSidebar extends LitElement {

    navigate(e) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        history.pushState(null, null, href);
        window.dispatchEvent(new Event('popstate'));
      }
    
      signOut(e) {
        e.preventDefault();
        import('../Auth').then(Auth => {
          Auth.default.signOut();
        });
      }



  static styles = css`
    aside {
      width: 250px;
      background-color: #faf3e0;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      padding: 1rem;
      box-shadow: 2px 0 5px rgba(0,0,0,0.1);
    }
    nav a {
      display: block;
      margin: 1rem 0;
      color: #5a3e2b;
      font-weight: bold;
      text-decoration: none;
    }
    nav a:hover {
      text-decoration: underline;
    }
    .logo {
      margin-bottom: 2rem;
      font-size: 1.5rem;
      font-weight: bold;
      color: #6b8e23;
    }
  `;

  render() {
    return html`
      <aside>
        <div class="logo">AgistEase</div>
        <nav>
          <a href="/adminDashboard" @click=${this.navigate}>Dashboard</a>
          <a href="/horses" @click=${this.navigate}>Horses</a>
          <a href="/requests" @click=${this.navigate}>Service Requests</a>
          <a href="/calendar" @click=${this.navigate}>Calendar</a>
          <a href="/profile" @click=${this.navigate}>Profile</a>
          <a href="/" @click=${this.signOut}>Sign Out</a>
        </nav>
      </aside>
    `;
  }


}

customElements.define('ag-app-sidebar', AgAppSidebar);
