import { ref, computed } from "vue";
import axios from "axios";
import { defineStore } from "pinia";

export const useFilterStore = defineStore("filter", {
  state: () => ({
    filters: [
      { id: 1, name: "Мясная" },
      { id: 2, name: "Вегетарианская" },
      { id: 3, name: "Морская" },
      { id: 4, name: "Острая" },
      { id: 5, name: "Белая" },
      { id: 6, name: "По сезону" },
      { id: 7, name: "Сладкая" },
      { id: 8, name: "Все" },
    ],
    sortItems: [
      { id: 1, name: "Возрастанию", code: "asc" },
      { id: 2, name: "Убыванию", code: "desc" },
    ],
    selectedFilter:[8],
    selectedSorted:null,
  }),
  actions: {
    changeFilter(id){
        this.selectedFilter =[id]
    },
    installSortedItem(obj){
        this.selectedSorted = obj
       
    }

  },
});
