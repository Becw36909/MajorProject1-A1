// frontend/src/components/ag-app-header.js
import { html, render } from 'lit-html'
import { anchorRoute, gotoRoute } from '../Router'
import Auth from '../Auth'

class AgAppHeader extends HTMLElement {
  connectedCallback() {
    this.render()
  }

  signOutHandler(e) {
    e.preventDefault()
    Auth.signOut()
  }

  render() {
    const template = html`
      <header class="app-header">
        <div class="app-header-left">
          <img class="logo" src="/images/logo.svg" @click=${() => gotoRoute('/')} style="cursor: pointer;" />
        </div>
        <div class="app-header-right">
          ${Auth.currentUser ? html`
            <sl-dropdown>
              <sl-button slot="trigger" caret>${Auth.currentUser.firstName}</sl-button>
              <sl-menu>
                <sl-menu-item>
                  <a href="/profile" @click=${anchorRoute}>My Profile</a>
                </sl-menu-item>
                <sl-menu-item>
                  <a href="/editProfile" @click=${anchorRoute}>Edit Profile</a>
                </sl-menu-item>
                <sl-menu-item @click=${this.signOutHandler}>Sign Out</sl-menu-item>
              </sl-menu>
            </sl-dropdown>
          ` : html`
            <sl-button @click=${() => gotoRoute('/signin')}>Sign In</sl-button>
          `}
        </div>
      </header>
    `
    render(template, this)
  }
}

customElements.define('ag-app-header', AgAppHeader)
