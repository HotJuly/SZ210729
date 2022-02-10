<template>
  <div>
    <h1>App</h1>
    <HelloWorld @msgInput="msgInput"/>
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

  const msgInput = (data)=>{
    console.log('msgInput',data)
  }
</script>

<style>
</style>
