<script setup>
import { ref,defineProps } from "vue";

const props = defineProps({
    pizza: Object

})


const crustTypes = ref([
  { id: 1, name: 'Тонкое' },
  { id: 2, name: 'Традиционное' }
]);


const crustTypesInProdunction =crustTypes.value.map(crustType =>{
  return {
    ...crustType,
    isInProduction : props.pizza.crust_type.some(crustSize=>crustSize.id===crustType.id),
     
  }
})  




const pizzaSizes = ref([
    { id: 1, diameter: 25 },
    { id: 2, diameter: 30 },
    { id: 3, diameter: 35 },
]);

const activeCurstType=ref(props.pizza.crust_type[0].id);
const activeCurstSize=ref(props.pizza.crust_diameter[0].id);

const pizzaSizesInProduction = pizzaSizes.value.map(pizzaSize => {
  return {
    ...pizzaSize,
    isInProduction: props.pizza.crust_diameter.some(crustDiameter => crustDiameter.id === pizzaSize.id),  
  };
});

const changeCrustTypes=(id)=>{
  activeCurstType.value=id
}

const changePizzaSize=(id)=>{
  activeCurstSize.value=id
}

</script>

<template>
  <div class="container">
    <div class="container_img"><img :src="props.pizza.image_url " alt=""></div>
    <div class="container_title">{{ props.pizza.name }}</div>
    <div class="container_pizza_options">
      <div class="pizza_option types">
        <div
          v-for="crustType in crustTypesInProdunction"
          :key="crustType.id"
          :class="{ 'active':  activeCurstType===crustType.id?true:'', 'btn_type': true, 'btn_disabled':!crustType.isInProduction}"
          @click="changeCrustTypes(crustType.id)"
        >
          {{ crustType.name }}
        </div>
      </div>

      <div class="pizza_option size">
        <div
          v-for="size in pizzaSizesInProduction"
          :key="size.id"
          :class="{ 'active': activeCurstSize===size.id?true:'', 'btn_type':true,'btn_disabled':!size.isInProduction }"
          @click="changePizzaSize(size.id)"

          
        >
          {{ size.diameter }} см
        </div>
      </div>
    </div>
    <div class="container_pizza_price_add">
      <div class="pizza_price">от {{ props.pizza.price }} $</div>
      <div class="pizza_add"><img src="../assets/images/add.svg" alt=""> Добавить</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
      .btn_disabled{
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

      img {
        width: 15px;
      }
    }
  }
}
</style>
