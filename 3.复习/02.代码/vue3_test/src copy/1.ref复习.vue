<template>
  <div>
    <h1>{{a}}</h1>
    <button @click="clickHandler">+1</button>
  </div>
</template>

<script>
import {ref} from 'vue';
export default {
  name: 'App',
  // setup(){
  //   console.log('setup')
  // },
  beforeCreate(){
    console.log('beforeCreate')
  }
}
</script>

<script setup>
// 当前该语法是语法糖,写在该script标签内的内容,相当于写在setup函数中
  // console.log('setup1')

  /*
    ref对象
      在js代码中使用,想要得到内部存放的数据,就必须使用.value语法才能读取到
      在template中使用,想要展示内部存放的数据,可以直接{{变量名}},
        注意:Vue在解析模版的时候,发现插值语法中是一个ref对象,会自动读取他的value属性进行展示

      ref的value属性是一个响应式属性
  */
  const a = ref(1)
  console.log(a.value)

  const clickHandler = ()=>{
    a.value = a.value + 1;
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
