import App from './App.js'

// components (custom web components)
import './components/ag-app-header'
import './components/ag-app-sidebar.js'
import './components/ag-topbar.js'

// styles
import './scss/master.scss'

// app.init
document.addEventListener('DOMContentLoaded', () => {
  App.init()
})