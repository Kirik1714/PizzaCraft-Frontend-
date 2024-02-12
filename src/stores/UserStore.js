import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import router from "@/router";

import api from "@/api";
import axios from "axios";

export const useUserStore = defineStore("user", () => {
  const user = ref({});
  const error = ref({});
  const userInLocalStorage = localStorage.getItem('user');
  
  if (userInLocalStorage !== null) {
    user.value = JSON.parse(userInLocalStorage);
  }
  
  const createUser = async (object) => {
    error.value = {};
    try {
      const { data } = await api.post("http://localhost:8000/api/users", object);
      localStorage.setItem("access_token", data.access_token);
      getUser();
      router.push({ name: "Main" });
    } catch (errorInResponse) {
      error.value=errorInResponse.response.data.errors;
      console.log("Не удалось создать пользователя", errorInResponse);
    }
  };

  const loginUser = async (object) => {
    try {
      const { data } = await api.post("http://localhost:8000/api/auth/login", {
        email: object.email,
        password: object.password,
      });

      localStorage.setItem("access_token", data.access_token);
      getUser();
      router.push({ name: "Main" });
    } catch (errorInResponse) {
      error.value = errorInResponse.response.data;
      console.log(errorInResponse.value);

      console.log("Не получилось авторизоваться", errorInResponse);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await api.post("http://localhost:8000/api/auth/me");
      user.value = data;
    } catch (error) {
      console.log('Не удалось получить пользователя', error);
    }
  };

  const logoutUser = async () => {
    try {
      const { data } = await api.post("http://localhost:8000/api/auth/logout");
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      router.push({ name: "Main" });
      user.value = {};
    } catch (error) {
      console.log('Не удалось выйти', error);
    }
  };
  const createOrder=async(object)=>{
    console.log(object);
    try {
      const {data}=await axios.post('http://localhost:8000/api/orders',object)
      console.log(data);
      
    } catch (error) {
      console.log('Не удалось создать заказ', error);
    }
  }

  watch(user, (state) => {
    localStorage.setItem("user", JSON.stringify(state));
  }, {
    deep: true
  });

  return { user, error, createUser, loginUser, getUser, logoutUser, userInLocalStorage,createOrder };
});
