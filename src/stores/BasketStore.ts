import { ref, computed,watch,Ref } from "vue";
import { defineStore } from "pinia";

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


interface CrustType {
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
  crust_type: CrustType;
  image_url: string;
  is_visible: number;
  created_at: string;
  updated_at: string;
  count: number;
}
interface BasketStore {
  pizzazInBasket: Ref<IPizza[]>;
  addToBasket: (object: IPizza) => void;
  minusItemFromBasket: (object: IPizza) => void;
  removeFromBasket: (object: IPizza) => void;
  clearBasket: () => void;
  countPizza: Ref<number>;
  getTotalPrice: Ref<string>;
}

export const useBasketStore = defineStore("basket", () => {
  const pizzazInBasket = ref<IPizza[]>([]);


  const pizzaInLocalStorage = localStorage.getItem('pizzazInBasket');
  if (pizzaInLocalStorage !== null) {
    pizzazInBasket.value = JSON.parse(pizzaInLocalStorage);
  }
  
  

  const addToBasket = (object:IPizza ):void => {
    const existingPizza = pizzazInBasket.value.find(
      (pizza:IPizza) =>
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
  const minusItemFromBasket = (object: IPizza):void => {
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
  const removeFromBasket = (object: IPizza):void => {
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
  
    const totalPrice = pizzazInBasket.value?.reduce(
      (acc, item) => acc + item.count * item.price,
      0
    );
    

  return totalPrice !== undefined ? totalPrice.toFixed(2) : '0.00';
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
