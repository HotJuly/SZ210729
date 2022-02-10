<template>
  <div>
    <h1>App-{{msg}}</h1>
    <HelloWorld/>
  </div>
</template>

<script>
import $bus from './myBus';
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
  $bus.on("abc123",(data)=>{
    console.log("abc123",data)
  })
</script>

<style>
</style>
