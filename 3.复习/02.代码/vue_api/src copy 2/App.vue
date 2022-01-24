<template>
  <div id="app">
    <!-- <HelloWorld v-model="msg" /> -->
    <!-- <HelloWorld ref="hello123" :value="msg" a="1" b="2" c="3" @input="data=>msg=data" /> -->
    <!-- <HelloWorld :value.sync="msg" /> -->
    <HelloWorld :a123="msg" @update:a123 = "data=>msg=data"/>
    <!-- <input type="text" v-model="msg"> -->
    <!-- <input type="text" :value="msg" @input="event=>msg=event.target.value"> -->
    <h1 ref="h123">{{msg}}</h1>
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
  mounted(){
    // console.log(this.$el)
    // console.log(this.$children)
    // console.log(this.$refs.hello123)
    // this.$refs.hello123.testChild();
    this.$bus.$on('getMsg123',(data)=>{
      console.log('getMsg123',data)
    })
  },
  methods:{
    testApi(){
      console.log('testApi')
    }
  }
};
</script>

<style></style>
