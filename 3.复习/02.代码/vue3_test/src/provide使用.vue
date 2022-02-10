<template>
  <div>
    <h1>App</h1>
    <HelloWorld/>
  </div>
</template>

<script>
import {ref,provide} from 'vue';
import HelloWorld from './components/HelloWorld.vue';
export default {
  name: 'App',
  components:{
    HelloWorld
  }
}
</script>

<script setup>

  const msg = ref("我是App的数据");

// 祖先组件通过provide函数,向后代组件暴露部分数据
  provide('value1',123);
  provide('value2',234);
</script>

<style>
</style>
