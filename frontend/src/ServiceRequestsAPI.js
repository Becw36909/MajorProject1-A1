import App from './App.js';

class ServiceRequestAPI {

  async getServiceRequestsByHorse(horseId) {
    const res = await fetch(`${App.apiBase}/serviceRequests/horse/${horseId}`);
    return await res.json();
  }

  async createServiceRequest(data) {
    const res = await fetch(`${App.apiBase}/serviceRequests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.accessToken}`
      },
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message)
    }

    return await res.json()
  }

  async getAllServiceRequests() {
    const res = await fetch(`${App.apiBase}/serviceRequests`, {
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`,
      }
    })
  
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message)
    }
  
    return await res.json()
  }
  


}

export default new ServiceRequestAPI();
