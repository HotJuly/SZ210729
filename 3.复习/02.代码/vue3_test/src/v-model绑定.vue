<template>
  <div>
    <h1>App-{{msg}}</h1>
    <HelloWorld v-model:msg="msg"/>
  </div>
</template>

<script>
import {ref} from 'vue';
import HelloWorld from './components/HelloWorld.vue';
export default {
  name: 'App',
  components:{
    HelloWorld
  }
}
</script>

<script setup>

  const  msg = ref(123)

</script>

<style>
</style>
