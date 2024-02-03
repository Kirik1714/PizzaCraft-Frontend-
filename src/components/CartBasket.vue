<script setup>
import { useBasketStore } from '../stores/BasketStore';
import { defineProps } from 'vue';
const basketStore = useBasketStore();
const props = defineProps({
    pizza: Object,

})
console.log(props.pizza)
</script>

<template>
    <div class="container">
        <div class="container_main">
            <div class="main_pizza_info">
                <div class="pizza_content">

                    <div class="pizza_img"><img :src="props.pizza.img_url" alt="" class="miniPizza"></div>
                    <div class="pizza_description">
                        <div class="pizza_name">{{ props.pizza.name }}</div>
                        <div class="pizza_crust">
                            <div class="crust_type">{{ props.pizza.crust_type.name }}</div>
                            <div class="crust_diametor"> {{ props.pizza.crust_diameter.diameter }} см</div>

                        </div>

                    </div>
                </div>
                <div class="pizza_buttons_count">
                    <div class="button_minus " @click.prevent="basketStore.minusItemFromBasket(props.pizza)"><img
                            src="../assets/images/minus.svg" :class="{'btn':true,'btn_disable':props.pizza.count===1}" alt=""></div>
                    <div class="count">{{ props.pizza.count }}</div>
                    <div class="button_plus " @click.prevent="basketStore.addToBasket(props.pizza)"><img
                            src="../assets/images/add.svg" class="btn" alt=""></div>
                </div>
                <div class="pizza_price">
                    {{ props.pizza.price }} $
                </div>
                <div class="pizza_delete" @click.prevent="basketStore.removeFromBasket(props.pizza)">
                    <img src="../assets/images/delete.svg" alt="">
                </div>

            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">
.container {



    border-top: 1px solid #F4F4F4;

    &_main {
        margin-top: 35px;


        display: flex;
        width: 100%;

        .main_pizza_info {
            justify-content: space-evenly;
            align-items: center;
            display: flex;
            width: 100%;

            .pizza_content {
                display: flex;
                align-items: center;
                gap: 15px;
          

                .pizza_name{
                    width: 250px;
                }
                .miniPizza {
                    width: 80px;
                    height: 80px;
                }

            }

            .pizza_buttons_count {
                display: flex;
                align-content: center;
                gap: 5px;

                .count {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .button_minus,
                .button_plus {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 3px solid rgb(208, 246, 255);
                }

                .btn {
                    cursor: pointer;
                    width: 15px;
                    height: 15px;
                }
                .btn_disable{
                    pointer-events: none;
                    width: 15px;
                    height: 15px;
                    opacity: 0.5; // Добавьте этот стиль, чтобы уменьшить прозрачность для неактивной кнопки

                }
            }

            .pizza_price {
                font-family: 'Inter';
                font-size: 16px;
                font-weight: 700;
            }

            .pizza_delete {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 3px solid rgb(208, 246, 255);
            }
        }
    }

    .pizza_name {
        font-size: 16px;
        font-family: 'Inter';
        font-weight: 600;
        margin-bottom: 6px;

    }

    .pizza_crust {
        display: flex;
        gap: 5px;
        font-size: 14px;
        font-family: 'Inter';
        color: #B6B6B6;

    }


}</style>