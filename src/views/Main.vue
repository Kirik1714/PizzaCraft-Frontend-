<script setup>
import Paginator from 'primevue/paginator';
import PizzaSkeleton from '../components/PizzaSkeleton.vue';

import { onMounted, ref, watch,toRefs } from 'vue';
import {usePizzaStore} from '../stores/PizzaStore'
import {useFilterStore} from '../stores/FilterStore'

import Filter from '../components/Filter.vue';
import Pizza from '../components/Pizza.vue'


 
const pizzaStore = usePizzaStore();
const filterStore=useFilterStore();


const page = ref(0)


const { selectedFilter ,selectedSorted} = toRefs(filterStore);
onMounted(() => {
    pizzaStore.getPizzas(selectedFilter, selectedSorted, page);
    
})


watch([selectedFilter, selectedSorted, page], () => {
  
    pizzaStore.getPizzas(selectedFilter, selectedSorted, page)

})

</script>

<template>
    <div class="container">
        <div class="container_filters">

            <Filter />
        </div>

        <div class="container_main">
            <div class="container_main_title">Все пиццы</div>
            <div class="container_main_block">
                <template v-if="!pizzaStore.isLoadingPizza">
                    <Pizza v-for="pizza in pizzaStore.pizzaz" :key="pizza.id" :pizza="pizza" />
                </template>
                <template v-else>
                   <PizzaSkeleton v-for="i in 4" :key="i"/>
                </template>
            </div>
        </div>

        <div class="footer" v-if="!pizzaStore.isLoadingPizza">
            <Paginator :rows="4" :totalRecords="pizzaStore.totalCountPizzas" @page="page = $event.page+1">

            </Paginator>

        </div>




    </div>
</template>

<style scoped  lang="scss">
.container {
    height: 100%;
    padding: 10px;

    &_main {
        font-size: 32px;
        margin-top: 32px;

        &_block {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 32px;
        }

    }
}
</style>

