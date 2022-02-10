<template>
  <div id="app">
    App
    <!-- <Home v-if="isShow"></Home>
    <About v-else></About> -->
    <router-view></router-view>
    <router-link to="/home">toHome</router-link>
    <!-- <router-link to="/about">toAbout</router-link> -->
    <!-- <div @click="clickHandler1">
      toHome
    </div> -->
    <div @click="clickHandler2">
      toAbout
    </div>
    <!-- <a href="http://www.baidu.com">toBaidu</a> -->
  </div>
</template>

<script>
// import Home from './components/Home.vue';
// import About from './components/About.vue';
export default {
  name: "App",
  methods:{
    clickHandler1(){
      // console.log('clickHandler',this.$router,this.$route)
      this.$router.push('/home')
    },
    clickHandler2(){
      // console.log('clickHandler',this.$router,this.$route)
      this.$router.push('/about')
    }
  }
};
</script>

<style></style>
