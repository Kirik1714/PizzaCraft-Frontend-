import axios from "axios";
import { Ref, computed } from "vue";
import { defineStore ,} from "pinia";


interface CrustDiameter {
  id: number;
  diameter: number;
  created_at: string | null;
  updated_at: string | null;
  pivot: {
    pizza_id: number;
    crust_diameter_id: number;
  };
}


interface CrustType {
  id: number;
  name: string;
  created_at: string | null;
  updated_at: string | null;
  pivot: {
    pizza_id: number;
    crust_type_id: number;
  };
}

interface IPizza {
  id: number;
  name: string;
  description: string;
  price: string;
  crust_diameter: CrustDiameter; 
  crust_type: CrustType;
  image_url: string;
  is_visible: number;
  created_at: string;
  updated_at: string;
  
}

interface SortItem {
  id: number;
  name: string;
  code: string;
}



export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    pizzaz: [] as IPizza[],
    pizza: [] as IPizza[],
    isLoadingPizza: true as boolean,
    totalCountPizzas: null as number | null,
  }),
  actions: {
    async getPizzas(selectedFilter:any, selectedSorted: Ref<SortItem | null>, page: Ref<number>) {
   
      // console.log(selectedFilter.value, selectedSorted.value, page.value);
      
      try {
        const { data } = await axios.post("http://localhost:8000/api/pizza", {
          categories: selectedFilter.value,
          sorted: selectedSorted.value?.code,
          page: page.value,
        });
        this.pizzaz = data.data;
        this.totalCountPizzas = data.total;
        this.isLoadingPizza = false;
      } catch (error) {
        console.log("Не удалочь получить пиццы", error);
      }
    },
    async getPizza(id: number) {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/pizza/${id}`);

        this.pizza = data;

      } catch (error) {
        console.log("Не удалочь получить пиццу", error);
      }
    },
  },
});
