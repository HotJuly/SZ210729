<template>
  <div>
    <h1>App</h1>
    <HelloWorld ref="hello"/>
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
  // this.$refs.hello
  const hello = ref(null);
  onMounted(()=>{
    // 此处msg可以获取到,但是clickHandler获取不到
    console.log(hello.value.msg)
    console.log(hello.value.clickHandler)
  })
</script>

<style>
</style>
