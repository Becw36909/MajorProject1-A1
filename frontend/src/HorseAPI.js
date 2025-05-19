import App from "./App";

class HorseAPI {
  // this needs to be updated to take the user id??
  async getHorses() {
    // fetch the json data
    const response = await fetch(`${App.apiBase}/horse`, {
      headers: { Authorization: `Bearer ${localStorage.accessToken}` },
    });

    // if response not ok
    if (!response.ok) {
      // console log error
      const err = await response.json();
      if (err) console.log(err);
      // throw error (exit this function)
      throw new Error("Problem getting horses");
    }

    // convert response payload into json - store as data
    const data = await response.json();

    // return data
    return data;
  }

  async getHorse(id) {
    return await fetch(`${App.apiBase}/horse/${id}`).then((res) => res.json());
  }

  async createHorse(formData) {
    const res = await fetch(`${App.apiBase}/horse`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Problem adding horse");
    }

    return await res.json();
  }
}

export default new HorseAPI();
