<template>
  <div>
    <!-- <h1>姓名:{{obj2.name}}</h1>
    <h1>年龄:{{obj2.age}}</h1> -->
    <ul>
      <li v-for="item in arr2" :key="item">{{item}}</li>
    </ul>
    <button @click="clickHandler">公开年龄</button>
  </div>
</template>

<script>
import {ref,reactive} from 'vue';
export default {
  name: 'App',
}
</script>

<script setup>
  const  obj = {
    name:"小明"
  }

  const obj2 = reactive(obj)

  const arr = [1,2,3,4];

  const arr2 = reactive(arr);

  const clickHandler = ()=>{
    // 因为Vue2和Vue3的响应式原理不同,所以Vue3不需要$set和$delete方法
    // obj2.age = 18;
    // delete obj2.name

    arr2[1]=7;

    console.log(arr)
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
