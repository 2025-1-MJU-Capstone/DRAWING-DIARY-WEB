import axios from "axios";

export const springInstance = axios.create({
  baseURL: "",
  timeout: 3000,
});
