import { ref, computed,watch } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", () => {


    const createUser=async(object)=>{
        console.log(object);
        try {
            const {data}=await axios.post('http://localhost:8000/api/users',object)
            console.log(data);
            
        } catch (error) {
            console.log('Не удалось создать пользователя',error)
            
        }
       

    }
    return {createUser};
    
})