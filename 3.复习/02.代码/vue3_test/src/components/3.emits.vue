<template>
  <div class="hello">
    <h2>HelloWorld</h2>
  </div>
</template>

<script>
import {defineEmits} from 'vue'
export default {
  name: 'HelloWorld'
}

</script>

<script setup>
  // const emits = defineEmits(["msgInput"]);
  const emits = defineEmits();
  emits('msgInput',111);
</script>

<style scoped>
</style>
