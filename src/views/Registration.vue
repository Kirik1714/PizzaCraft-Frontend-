
<script setup lang="ts">
import { ref } from 'vue';

import InputText from 'primevue/inputtext';
import InlineMessage from 'primevue/inlinemessage';

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

}



</script>


<template>
    <div class="container">
        <form class="form">


            <div class="login_title">Регистрация</div>
    
            <div class="form_block">
                <InputText type="text" v-model="name" placeholder="Логин"   :invalid="userStore.error?.name?.[0]"  />
                <InlineMessage v-if="userStore.error.name">{{ userStore.error.name[0] }}</InlineMessage>
            </div>
            <div class="form_block">
                <InputText type="email"  v-model="email" placeholder="Почта"  :invalid="userStore.error?.email?.[0]"  />
                <InlineMessage v-if="userStore.error.email">{{ userStore.error.email[0] }}</InlineMessage>
            </div>
            <div class="form_block">
                <InputText type="password"  v-model="password" placeholder="Пароль"  :invalid="userStore.error?.password?.[0]"  />
                <InlineMessage v-if="userStore.error.password">{{ userStore.error.password[0] }}</InlineMessage>
            </div>

            <div class="form_block">
                <InputText type="password"  v-model="password_confirmation" placeholder="Подтвердите пароль"  :invalid="userStore.error?.password?.[0]"  />
                <InlineMessage v-if="userStore.error.password_confirmation">{{ userStore.error.password_confirmation[0] }}</InlineMessage>
            </div>

    
            <vue-hcaptcha sitekey="5abac5df-846c-4114-a64f-3f07ed996c06" @verify="verify()"></vue-hcaptcha>
            <Button label="Зарегистрировать"  :disabled="!verifyHCaptcha"  @click="userStore.createUser({ name,email, password,password_confirmation})"/>
            
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
    &_block {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-direction: column;
     
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
