import App from './../../App'
import { html, render } from 'lit-html'
import { gotoRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import Toast from './../../Toast'
import ServiceRequestAPI from './../../ServiceRequestsAPI'
import moment from 'moment'

class ViewRequestsView {
  async init() {
    console.log('ViewRequestsView.init')
    document.title = 'All Service Requests'

    try {
      this.requests = await ServiceRequestAPI.getAllServiceRequests()
    } catch (err) {
      console.error(err)
      Toast.show('Failed to load service requests', 'error')
      this.requests = []
    }

    this.render()
    Utils.pageIntroAnim()
  }

  render() {
    const template = html`
      <ag-app-layout>
        <h1>All Service Requests</h1>

        ${this.requests.length === 0
          ? html`<p>No service requests found.</p>`
          : html`
              <div class="request-table-wrapper">
                <table class="request-table">
                  <thead>
                    <tr>
                      <th>Service Type</th>
                      <th>Horse</th>
                      <th>Notes</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this.requests.map(req => html`
                      <tr>
                        <td>${req.serviceType}</td>
                        <td>${req.horseID?.name || 'Unknown'}</td>
                        <td>${req.notes || '—'}</td>
                        <td>${moment(req.date).format('DD MMM YYYY')}</td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              </div>
            `}
      </ag-app-layout>
    `

    render(template, App.rootEl)
  }
}

export default new ViewRequestsView()
