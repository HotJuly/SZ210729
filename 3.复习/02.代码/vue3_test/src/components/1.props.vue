<template>
  <div class="hello">
    <h2>HelloWorld</h2>
  </div>
</template>

<script>
import {defineProps} from 'vue'
export default {
  name: 'HelloWorld'
}

</script>

<script setup>
// setup标签相当于是setup函数,在他们的代码中不能使用this
  // console.log(this.msg)

  // 使用defineProps函数来声明需要接收哪些标签属性
  const props = defineProps(["msg"])
  console.log(props)
</script>

<style scoped>
</style>
