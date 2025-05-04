import { LitElement, html, css } from 'lit';

export class AgCalendarFull extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: #f8f1df;
      padding: 2rem;
      border-radius: 1.5rem;
      overflow-x: auto;
    }

    #calendar {
      max-width: 100%;
    }

    .fc-toolbar-title {
      font-size: 1.5rem;
      color: #5a3e2b;
    }

    .fc-button {
      background-color: #628c2a !important;
      border: none !important;
      color: white !important;
      padding: 0.3rem 1rem;
      border-radius: 1rem;
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer !important;
    }

    .fc-button:hover {
      background-color: #4a6d21 !important;
    }

    .fc-button:disabled {
      opacity: 0.5 !important;
      cursor: not-allowed !important;
    }

    .fc-event {
      background-color: #628c2a !important;
      color: #fff !important;
      font-weight: bold;
      padding: 0.2rem 0.4rem;
      border-radius: 0.3rem;
    }

    .fc-daygrid-day-frame,
    .fc-timegrid-slot,
    .fc-list-event {
      cursor: pointer;
    }

    .fc-daygrid-day:hover {
      background-color: #f1e8cf;
    }
  `;

  constructor() {
    super();
    this.calendar = null;
  }

  firstUpdated() {
    const calendarEl = this.renderRoot.querySelector('#calendar');

    // If calendar already exists, destroy before re-render
    if (this.calendar) {
      this.calendar.destroy();
    }

    // Load FullCalendar script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.10/index.global.min.js';
    script.onload = () => {
      const { Calendar } = window.FullCalendar;

      this.calendar = new Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        selectable: true,
        events: [
          { title: '7am Training', date: '2025-06-15', color: '#D2691E' },
          { title: '4pm Lesson', date: '2025-06-10', color: '#628c2a' },
          { title: '10am Lesson', date: '2025-06-26', color: '#628c2a' }
        ],
        dateClick: (info) => {
          alert(`Clicked on date: ${info.dateStr}`);
        }
      });

      this.calendar.render();
    };

    document.head.appendChild(script);
  }

  render() {
    return html`<div id="calendar"></div>`;
  }
}

customElements.define('ag-calendar-full', AgCalendarFull);
