<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Main from './components/Main.vue';
</script>

<template>
  <div class="main-wrapper">
    <div class="main-content">
      <div class="header">

        <Header />
      </div>
      <Main />

      <div class="content">
        <RouterView />
      </div>

    </div>
  </div>
</template>

<style scoped>
.main-wrapper {
  width: 100%;
  

}

.main-content {
  width: 90%;
  margin: 30px auto 20px;
  min-height: 100vh;
  background-color: #FFFFFF;
  padding-top: 30px;
  padding-left: 70px;
  padding-right: 33px;
  border-radius: 10px;
}
</style>
