<template>
  <div class="hello">
    <h1>{{ obj.msg }}</h1>
    <!-- <h1 @click="changeName">点我修改父组件的name属性</h1> -->
  </div>
</template>

<script>
// 该文件暴露的是一个配置对象,不是实例对象
export default {
  name: 'HelloWorld',
  // props:["msg"],
  // props:{
  //   msg:String
  // },
  props:{
    fn:Function
  },
  inject:["obj"],
  a:3,
  mounted() {
    // try{
    // console.log('hello',c)
    // }catch(e){
    //   console.log(e)
    // }
    console.log("mounted",this.obj.msg)
  },
  methods:{
    changeName(){
      /*
        Vue中methods函数的this一定是当前组件实例对象
          所以changeName函数中的this是helloworld组件实例,
          但是fn函数是在父组件的methods声明的,所以fn函数的this一定是父组件的实例对象

          Vue中的methods的函数都会被强行使用bind改变this指向,变成当前组件实例对象
      */
      this.fn("老王666")
    }
  }
}
</script>

<style scoped>
</style>
