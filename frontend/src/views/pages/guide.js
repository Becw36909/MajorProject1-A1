import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from '../../UserAPI'
import Toast from '../../Toast'

class GuideView {
  init(){
    document.title = 'Guide Page'    
    this.render()    
    Utils.pageIntroAnim()
    this.updateCurrentUser();
  }

  async updateCurrentUser(){

    try{

        const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, {newUser: false}, 'json')
    }
    catch(err){
        Toast.show(err, 'error')

    }

  }

  render(){
    const template = html`
      <ag-app-header title="Guide" user="${JSON.stringify(Auth.currentUser)}"></ag-app-header>
      <div class="page-content">        
        <h1>Guide</h1>
        <p>Page content ...</p>
                <sl-button class="anim-in" @click=${() => gotoRoute('/')}>Go To Home</sl-button>

      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new GuideView()