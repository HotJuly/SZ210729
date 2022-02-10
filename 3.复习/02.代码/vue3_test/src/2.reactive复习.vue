<template>
  <div>
    <h1>obj名字:{{obj.name}}</h1>
    <h1>obj2名字:{{obj2.name}}</h1>
    <button @click="clickHandler">修改</button>
  </div>
</template>

<script>
import {reactive} from 'vue';
export default {
  name: 'App'
}
</script>

<script setup>
// 当前该语法是语法糖,写在该script标签内的内容,相当于写在setup函数中
// 在setup标签中声明的变量,在模版中都可以访问
  // console.log('setup1')

  /*
    reactive对象
      在使用该方法的过程中,一共存在两个对象,一个成为代理对象,一个成为源数据对象(元对象)
      使用reactive函数,可以返回一个代理对象
  
      开发者对代理对象做的任何事情,元对象也会受到相同的效果
      如果操作代理对象内部的某个子对象,也具有响应式效果
      注意:操作代理对象可以实现响应式效果,但是操作元对象是没有响应式效果的,所以开发中不要操作元对象
      
  */

//  此处的obj就是元对象
 const obj = {
   name:"小明",
   age:18,
   wife:{
    name:"小红",
    age:28,
   }
 }

// 此处的obj2就是reactive返回得到的代理对象
 const obj2 = reactive(obj);

 const clickHandler = ()=>{
   obj2.name += "1"

   console.log(obj2)
 }

//  console.log(obj,obj2)
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
