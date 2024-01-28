<script setup>
import Dropdown from 'primevue/dropdown';
import { ref } from "vue";


const selectedFilter = ref();
const selectedCity = ref();

const filters = ref([
    { id: 1, name: 'Все', isSelected: true },
    { id: 2, name: 'Мясная', isSelected: false },
    { id: 3, name: 'Морская', isSelected: false },
    { id: 4, name: 'Острая', isSelected: false },
    { id: 5, name: 'Белая', isSelected: false },
    { id: 6, name: 'Фруктовая', isSelected: false },
    { id: 7, name: 'По сезону', isSelected: false },
]);
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);

const changeFilter = (id) => {
  filters.value.map((item)=>{
    if(item.id === id){
        selectedFilter.value=item
        item.isSelected = true;
    }else{
        
        item.isSelected = false;
    }
    
  })
  
}

</script>

<template>
    <div class="container">
        <div class="container_block_filters">
            <div v-for="filter in filters" :key="filter.id"
                :class="{active: filter.isSelected,'filter_item': true} "
                @click="changeFilter(filter.id)"
                >
                {{ filter.name }}
      
            </div>

        </div>
        <div class="content_block_sort">
            Сортировка по
            <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City"
                class="w-full md:w-[14rem]" />

        </div>

    </div>
</template>



<style scoped lang="scss">
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;

    &_block_filters {
        gap: 10px;
        display: flex;
    }
}

.filter_item {
    padding: 15px;
    background-color: #F9F9F9;
    border-radius: 25px;


}
.active{
    background-color: rgb(208, 246, 255);
}


</style>
