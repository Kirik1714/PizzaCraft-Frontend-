import axios from "axios";
import router from "./router";

const api = axios.create();

api.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("access_token")) {
      config.headers.authorization= "Bearer " + localStorage.getItem("access_token");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (localStorage.getItem("access_token")) {
      response.headers.authorization = "Bearer " + localStorage.getItem("access_token");
    }
    return response;
  },
  (error) => {
 
    if(error.response.data.message === 'Unauthenticated.') {
      
      return axios.post('http://localhost:8000/api/auth/refresh',{},{
        headers: {
          'authorization': "Bearer " + localStorage.getItem("access_token")
        }
      }
      ).then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        error.response.config.headers['Authorization'] = "Bearer " +  response.data.access_token;
        return api.request(error.config);
      })
    }


    // if (error.response.status === 401) {
    //   router.replace({ name: "Login" });
    // }
    return Promise.reject(error);
  }
);

export default api;
