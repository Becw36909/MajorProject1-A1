import { LitElement, html, css } from "lit";

class AgCalendarPreview extends LitElement {
  static properties = {
    events: { type: Array },
    isMobile: { type: Boolean },

  };

  constructor() {
    super();
    this.events = [];
    this.isMobile = window.innerWidth <= 768;
  }
  
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", this.checkMobile);
  }
  
  disconnectedCallback() {
    window.removeEventListener("resize", this.checkMobile);
    super.disconnectedCallback();
  }
  
  checkMobile = () => {
    this.isMobile = window.innerWidth <= 768;
  };



  static styles = css`
    .calendar-preview {
      background-color: #628c2a;
      padding: 2rem;
      border-radius: 2rem;
      margin-top: 2rem;
    }

    h2 {
      color: #fff;
      font-size: 1.5rem;
      text-align: center;
      margin-bottom: 1rem;
      
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background-color: #f8f1df;
      font-size: 1rem;
      
    }

    th, td {
      padding: 0.6rem 1rem;
      border: 1px solid #5a3e2b;
      text-align: left;
    }

    thead {
      background-color: #f1e8cf;
    }


    .notes-row td {
  font-style: italic;
  background-color: #f1e8cf;
}

@media screen and (max-width: 768px) {
  th {
    display: none;
  }

  td {
    display: block;
    width: 100%;
    box-sizing: border-box;
    border: none;
    padding: 0.4rem 1.2rem; /* Added horizontal padding */
    background-color: #f8f1df;
    font-style: normal; /* Ensure normal style for all */
  }

  .notes-row td {
    background-color: #f8f1df;
    font-style: italic;
  }

  tr {
    border-bottom: 1px solid #5a3e2b;
    margin-bottom: 1rem;
  }

  tr:last-child {
    border-bottom: none;
  }

  table {
    font-size: 0.95rem;
    border-collapse: separate;
    border-spacing: 0 1rem;
  }
}



  `;


  render() {
  return html`
    <div class="calendar-preview">
      <h2>Upcoming calendar events</h2>
      ${this.isMobile ? this.renderMobileTable() : this.renderDesktopTable()}
    </div>
  `;
}

renderDesktopTable() {
  return html`
    <table>
      <thead>
        <tr>
          <th>Date:</th>
          <th>Time:</th>
          <th>Horse:</th>
          <th>Service:</th>
          <th>Notes:</th>
        </tr>
      </thead>
      <tbody>
        ${this.events.map(
          (event) => html`
            <tr>
              <td>${event.date}</td>
              <td>${event.time}</td>
              <td>${event.horse}</td>
              <td>${event.service}</td>
              <td>${event.notes || ""}</td>
            </tr>
          `
        )}
      </tbody>
    </table>
  `;
}

renderMobileTable() {
  return html`
    <table>
      <tbody>
        ${this.events.map(
          (event) => html`
            <tr>
              <td><strong>Date:</strong> ${event.date}</td>
            </tr>
            <tr>
              <td><strong>Time:</strong> ${event.time}</td>
            </tr>
            <tr>
              <td><strong>Horse:</strong> ${event.horse}</td>
            </tr>
            <tr>
              <td><strong>Service:</strong> ${event.service}</td>
            </tr>
            ${event.notes
              ? html`
                  <tr class="notes-row">
                    <td><strong>Notes:</strong> ${event.notes}</td>
                  </tr>
                `
              : ""}
            <tr><td><hr /></td></tr>
          `
        )}
      </tbody>
    </table>
  `;
}

}

customElements.define("ag-calendar-preview", AgCalendarPreview);
