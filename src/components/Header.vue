<script setup>

import TieredMenu from 'primevue/tieredmenu';
import Button from 'primevue/button';
import { ref, watch, onMounted } from 'vue';
import router from '@/router';
import { RouterLink } from 'vue-router';
import { useBasketStore } from '../stores/BasketStore';
import { useUserStore } from '../stores/UserStore';


const basketStore = useBasketStore();
const userStore = useUserStore();



onMounted(() => {
    console.log('userStore.user', userStore.user)
    console.log('userStore.user', userStore.userInLocalStorage)

}
)
const localUser = ref({});
console.log(localUser.value);



const menu = ref();
const items = ref([
    {
        label: 'Заказы',
        icon: 'pi pi-list',
        command: () => {
           
            console.log('Обработка нажатия на "Заказы"');
        }
    },
    {
        label: 'Выход',
        icon: 'pi pi-sign-out',
        command: async () => {
            await userStore.logoutUser();

         

        }
    }
]);

const toggle = (event) => {
    menu.value.toggle(event);
};



</script>

<template>
    <header>
        <nav class="nav">
            <RouterLink to="/" class="custom-link">
                <div class="nav_info_block">

                    <div class="info_block_logo"><img src="../assets/images/logo.svg" alt=""></div>
                    <div class="info_block_description">
                        <p class="info_block_title">VUE PIZZA</p>
                        <p class="info_block_subtitle">самая вкусная пицца во вселенной</p>
                    </div>
                </div>
            </RouterLink>
            <div class="nav_user_block">
                <RouterLink to="/basket" class="custom-link">

                    <div class="user_block_basket">
                        <div class="block_basket_price">{{ basketStore.getTotalPrice }} $</div>
                        <div class="block_basket_split"></div>
                        <div class="block_basket_img"><img src="../assets/images/basket.svg" alt="">{{
                            basketStore.countPizza }}</div>
                    </div>
                </RouterLink>

                <div class="user_block_account" v-if="!Object.keys(userStore.user).length">



                    <RouterLink to="/login">
                        <img src="../assets/images/account.svg" alt="">
                    </RouterLink>



                </div>
                <div class="user_block_name" v-else>
                    <Button type="button" :label="userStore.user.name" @click="toggle" aria-haspopup="true"
                        aria-controls="overlay_tmenu" icon="pi pi-user" severity="info" text rounded aria-label="User" />

                    <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup class="popup" />
                </div>
                </div>
        </nav>
    </header>
</template>

<style scoped lang="scss">
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;

    .custom-link {
        color: inherit;

        text-decoration: none;

    }

    &_info_block {
        display: flex;
        gap: 17px;
    }
}


.nav_user_block {
    display: flex;
    align-items: center;
    gap: 15px;

    .user_block_name {

        .popup {
            margin-top: 20px;
        }
    }

}

.info_block_title {
    font-weight: 900;
    font-size: 22px;
}

.info_block_title {
    font-weight: 900;
    font-size: 22px;
}

.info_block_subtitle {
    font-size: 14px;
    color: gray;
}

.user_block_basket {
    display: flex;
    background-color: rgb(208, 246, 255);
    gap: 20px;
    border-radius: 25px;
    padding: 15px;

}

.block_basket_split {
    width: 1px;
    height: 25;
    background-color: black;
}

.block_basket_img {
    display: flex;
    gap: 4px;
}
</style>