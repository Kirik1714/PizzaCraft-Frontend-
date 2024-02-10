
<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import Button from 'primevue/button';



const userStore=useUserStore();


const email=ref('');
const password=ref('');

const LoginUser = async (email,password) => {
    await userStore.loginUser({email,password})
    await userStore.getUser()
}




</script>


<template>
    <div class="container">
        <form class="form">


            <div class="login_title">Войти</div>
    
            <input type="email" class="btn" v-model="email" placeholder="Почта" />
    
            <input type="password"  class="btn" v-model="password" placeholder="Пароль" />
    
    
          <Button label="Войти" @click.prevent="LoginUser(email,password)"/>
      
            <RouterLink to="/registration">Нет аккаунта?</RouterLink>
        </form>


    </div>
</template>

<style scoped lang="scss">
.form {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;

    .login_title {
        font-size: 32px;
        font-family: 'Inter';
        font-weight: 500;
    }

    .btn {

        width: 230px;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid rgb(8, 161, 196);
        transition: border-color 0.3s ease-in-out;

        &:focus {
            outline: none;
            border: 1px solid rgb(37, 68, 221);

        }

        &::placeholder {
            color: #999;
        }
    }
}
</style>
