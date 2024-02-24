<script setup lang="ts">
import { RouterLink } from 'vue-router'

</script>
<template>
    <div class="container_empty_basket">
        <div class="empty_basket_title">Корзина пустая</div>
        <div class="empty_basket_description">Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать пиццу,
            перейди на главную страницу.</div>
        <img src="../assets/images/emptyBasket.svg" alt="">
        <RouterLink to="/">
            <div class="empty_basket_btn_back">
                Вернуться назад
            </div>
        </RouterLink>
    </div>
</template>

<style scoped lang="scss">
.container_empty_basket {
    margin-top: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .empty_basket_title {
        font-size: 28px;
        font-family: 'Inter';
        font-weight: 600px;


    }

    .empty_basket_description {
        margin-top: 20px;
        text-align: center;
        font-size: 18px;
        font-family: 'Inter';
        font-weight: 600px;
        max-width: 600px;
        color: #777777;
        margin-bottom: 20px;
    }

    .empty_basket_btn_back {
        border: 1px solid rgb(139, 230, 250);
        border-radius: 25px;
        padding: 10px 20px;
        margin-top: 75px;
        color: #000000;
    }

}</style>