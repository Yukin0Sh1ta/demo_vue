<template>
  <input
    type="text"
    id="input"
    placeholder="想追的番"
    class="input"
    v-model="inputValue"
  >
  <button
    @click="add"
    class="submit"
    id="submit"
  >添加
  </button>

  <div class="grid-container">
    <div
      class="grid-item"
      v-for="(item, index) in items"
      :key="index"
    >
      <h3>{{ item.name }}</h3>
      <button
        @click="dele(index)"
        class="dele"
      >删除
      </button>

    </div>
  </div>

  <div>
    <RouterLink to="/login">
      <button>gotologin</button>
    </RouterLink>
    <RouterLink to="/person">
      <button>gotoperson</button>
    </RouterLink>
    <RouterLink to="/head">
      <button>gotohead</button>
    </RouterLink>
    <RouterLink to="/body">
      <button>gotobody</button>
    </RouterLink>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Head from "../components/Head.vue";

const numberOne = [1, 2, 3];
numberOne.forEach((number, index) => {
  console.log(number + "length:" + index);
  numberOne.push(number + 3);
});

const router = useRouter();

const inputValue = ref("");

function add() {
  items.value.push({ name: inputValue.value });
  console.log(inputValue.value);
  inputValue.value = "";
}

function dele(index) {
  items.value.splice(index, 1);
  console.log("删除完成");
}

const items = ref([{ name: "Item1" }, { name: "Item2" }, { name: "Item3" }]);
</script>

<style scoped>
.dele {
  width: 50px;
  height: 30px;
  color: #ffffff;
  background-color: gray;
  font-size: 15px;
  text-align: center;
  position: absolute;
  bottom: 10px;
  right: 10px;
  border-radius: 10px;
}

.submit {
  width: 50px;
  height: 50px;
  color: #ffffff;
  background-color: gray;
  border-radius: 0 10px 10px 0;
}

.head {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50px;
  margin: 15px;
}

.input {
  width: 65%;
  height: 50px;
  border-radius: 10px 0 0 10px;
  padding-left: 10px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 0px;
  row-gap: 70px;
  background-color: #ffffff;
  justify-items: center;
  width: 195vh;
}

.grid-item {
  background-color: #f0f0f0;
  color: rgb(0, 0, 0);
  text-align: center;
  border-radius: 10px;
  font-size: 18px;
  width: 290px;
  height: 200px;
  position: relative;
}

html,
body {
  width: 100%;
  height: 100%;
}

html {
  font-family: sans-serif;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -ms-overflow-style: scrollbar;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

body {
  margin: 0;
}
</style>
  