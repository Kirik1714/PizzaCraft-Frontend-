<script setup>
import { onMounted,ref } from 'vue';
import axios from 'axios';
import Filter from './Filter.vue';
import Pizza from './Pizza.vue'

const pizzaz=ref([])

const getPizzas = async() => {
    try {
        const {data}= await axios.get('http://localhost:8000/api/pizza')
        pizzaz.value=data
    } catch (error) {
        console.log('Не удалочь получить пиццы', error)
    }
}

onMounted(() => {
    getPizzas()
})
</script>

<template>
    <div class="container">
        <div class="container_filters">

            <Filter/>
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

