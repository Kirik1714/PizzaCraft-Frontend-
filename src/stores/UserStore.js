import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import router from "@/router";

import api from "@/api";

export const useUserStore = defineStore("user", () => {
  const user = ref({});

  const createUser = async (object) => {
    try {
      const { data } = await api.post("http://localhost:8000/api/users", object);
      console.log(data);
    } catch (error) {
      console.log("Не удалось создать пользователя", error);
    }
  };

  const loginUser = async (object) => {
    try {
      const { data } = await api.post("http://localhost:8000/api/auth/login", {
        email: object.email,
        password: object.password,
      });

      localStorage.setItem("access_token", data.access_token);
      router.push({ name: "Main" });
    } catch (error) {
      console.log("Не получилось авторизоваться", error);
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

  return { user, createUser, loginUser, getUser };
});
