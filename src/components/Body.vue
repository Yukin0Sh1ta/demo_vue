<template>

  <Head></Head>
  <div class="head"></div>
</template>
<script setup>
import Head from "./Head.vue";
</script>
<style scoped>
.head {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 1500px;
  height: 200px;
  background-image: url("../assets/img/background.jpg");
  background-size: 100% 550px;
  background-position: center;
}
</style>