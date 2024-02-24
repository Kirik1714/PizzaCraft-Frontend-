<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';

import router from '../router';
import { useRoute } from 'vue-router'
import { usePizzaStore } from '../stores/PizzaStore';
import { useBasketStore } from '../stores/BasketStore';

const pizzaStore = usePizzaStore();
const basketStore = useBasketStore();

const route = useRoute();
interface CrustDiameter {
    id: number;
    diameter: number;
    created_at?: string | null;
    updated_at?: string | null;
    pivot?: {
        pizza_id: number;
        crust_diameter_id: number;
    };
    isInProduction?: boolean;
}

interface ICrustType {
    id: number;
    name: string;
    created_at?: string | null;
    updated_at?: string | null;
    pivot?: {
        pizza_id: number;
        crust_type_id: number;
    };
    isInProduction?: boolean;

}

interface IPizza {
    id: number;
    name: string;
    description: string;
    price: number;
    crust_diameter: CrustDiameter;
    crust_type: ICrustType;
    image_url: string;
    is_visible: number;
    created_at: string;
    updated_at: string;
    count: number;
}


const crustTypes = ref<ICrustType[]>([
    { id: 1, name: 'Тонкое' },
    { id: 2, name: 'Традиционное' }
]);
const pizzaSizes = ref<CrustDiameter[]>([
    { id: 1, diameter: 25 },
    { id: 2, diameter: 30 },
    { id: 3, diameter: 35 },
]);


const calcPrice = computed(() => {

    return pizzaStore.pizza.price * (activeCurstSize.value || 0);

})

const activeCurstType = ref<number | null>(null);
const activeCurstSize = ref<number | null>(null);


const changeCrustTypes = (id: number) => {
    activeCurstType.value = id
}

const changePizzaSize = (id: number) => {
    activeCurstSize.value = id
}
const localCrustTypesInProdunction = ref<ICrustType[]>([]);
const localPizzaSizesInProduction = ref<CrustDiameter[]>([]);

onMounted(async () => {
    const id: number = +route.params.id;
    await pizzaStore.getPizza(id);
    pizzaStore.isLoadingPizza = false
    activeCurstType.value = pizzaStore.pizza.crust_type.id || 1;
    activeCurstSize.value = pizzaStore.pizza.crust_diameter.id || 1;
    const pizzaSizesInProduction = pizzaSizes.value.map(pizzaSize => {
        return {
            ...pizzaSize,
            isInProduction: Array.isArray(pizzaStore.pizza?.crust_diameter) && pizzaStore.pizza?.crust_diameter.some(crustDiameter => crustDiameter.id === pizzaSize.id) || false,

        };
    });
    const crustTypesInProdunction = crustTypes.value.map(crustType => {
        return {
            ...crustType,
            isInProduction: Array.isArray(pizzaStore.pizza?.crust_type) &&
                pizzaStore.pizza?.crust_type.some(crustSize => crustSize.id === crustType.id) || false,

        }
    })
    localCrustTypesInProdunction.value = crustTypesInProdunction;
    localPizzaSizesInProduction.value = pizzaSizesInProduction




})
const addToBasket = (object: any) => {
    basketStore.addToBasket(object);

    setTimeout(() => {
        router.push({ name: 'Basket' })
    }, 500)

}


</script>

<template>
    <div class="container">
        <div class="" v-if="pizzaStore.isLoadingPizza">
            Waiting...
        </div>
        <div class="block_pizza" v-else>
            <div class="block_pizza_img">
                <img :src="pizzaStore.pizza.image_url" alt="Фото Пиццы">


            </div>
            <div class="block_pizza_description">
                <div class="pizza_title">{{ pizzaStore.pizza.name }}</div>
                <div class="pizza_info">{{ pizzaStore.pizza.description }}</div>

                <div class="pizza_options">
                    <div class="pizza_option types">
                        <div v-for="crustType in localCrustTypesInProdunction" :key="crustType.id"
                            :class="{ 'active': activeCurstType === crustType.id ? true : '', 'btn_type': true, 'btn_disabled': !crustType.isInProduction }"
                            @click.prevent="changeCrustTypes(crustType.id)">
                            {{ crustType.name }}
                        </div>
                    </div>
                    <div class="pizza_option size">
                        <div v-for="size in localPizzaSizesInProduction" :key="size.id"
                            :class="{ 'active': activeCurstSize === size.id ? true : '', 'btn_type': true, 'btn_disabled': !size.isInProduction }"
                            @click.prevent="changePizzaSize(size.id)">
                            {{ size.diameter }} см
                        </div>
                    </div>
                </div>
                <div class="pizza_add">

                    <div class="pizza_price">Цена: {{ calcPrice }}</div>
                    <div class="btn" @click.prevent="addToBasket({
                        id: pizzaStore.pizza.id,
                        name: pizzaStore.pizza.name,
                        image_url: pizzaStore.pizza.image_url,
                        crust_type: activeCurstType !== null ? crustTypes[activeCurstType - 1] : null,
                        crust_diameter: activeCurstSize !== null ? pizzaSizes[activeCurstSize - 1] : null,
                        price: calcPrice
                    })">Добавить</div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.container {
    display: flex;
    padding-top: 40px;

    .block_pizza {
        display: flex;

        .block_pizza_description {
            width: 800px;
            display: flex;
            justify-content: space-evenly;
            flex-direction: column;

            align-items: center;

            .pizza_title {
                font-family: 'Inter';
                font-weight: 700;
                font-size: 40px;
            }

            .pizza_info {
                margin-top: 40px;
                text-align: justify;
                font-family: 'Inter';
                font-weight: 400;
                font-size: 30px;

            }


            .pizza_options {
                width: 300px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                background-color: #f5f5f5;
                font-size: 14px;
                border-radius: 10px;

                .pizza_option {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    padding: 5px;

                    .btn_type {
                        padding: 10px;

                        border-radius: 10px;
                    }

                    .btn_disabled {
                        pointer-events: none;
                        opacity: 0.5;
                    }

                    .active {
                        background-color: #fff;
                        border-radius: 10px;
                    }
                }

            }

            .pizza_add {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 30%;

                .btn {
                    display: flex;
                    align-items: center;
                    gap: 3px;
                    border: 2px solid rgb(139, 230, 250);
                    border-radius: 15px;
                    font-size: 14px;
                    padding: 11px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;


                    &:hover {
                        border-color: rgb(20, 177, 212);
                        background-color: rgb(20, 177, 212);
                        color: #FFFFFF;
                    }
                }
            }

        }
    }

}
</style>