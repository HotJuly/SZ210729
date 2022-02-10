<template>
  <div class="hello">
    <h2>HelloWorld</h2>
    <button @click="clickHandler">+1</button>
  </div>
</template>

<script>
import {defineProps,defineEmits} from 'vue'
export default {
  name: 'HelloWorld'
}

</script>

<script setup>
  const props = defineProps(["msg"]);
  // console.log(props)

  const emits = defineEmits();

  const clickHandler = ()=>{
    // console.log('clickHandler')
    emits("update:msg",124)
  }
</script>

<style scoped>
</style>
