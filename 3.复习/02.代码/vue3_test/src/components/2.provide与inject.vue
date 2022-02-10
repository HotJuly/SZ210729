<template>
  <div class="hello">
    <h2>HelloWorld</h2>
  </div>
</template>

<script>
import {inject} from 'vue'
export default {
  name: 'HelloWorld'
}

</script>

<script setup>
// 子组件通过inject函数可以声明需要接收的数据
// inject可以传入数组或者字符串,但是一次只能接收一个provide暴露的数据
  const value1 = inject("value1");
  const value2 = inject("value2");
  console.log(value1,value2)
</script>

<style scoped>
</style>
