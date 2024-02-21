import { ref, computed } from "vue";
import axios from "axios";
import { defineStore } from "pinia";

interface Filter {
  id: number;
  name: string;
}

interface SortItem {
  id: number;
  name: string;
  code: string;
}

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
    ] as Filter[],
    sortItems: [
      { id: 1, name: "Возрастанию", code: "asc" }, 
      { id: 2, name: "Убыванию", code: "desc" },
    ] as SortItem[],
    selectedFilter:[1] as number[],
    selectedSorted: null as SortItem | null
  }),
  actions: {
    changeFilter(id:number):void{
        this.selectedFilter =[id]
    },
    installSortedItem(obj:SortItem | null){
        this.selectedSorted = obj
       
    }

  },
});
