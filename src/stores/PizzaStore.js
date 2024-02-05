import { ref, computed } from "vue";
import axios from "axios";
import { defineStore } from "pinia";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    pizzaz: [],
    pizza: [],
    isLoadingPizza: true,
    totalCountPizzas: null,
  }),
  actions: {
    async getPizzas(selectedFilter, selectedSorted, page) {
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
    async getPizza(id) {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/pizza/${id}`);

        this.pizza = data;
        console.log(this.pizza);

      } catch (error) {
        console.log("Не удалочь получить пиццу", error);
      }
    },
  },
});
