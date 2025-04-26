import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class GuideView {
  init(){
    document.title = 'Guide Page'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <ag-app-header title="Guide" user="${JSON.stringify(Auth.currentUser)}"></ag-app-header>
      <div class="page-content">        
        <h1>Guide</h1>
        <p>Page content ...</p>
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new GuideView()