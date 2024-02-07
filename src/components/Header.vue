<script setup>
import { RouterLink } from 'vue-router';
import { useBasketStore } from '../stores/BasketStore';

const basketStore = useBasketStore();
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
                <div class="user_block_account">
                    <RouterLink to="/login">
                        <img src="../assets/images/account.svg" alt="">
                    </RouterLink>
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
        /* или ваш цвет текста */
        text-decoration: none;
        /* убирает подчеркивание, если необходимо */
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
}</style>