<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  a:2,
  mounted(){
    // 此处this是当前组件的实例对象
    // 如果需要使用到配置对象的内容,需要通过this.$options找到配置对象
    console.log('a',this.$options.a)
  }
}
</script>

<style>
</style>
