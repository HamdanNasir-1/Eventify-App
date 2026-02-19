import axios from "axios";

const API = axios.create({
  baseURL: "https://campus-events-api-6flp.onrender.com/api",
});


export default API;
