<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { useRoute } from 'vue-router';
import CartInOrder from '@/components/CartInOrder.vue';

const userStore = useUserStore();
const route = useRoute();

onMounted(()=>{
    console.log(route.params.id);
    userStore.getOrders(route.params.id)
})
</script>


<template>
    <div class="conatainer">
        <div class="conatainer_info">
            Информация о заказах
        </div>
        <div class="conatainer_orders">
            <CartInOrder v-for="order in userStore.orders" :key="order.id" :order="order"></CartInOrder>
        </div>
    </div>
</template>


<style   lang="scss" >
.conatainer{

    padding:40px ;

    &_orders{
        padding-top:20px ;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    &_info{
        font-size: 28px;
        font-weight: 600;
        font-family: 'Inter';
    }

}

</style>