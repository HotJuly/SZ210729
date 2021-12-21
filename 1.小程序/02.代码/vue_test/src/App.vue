<template>
  <div id="app">
    <button v-if="isShow" @click="handleClick">添加</button>
    <input ref="input111" v-else type="text">
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      isShow:true
    }
  },
  methods:{
    handleClick(){
      this.isShow=false;
      console.log(this.isShow)

      this.$nextTick(()=>{
        this.$refs.input111.focus();
      })

      // debugger
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
