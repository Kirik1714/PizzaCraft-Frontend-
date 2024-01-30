<script setup>
import Paginator from 'primevue/paginator';
import PizzaSkeleton from './PizzaSkeleton.vue';

import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import Filter from './Filter.vue';
import Pizza from './Pizza.vue'

const pizzaz = ref([])

const page = ref(0)
const totalCountPizzas = ref()
const selectedSorted = ref();
const isLoadingPizza = ref(true);
const filters = ref([
    { id: 1, name: 'Мясная' },
    { id: 2, name: 'Вегетарианская' },
    { id: 3, name: 'Морская' },
    { id: 4, name: 'Острая' },
    { id: 5, name: 'Белая' },
    { id: 6, name: 'По сезону' },
    { id: 7, name: 'Сладкая' },
    { id: 8, name: 'Все' },


]);
const selectedFilter = ref([filters.value[filters.value.length - 1].id]);
const changeFilter = (id) => {
    selectedFilter.value = [id];

}


const sortItems = ref([
    { id: 1, name: 'Возрастанию', code: 'asc' },
    { id: 2, name: 'Убыванию', code: 'desc' },

]);
const installSortedItem = (obj) => {
    selectedSorted.value = obj
}




const getPizzas = async () => {
    try {
        const { data } = await axios.post('http://localhost:8000/api/pizza', {
            'categories': selectedFilter.value,
            'sorted': selectedSorted.value?.code,
            'page': page.value + 1
        })
        pizzaz.value = data.data
        totalCountPizzas.value = data.total;
        isLoadingPizza.value = false;
    } catch (error) {
        console.log('Не удалочь получить пиццы', error)
    }
}

onMounted(() => {
    getPizzas();

})

watch([selectedFilter, selectedSorted, page], () => {
    getPizzas()

})

</script>

<template>
    <div class="container">
        <div class="container_filters">

            <Filter :filters="filters" :selectedFilter="selectedFilter" @installSortedItem="installSortedItem"
                :sortItems="sortItems" @changeFilter="changeFilter" />
        </div>

        <div class="container_main">
            <div class="container_main_title">Все пиццы</div>
            <div class="container_main_block">
                <template v-if="!isLoadingPizza">
                    <Pizza v-for="pizza in pizzaz" :key="pizza.id" :pizza="pizza" />
                </template>
                <template v-else>
                   <PizzaSkeleton v-for="i in 4" :key="i"/>
                </template>
            </div>
        </div>

        <div class="footer" v-if="!isLoadingPizza">
            <Paginator :rows="4" :totalRecords="totalCountPizzas" @page="page = $event.page">

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

