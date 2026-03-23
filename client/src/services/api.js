// Location: mern/client/services/api.jsx

import axios from 'axios';

// base URL of our backend
const API_URL = 'http://localhost:5000/api/obligations';

class ApiService {
  // GET all obligations
  getAll() {
    return axios.get(API_URL);
  }

  // GET single obligation
  getById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  // CREATE new obligation
  create(data) {
    return axios.post(API_URL, data);
  }

  // UPDATE obligation
  update(id, data) {
    return axios.put(`${API_URL}/${id}`, data);
  }

  // DELETE obligation
  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new ApiService();