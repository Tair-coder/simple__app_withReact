import axios from "axios";

const api = axios.create({
  baseURL: "https://swapi.dev/api/",
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [(data) => JSON.stringify(data)],
  transformResponse: [(data) => JSON.parse(data)],
});

export default api;
