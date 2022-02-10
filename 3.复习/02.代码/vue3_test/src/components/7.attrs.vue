<template>
  <div class="hello">
    <h2>HelloWorld</h2>
    <button @click="clickHandler">+1</button>
  </div>
</template>

<script>
import {defineProps,useAttrs} from 'vue'
export default {
  name: 'HelloWorld'
}

</script>

<script setup>
  const props = defineProps(["a"]);
  console.log('props' , props);
  
  const attrs = useAttrs();
  console.log('attrs' , attrs);
</script>

<style scoped>
</style>
