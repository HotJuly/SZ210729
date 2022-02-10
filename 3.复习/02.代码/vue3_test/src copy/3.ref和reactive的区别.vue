<template>
  <div>
    <h1>obj名字:{{obj.name}}</h1>
    <h1>obj2名字:{{obj2.name}}</h1>
    <button @click="clickHandler">修改</button>
  </div>
</template>

<script>
import {ref,reactive} from 'vue';
export default {
  name: 'App'
}
</script>

<script setup>
  /*
    面试题:ref和reactive的区别
      相同点:
        ref和reactive都可以将一个对象变成具有响应式的效果
      
      不同点:
        ref如果接收到一个全新的对象,该对象也能实现响应式的特点
        reactive会返回一个代理对象,存入某个变量中,但是如果对该变量进行重新赋值,很可能会失去响应式的特点
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
 let obj2 = reactive(obj);

  // const obj3 = ref(obj)

  // console.log(obj3)

 const clickHandler = ()=>{
  //  obj3.value.name += "1"

  // obj3.value = {
  //   name:"小明111"
  // }


// 此处相当于是将之前生成的代理对象丢弃了,放入了一个普通对象(没有响应式效果的对象)
  obj2 = {
    name:"小明111"
  }

  //  console.log(obj2)
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
