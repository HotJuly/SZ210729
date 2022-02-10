<template>
  <div class="hello">
    <h2>HelloWorld</h2>
    <slot/>
    <slot name="header"/>
    <slot name="footer" msg="footer"/>
    
    <button @click="clickHandler">+1</button>
  </div>
</template>

<script>
import {} from 'vue'
export default {
  name: 'HelloWorld'
}

</script>

<script setup>
</script>

<style scoped>
</style>
