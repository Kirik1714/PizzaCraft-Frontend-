<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
</script>

<template>
    <div class="container">

        <Skeleton shape="circle" size="14.4rem" class="container_img"></Skeleton>
        <Skeleton class="container_title"></Skeleton>


        <Skeleton width="100%" height="85px"></Skeleton>

        <div class="container_pizza_price_add">
            <Skeleton width="5rem" height="2.2rem" ></Skeleton>
            <Skeleton width="8rem" height="2.2rem"></Skeleton>
        </div>
    </div>
</template>
<style scoped lang="scss">
.container {
    width: 250px;
    height: 250px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 35px;

    &_title {
        height: 40px;
        font-size: 20px;
        margin-top: 11px;
        margin-bottom: 10px;

    }
    &_pizza_price_add {
        display: flex;
        font-size: 20px;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
        width: 100%;
    }
}
</style>