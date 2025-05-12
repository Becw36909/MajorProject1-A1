import App from './App.js';

class ServiceRequestAPI {
  async getServiceRequestsByHorse(horseId) {
    const res = await fetch(`${App.apiBase}/serviceRequests/horse/${horseId}`);
    return await res.json();
  }
}

export default new ServiceRequestAPI();
