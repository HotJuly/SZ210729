<template>
  <div>
    <h1>App</h1>
    <HelloWorld>
      <template v-slot:default>
        <h2>我是默认插槽</h2>
      </template>
      <template #header>
        <h2>我是具名插槽</h2>
      </template>
      <template #footer="props">
        <h2>我是{{props.msg}}插槽</h2>
      </template>
    </HelloWorld>
  </div>
</template>

<script>
import {ref,onMounted} from 'vue';
import HelloWorld from './components/HelloWorld.vue';
export default {
  name: 'App',
  components:{
    HelloWorld
  }
}
</script>

<script setup>
</script>

<style>
</style>
