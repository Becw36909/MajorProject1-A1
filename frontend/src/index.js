import App from './App.js'

// components (custom web components)
import './components/ag-app-header'
import './components/ag-app-sidebar'
import './components/ag-topbar'
import './components/ag-tile-button'



// styles
import './scss/master.scss'

// app.init
document.addEventListener('DOMContentLoaded', () => {
  App.init()
})