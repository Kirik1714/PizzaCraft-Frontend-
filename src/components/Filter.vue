<script setup>
import Dropdown from 'primevue/dropdown';
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
    filters: Array,
    sortItems: Array,
    selectedFilter: Array
});

const localSortItem=ref()

const emit = defineEmits(['changeFilter', 'installSortedItem']);

watch(localSortItem, ()=>{
   
  emit('installSortedItem', localSortItem.value)
});
</script>

<template>
    <div class="container">
        <div class="container_block_filters">
            <div v-for="filter in props.filters" :key="filter.id"
                :class="{ active: filter.id === props.selectedFilter[0], 'filter_item': true }"
                @click="emit('changeFilter', filter.id)">
                {{ filter.name }}
            </div>
        </div>
        <div class="content_block_sort">
            Сортировка по
            <Dropdown v-model="localSortItem" :options="props.sortItems" optionLabel="name" placeholder="Сортировать"
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

.active {
    background-color: rgb(208, 246, 255);
}
</style>
