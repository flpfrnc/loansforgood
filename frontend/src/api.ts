import axios from "axios";

function getCsrfToken() {
  return decodeURIComponent(document.cookie.split("csrftoken=")[1]);
}

const token = getCsrfToken();
const headers = {
  "Content-Type": "application/json",
  "X-CSRFToken": token,
};

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
  timeout: 1000,
  headers,
});
