<template>
  <div class="common-layout">
    <el-container>
      <el-header class="custom-header">
        <div class="person">
          <!-- :src="form.image" -->
          <el-avatar
            class="userHead"
            :size="70"
            src="src\assets\img\head.jpeg"
          />
          <el-text class="userName">{{ user.name }}</el-text>
          <input
            class="userSign"
            v-model="user.sign"
            autocomplete="off"
            placeholder="编辑个性签名"
          />
        </div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item>Processing Center</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from "vue";

const user = ref({
  image: "",
  name: "我是原神大王",
  sign: "",
});
</script>

<style scoped >
.custom-header {
  background-image: url("src/assets/img/background.jpg");
  background-size: 1300px 500px;
  background-position: center;
  height: 220px;
  color: white;
  display: flex;
  position: relative;
}
.common-layout {
  width: 1200px;
  margin: auto;
}
.userHead {
  position: absolute;
  top: 140px;
}
.userName {
  position: absolute;
  top: 140px;
  font-size: 20px;
  left: 110px;
  color: rgb(255, 255, 255);
}
.userSign {
  position: absolute;
  top: 180px;
  font-size: 13px;
  left: 110px;
  width: 700px;
  height: 20px;
  padding: 5px;
  color: rgb(255, 255, 255);
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid rgba(0, 0, 0, 0);
  transition: all 0.3s ease;
  border-radius: 5px;
}

.userSign:hover {
  background-color: rgba(211, 211, 211, 0.5);
  border: 1px solid;
}

.userSign:focus {
  color: rgb(90, 81, 81); /* 鼠标点击时字体变为黑色 */
  background-color: white;
  border: 1px;
}
.userSign:focus::placeholder {
  color: rgb(121, 115, 115);
}
.userSign::placeholder {
  color: rgb(238, 224, 224);
}
</style>