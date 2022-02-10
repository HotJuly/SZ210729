<template>
  <div class="hello">
    <h2>HelloWorld</h2>
    <button @click="clickHandler">+1</button>
  </div>
</template>

<script>
import {defineExpose} from 'vue'
export default {
  name: 'HelloWorld'
}

</script>

<script setup>
// 在Vue3中,为了保证子组件的数据不被滥用,所以子组件必须先通过defineExpose向外暴露数据,父组件才能通过ref来获取到该数据
  const msg = 123;
  const clickHandler = ()=>{
  }
  defineExpose({msg})
</script>

<style scoped>
</style>
