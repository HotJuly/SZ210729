<template>
  <div id="app">
    <ul>
      <li v-for="(item,index) in arr" :key="index">
        <label>{{item}}</label>
        <input type="text">
      </li>
    </ul>
    <button @click="changeArr">修改</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      arr: [1,2,3,4,5],
    };
  },
  methods: {
    changeArr() {
      this.arr.splice(1,0,6);
    },
  },
};
</script>

<style></style>
