<template>
  <div id="Home">
    Home
  </div>
</template>

<script>import axios from "axios";


export default {
  name: 'Home',
  mounted(){
    this.$API.getData1()
    .then((data)=>{
      console.log('Home-getData1',data)
    });

    this.$API.getData2()
    .then((data)=>{
      console.log('Home-getData2',data)
    });

    this.$API.getData3()
    .then((data)=>{
      console.log('Home-getData3',data)
    });

    this.$API.getData4()
    .then((data)=>{
      console.log('Home-getData4',data)
    })
    .catch((error)=>{
      if(axios.isCancel(error)){
        // 如果能进入该判断,就说明当前请求报错原因是因为取消请求导致的
        return Promise.resolve();
      }else{
        // 如果能进入当前判断,就说明当前请求报错不是因为取消请求导致的
        return Promise.reject(error);
      }
    });
  }
}
</script>

<style>
</style>
