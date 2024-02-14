import { ref, computed,watch } from "vue";
import { defineStore } from "pinia";

export const useBasketStore = defineStore("basket", () => {
  const pizzazInBasket = ref([]);


  const pizzaInLocalStorage = localStorage.getItem('pizzazInBasket');
  if (pizzaInLocalStorage !== null) {
    pizzazInBasket.value = JSON.parse(pizzaInLocalStorage);
  }
  
  

  const addToBasket = (object) => {
    const existingPizza = pizzazInBasket.value.find(
      (pizza) =>
        pizza.id === object.id &&
        pizza.crust_diameter.diameter === object.crust_diameter.diameter &&
        pizza.crust_type.name === object.crust_type.name
    );

    if (!existingPizza) {
      pizzazInBasket.value.push({ ...object, count: 1 });
    } else {
      existingPizza.count++;
    }
  };
  const minusItemFromBasket = (object) => {
    const existingPizza = pizzazInBasket.value.find(
      (pizza) => pizza.id === object.id
    );
    if (existingPizza) {
      existingPizza.count--;

      if (existingPizza.count < 1) {
        existingPizza.count = 1;
      }
    }
  };
  const removeFromBasket = (object) => {
    const indexToRemove = pizzazInBasket.value.findIndex(
      (pizza) =>
        pizza.id === object.id &&
        pizza.crust_diameter.diameter === object.crust_diameter.diameter &&
        pizza.crust_type.name === object.crust_type.name
    );

    if (indexToRemove !== -1) {
      pizzazInBasket.value.splice(indexToRemove, 1);
    }
  };
  const clearBasket = () => {
    pizzazInBasket.value = [];
  };
  const countPizza = computed(() => {
    return pizzazInBasket.value?.reduce((acc, item) => acc + item.count, 0);
  });
  const getTotalPrice = computed(() => {
    return pizzazInBasket.value?.reduce(
      (acc, item) => acc + item.count * item.price,
      0
    ).toFixed(2);
  });
  watch(pizzazInBasket,(state)=>{

    localStorage.setItem('pizzazInBasket',JSON.stringify(state))
  },{
    deep:true
  })
  
  return {
    pizzazInBasket,
    addToBasket,
    minusItemFromBasket,
    removeFromBasket,
    clearBasket,
    countPizza,
    getTotalPrice,
  };
});
