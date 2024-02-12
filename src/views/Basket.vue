<script setup>
import CartBasket from '@/components/CartBasket.vue';
import EmptyBasket from '@/components/EmptyBasket.vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useBasketStore } from '../stores/BasketStore';
import { useUserStore } from '@/stores/UserStore';

const basketStore = useBasketStore();
const userStore = useUserStore();


const order = {
    'user_id': userStore.user.id,
    'pizzaz': JSON.stringify(basketStore.pizzazInBasket),
};

const access_token=localStorage.getItem('access_token')


</script>

<template>
    <div class="container">
        <div class="" v-if="basketStore.pizzazInBasket.length === 0">
            <EmptyBasket />
        </div>
        <div class="" v-else>

            <div class="container_basket_header">
                <div class="header_basket_title">
                    <img src="../assets/images/basketCart.svg" alt="">
                    <div class="title">Корзина</div>

                </div>
                <div class="header_basket_clear" @click="basketStore.clearBasket()">
                    <img src="../assets/images/trash.svg" alt="">
                    <div class="title">Очистить корзину</div>
                </div>
            </div>
            <div class="container_basket_main">
                <CartBasket v-for="pizza in basketStore.pizzazInBasket" :key="pizza.id" :pizza="pizza" />


            </div>
            <div class="container_basket_footer">
                <div class="pizza_order_info">
                    <div class="count">Всего пицц: <span class="count_number">{{ basketStore.countPizza }} шт.</span> </div>
                    <div class="price">Сумма заказа: <span class="price_number">{{ basketStore.getTotalPrice }} $</span>
                    </div>

                </div>
                <div class="pizza_button_order">
                    <div class="button_back btn">
                        <img src="../assets/images/back.svg" alt="">
                        <div class="button_back_text">Вернуться назад</div>
                    </div>
                    <div class="button_order btn" v-if="access_token">
                        <div class="button_order_text" @click="userStore.createOrder(order)">Оформить заказ</div>
                    </div>
                    <div class="button_order btn" v-else>

                        <RouterLink :to="{'name':'Login'}">
                            <div class="button_order_text" >Оформить заказ</div>

                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;

    width: 800px;
    margin: 0px auto;

    &_basket_header {
        padding-top: 90px;
        margin-bottom: 50px;
        display: flex;
        justify-content: space-between;

        .header_basket_title {
            display: flex;
            align-items: center;
            gap: 12px;

            .title {
                font-size: 28px;
                font-weight: 700;
                font-family: 'Inter';
            }
        }

        .header_basket_clear {
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;

            .title {
                font-size: 14px;
                color: #B6B6B6;
                font-family: 'Inter';
            }
        }
    }

    &_basket_main {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    &_basket_footer {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        gap: 30px;
        margin-bottom: 50px;

        .pizza_order_info {
            display: flex;
            justify-content: space-between;
            font-family: 'Inter';
            font-size: 22px;

            .count_number {
                font-weight: 600;
            }

            .price_number {
                font-weight: 600;
                color: rgb(8, 161, 196);

            }

        }

        .pizza_button_order {
            display: flex;
            align-items: center;
            justify-content: space-between;


            .button_back {
                display: flex;
                gap: 10px;
                color: #B6B6B6;
            }

            .button_order {
                background-color: rgb(8, 161, 196);
                color: #FFFFFF;
            }
        }

        .disable {
            pointer-events: none;

        }
    }
    a{
        text-decoration: none;
        color: #FFFFFF;
    }

    .btn {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        width: 200px;
        height: 55px;
        border: 1px solid rgb(8, 161, 196);
        border-radius: 30px;
    }
}</style>