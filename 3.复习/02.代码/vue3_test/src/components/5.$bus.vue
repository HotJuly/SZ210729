<template>
  <div class="hello">
    <h2>HelloWorld</h2>
    <button @click="clickHandler">+1</button>
  </div>
</template>

<script>
import $bus from '../myBus';
export default {
  name: 'HelloWorld'
}

</script>

<script setup>
  const clickHandler = ()=>{
    $bus.emit('abc123',"haha")
  }
</script>

<style scoped>
</style>
