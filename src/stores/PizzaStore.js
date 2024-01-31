import { ref, computed } from 'vue'
import axios from 'axios';
import { defineStore } from 'pinia'

export const usePizzaStore = defineStore('pizza',  {
    
  state: () => ({
      pizzaz:[],
      isLoadingPizza:true,
      totalCountPizzas:null,
  }),
  actions:{
    async getPizzas(selectedFilter,selectedSorted,page){
        try {
            const { data } = await axios.post('http://localhost:8000/api/pizza', {
                'categories': selectedFilter.value,
                'sorted': selectedSorted.value?.code,
                'page': page.value 
            })
          this.pizzaz=data.data
          this.totalCountPizzas = data.total;
          this.isLoadingPizza=false
        } catch (error) {
            console.log('Не удалочь получить пиццы', error)
        }
    }
  },


   


});
