<script setup>
const props = defineProps({
  order: Object
});
</script>

<template>
  <div class="container">
    <div class="order-block">
      <div class="order-number">
        Номер заказа № <span class="order-number-value">{{ props.order.order_number }}</span>
      </div>

      <div class="order-description">
        <div v-for="pizza in props.order.pizzaz" :key="pizza.id" class="pizza-item">
          <div class="pizza-name">{{ pizza.name }}</div>
          <div class="pizza-details">
            Тесто: {{ pizza.crust_type.name }}, Диаметр: {{ pizza.crust_diameter.diameter }},
            Количество: {{ pizza.count }} шт, Цена: {{ pizza.price * pizza.count }}$
          </div>
        </div>
        <div class="total-price">Итого: {{ props.order.total_price }}$</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);


  .order-block {
    display: flex;
    flex-direction: column;

    .order-number {
    
      color: #333; 
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;

      .order-number-value {
        font-weight: 300;
        font-size: 16px;
        font-family: "Inter";
      }
    }

    .order-description {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .pizza-item {
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 10px;

        .pizza-name {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .pizza-details {
          font-size: 14px;
          color: #555;
        }
      }

      .total-price {
        font-size: 18px;
        font-weight: 600;
        margin-top: 10px;
      }
    }
  }
}
</style>
