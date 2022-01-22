<template>
  <div id="app">
    <!-- <HelloWorld v-model="msg" /> -->
    <HelloWorld :value="msg" @input="data=>msg=data" />
    <!-- <input type="text" v-model="msg"> -->
    <input type="text" :value="msg" @input="event=>msg=event.target.value">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  data() {
    return {
      msg:"123"
    }
  },
  components: {
    HelloWorld,
  },
};
</script>

<style></style>
