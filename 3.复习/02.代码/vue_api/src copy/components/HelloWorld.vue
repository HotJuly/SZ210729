<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
// 该文件暴露的是一个配置对象,不是实例对象
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  a:3,
  mounted() {
    // try{
    // console.log('hello',c)
    // }catch(e){
    //   console.log(e)
    // }
    console.log("mounted")
  },
}
</script>

<style scoped>
</style>
