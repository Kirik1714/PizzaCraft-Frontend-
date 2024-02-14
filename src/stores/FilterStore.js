import { ref, computed } from "vue";
import axios from "axios";
import { defineStore } from "pinia";

export const useFilterStore = defineStore("filter", {
  state: () => ({
    filters: [
      { id: 1, name: "Все" },
      { id: 2, name: "Острая" },
      { id: 3, name: "Вегетарианская" },
      { id: 4, name: "Сладкая" },
      { id: 5, name: "Морская" },
      { id: 6, name: "Белая" },
      { id: 7, name: "Мясная" },
    
    ],
    sortItems: [
      { id: 1, name: "Возрастанию", code: "asc" }, 
      { id: 2, name: "Убыванию", code: "desc" },
    ],
    selectedFilter:[1],
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
