import { html, render } from 'lit-html'
import Utils from './../../Utils'
import './../components/ag-app-header'

export default {
  render(content) {
    const template = html`
      <div class="layout">
        <ag-app-header></ag-app-header>
        <main class="page-content">${content}</main>
      </div>
    `
    render(template, document.querySelector('#app'))
    Utils.pageIntroAnim()
  }
}
