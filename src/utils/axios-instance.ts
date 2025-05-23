import axios from "axios";

export const springInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SPRING_API_URL,
  timeout: 3000,
});
