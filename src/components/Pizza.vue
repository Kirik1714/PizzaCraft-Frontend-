<script setup lang="ts">
import { ref, defineProps, computed } from "vue";
import { usePizzaStore } from '../stores/PizzaStore'
import { useBasketStore } from '../stores/BasketStore';

interface CrustDiameter { 
  id: number;
  diameter: number;
  created_at?: string | null;
  updated_at?: string | null;
  pivot?: {
    pizza_id: number;
    crust_diameter_id: number;
  };
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

const basketStore = useBasketStore();
const addedMessage = ref('');

const props = defineProps({
  pizza: Object as () => IPizza
})
const pizzaStore = usePizzaStore();

const crustTypes = ref<ICrustType[]>([
  { id: 1, name: 'Тонкое' },
  { id: 2, name: 'Традиционное' }
]);

const crustTypesInProduction = crustTypes.value.map(crustType => ({
  ...crustType,
  isInProduction: Array.isArray(props.pizza?.crust_type) &&
    props.pizza?.crust_type.some(crustSize => crustSize.id === crustType.id) || false,
}));

const pizzaSizes = ref<CrustDiameter[]>([
  { id: 1, diameter: 25 },
  { id: 2, diameter: 30 },
  { id: 3, diameter: 35 },
]);

const activeCrustType = ref(props.pizza?.crust_type?.id || 1); // Значение по умолчанию, если crust_type или id не существует
const activeCrustSize = ref(props.pizza?.crust_diameter?.id || 1); // Значение по умолчанию, если crust_diameter или id не существует


const pizzaSizesInProduction = pizzaSizes.value.map(pizzaSize => ({
  ...pizzaSize,
  isInProduction: Array.isArray(props.pizza?.crust_diameter) && props.pizza?.crust_diameter.some(crustDiameter => crustDiameter.id === pizzaSize.id)|| false,
}));

const changeCrustTypes = (id: number) => {
  activeCrustType.value = id;
}

const changePizzaSize = (id: number) => {
  activeCrustSize.value = id;
}

const calcPrice = computed(() => {
  const pizzaPrice: number = props.pizza!.price;
  const sizeValue: number = activeCrustSize.value || 0;
  return pizzaPrice * sizeValue;
});

const addToBasket = () => {
  if (!props.pizza || props.pizza.crust_type === undefined || props.pizza.crust_diameter === undefined) {
    // Обработка ошибки или игнорирование
    return;
  }
  const activeCrustTypeValue = activeCrustType.value;
  const activeCrustSizeValue = activeCrustSize.value;

  basketStore.addToBasket({
    id: props.pizza.id,
    name: props.pizza.name,
    description: props.pizza.description,
    price: props.pizza.price,
    crust_type: crustTypes.value[activeCrustTypeValue - 1],
    crust_diameter: pizzaSizes.value[activeCrustSizeValue - 1],
    image_url: props.pizza.image_url,
    is_visible: props.pizza.is_visible,
    created_at: props.pizza.created_at,
    updated_at: props.pizza.updated_at,
    count: props.pizza.count,
  });

  addedMessage.value = 'Добавлено';

  setTimeout(() => {
    addedMessage.value = '';
  }, 500);
};


</script>

<template>
  <div class="container">
    <RouterLink :to="{ name: 'pizza', params: { id: props.pizza?.id } }">
      <div class="container_img"><img :src="props.pizza?.image_url" alt=""></div>
      <div class="container_title">{{ props.pizza?.name }}</div>
      <div class="container_pizza_options">
        <div class="pizza_option types">
          <div v-for="crustType in crustTypesInProduction" :key="crustType.id"
            :class="{ 'active': activeCrustType === crustType.id ? true : '', 'btn_type': true, 'btn_disabled': !crustType.isInProduction }"
            @click.prevent="changeCrustTypes(crustType.id)">
            {{ crustType.name }}
          </div>
        </div>

        <div class="pizza_option size">
          <div v-for="size in pizzaSizesInProduction" :key="size.id"
            :class="{ 'active': activeCrustSize === size.id ? true : '', 'btn_type': true, 'btn_disabled': !size.isInProduction }"
            @click.prevent="changePizzaSize(size.id)">
            {{ size.diameter }} см
          </div>
        </div>
      </div>
      <div class="container_pizza_price_add">
        <div class="pizza_price">от {{ calcPrice }} $</div>
        <div class="pizza_add " @click.prevent="addToBasket">
          <img src="../assets/images/add.svg" alt=""> Добавить

          <div class="added_message" v-if="addedMessage">{{ addedMessage }}</div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: inherit;
}

.container {
  background-color: #FFFFFF;
  width: 250px;
  height: 250px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 35px;

  &_title {
    height: 40px;
    font-size: 20px;
    margin-top: 11px;
    margin-bottom: 10px;
  }

  &_pizza_options {
    width: 100%;
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

  &_pizza_price_add {
    display: flex;
    font-size: 20px;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    width: 100%;

    .pizza_add {
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

      .added_message {
        font-size: 20px;
        font-family: 'Inter';
        color: #000000;
        position: absolute;
        bottom: -30px;
        left: -3px;
      }

      img {
        width: 15px;
      }
    }
  }
}
</style>
