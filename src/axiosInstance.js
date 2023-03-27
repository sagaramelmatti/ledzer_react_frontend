import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_APP_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const updatedConfig = config;
    let token = localStorage.getItem("token");

    // @ts-ignore
    updatedConfig.headers.Authorization = token ? `Bearer ${token}` : "";
    return updatedConfig;
  },
  (error) => Promise.reject(error)
);

// axiosInstance.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     if (error.response.status === 401 || error.response.status === 403) {
//       localStorage.removeItem("token");
//       window.location.href = "/";
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
