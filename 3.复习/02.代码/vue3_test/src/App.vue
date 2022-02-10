<template>
  <div>
    <!-- <h1>obj名字:{{obj.name}}</h1> -->
    <!-- <h1>obj2名字:{{obj2.name}}</h1>
    <h1>年龄:{{age}}</h1>
    <button @click="clickHandler">修改</button> -->
    <HelloWorld/>
    <HelloWorld/>
    <HelloWorld/>
    <HelloWorld/>
    <HelloWorld/>
    <HelloWorld/>
  </div>
</template>

<script>
import {ref,reactive} from 'vue';
import HelloWorld from './components/HelloWorld';
export default {
  name: 'App',
  components:{
    HelloWorld
  }
  // data(){
  //   return {
  //     obj2:{
  //       name:"小王",
  //     },
  //     age:18
  //   }
  // },
  // setup(){
  //   const obj2={
  //     name:"小绿"
  //   }
  //   return{
  //     obj2
  //   }
  // },
  // watch:{
  //   obj2(){

  //   },
  //   a(){

  //   },
  //   b(){
      
  //   },
  //   c(){
      
  //   }
  // }
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
