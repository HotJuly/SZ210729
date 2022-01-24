<template>
  <div id="app">
    <HelloWorld :a123="msg">
      <template #default>
        <A></A>
      </template>
      <template #B>
        <B></B>
      </template>
      <!-- <template v-slot:B>
        <B></B>
      </template> -->
      <!-- <template #C="prop123">
        <h1>我是{{prop123.msg}}插槽</h1>
      </template> -->
      <template #C="{msg}">
        <h1>我是{{msg}}插槽</h1>
      </template>
    </HelloWorld>
    <h1 ref="h123">{{msg}}</h1>
  </div>
</template>

<script>
import A from './components/A.vue'
import B from './components/B.vue'
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  data() {
    return {
      msg:"hello"
    }
  },
  components: {
    HelloWorld,
    A,
    B
  },
};
</script>

<style></style>
