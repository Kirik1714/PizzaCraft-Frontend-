<script setup>
import { onMounted,ref ,watch, watchEffect} from 'vue';
import axios from 'axios';
import Filter from './Filter.vue';
import Pizza from './Pizza.vue'

const pizzaz=ref([])


const filters = ref([
    { id: 1, name: 'Мясная' },
    { id: 2, name: 'Морская' },
    { id: 3, name: 'Острая' },
    { id: 4, name: 'Белая'},
    { id: 5, name: 'Фруктовая'},
    { id: 6, name: 'По сезону'},
    
]);
const selectedFilter = ref([filters.value[0].id]);
const changeFilter = (id) => {
  selectedFilter.value = [id];
  
}

const selectedSorted = ref();
const sortItems = ref([
    { id: 1, name: 'Возрастанию', code: 'asc' },
    {  id: 2,  name: 'Убыванию', code: 'desc' },

]);
const installSortedItem=(obj)=>{
  selectedSorted.value=obj
}




const getPizzas = async() => {
    try {
        const {data}= await axios.post('http://localhost:8000/api/pizza',{
            'categories':selectedFilter.value,
            'sorted':selectedSorted.value?.code
        })
        pizzaz.value=data
    } catch (error) {
        console.log('Не удалочь получить пиццы', error)
    }
}

onMounted(() => {
   
    getPizzas()
})
watchEffect( ()=>{
 

      getPizzas()

})
</script>

<template>
    <div class="container">
        <div class="container_filters">

            <Filter :filters="filters" :selectedFilter="selectedFilter" @installSortedItem="installSortedItem" :sortItems="sortItems" @changeFilter="changeFilter" />
        </div>
        <div class="container_main">
            <div class="container_main_title">Все пиццы</div>
            <div class="container_main_block">
                <Pizza v-for="pizza in pizzaz" :key="pizza.id" :pizza="pizza"/>
            
            </div>
        </div>
      
        
    </div>
   
</template>

<style scoped  lang="scss">

.container{
    height: 100%;
    padding: 10px;
    &_main{
        font-size: 32px;
        margin-top:32px ;

        &_block{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 32px;
        }

    }
}
</style>

