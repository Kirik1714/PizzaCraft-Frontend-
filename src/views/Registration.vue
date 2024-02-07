
<script setup>
import { ref } from 'vue';

import  VueHcaptcha  from '@hcaptcha/vue3-hcaptcha';
import {useUserStore} from '../stores/UserStore'

const userStore = useUserStore();
const name=ref('');
const email=ref('');
const password=ref('');
const password_confirmation=ref('');



import Button from 'primevue/button';

const verifyHCaptcha = ref(false);

const verify = () => {
    verifyHCaptcha.value = true
    console.log(verifyHCaptcha.value);
}



</script>


<template>
    <div class="container">
        <form class="form">


            <div class="login_title">Регистрация</div>
    
            <input type="text" class="btn" v-model="name" placeholder="Логин" />

            <input type="email" class="btn" v-model="email" placeholder="Почта" />
    
            <input type="password"  class="btn" v-model="password" placeholder="Пароль" />
            <input type="password"  class="btn" v-model="password_confirmation" placeholder="Подтвердите пароль" />

    
            <vue-hcaptcha sitekey="5abac5df-846c-4114-a64f-3f07ed996c06" @verify="verify()"></vue-hcaptcha>
            <Button label="Зарегистрировать" @click="userStore.createUser({ name,email, password,password_confirmation})"/>
      
            <RouterLink to="/login" class="registration">Есть аккаунт?<br/>Войти!</RouterLink>
        </form>


    </div>
</template>

<style scoped lang="scss">
.form {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;

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
    .registration{
        text-align: center;
    }
}
</style>
