<template>
  <div class="hello">
    <h2>HelloWorld</h2>
  
    <button @click="clickHandler">+1</button>
  </div>
</template>

<script>
import {useStore} from 'vuex'
export default {
  name: 'HelloWorld'
}

</script>

<script setup>
  const  store =useStore();
  store.commit('CHANGEMSG','我是修改之后的store数据')
  console.log(store.state.msg)
</script>

<style scoped>
</style>
