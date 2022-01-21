<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button v-if="isShow" @click="toEdit">添加</button>
    <!-- <input ref="input666" v-else type="text" /> -->
    <div>{{obj.name}}</div>
  </div>
</template>

<script>
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";
// console.log('HelloWorld',HelloWorld)
export default {
  name: "App",
  data() {
    return {
      isShow: true,
      obj:{
        name:"xiaoming"
      }
    };
  },
  components: {
    HelloWorld,
  },
  a: 2,
  methods: {
    toEdit() {
      /*
        Vue更新数据是同步更新还是异步更新?
          同步更新,只要更新了data数据,下一行代码一定能拿到最新数据
        
        Vue更新视图是同步更新还是异步更新?
          异步更新
      */

      // this.$nextTick(()=>{
      //   this.$refs.input666.focus();
      // })
      // console.log('this.isShow1',this.isShow)
      // 也就是说更新数据会使用到nextTick????
      // this.isShow = false;
      // console.log('this.isShow2',this.isShow)
      // debugger

      // 需求:当用户点击添加按钮时,自动切换展示input框,并自动获取焦点
      // this.$nextTick(()=>{
      //   // console.log(this.$refs.input666)
      //   // 在nextTick可以获取到当前最新的DOM更新结果
      //   this.$refs.input666.focus();
      // })



      // this.$nextTick(() => {
      //   console.log(7, "nextTick7");
      // });

      // setTimeout(() => {
      //   console.log(1, "setTimeout");
      // }, 0);

      // Promise.resolve().then(() => {
      //   console.log(2, "then1");
      // });

      // this.$nextTick(() => {
      //   console.log(3, "nextTick1");
      // });

      // Promise.resolve().then(() => {
      //   console.log(4, "then2");
      // });

      // this.$nextTick(() => {
      //   console.log(5, "nextTick2");
      // });

      // console.log(6, "主线程代码");

      console.log('delete之前',this.obj.name)
      // delete this.obj.name
      Vue.delete(this.obj,"name")
      console.log('delete之后',this.obj)
    },
  },
  mounted() {
    // 此处this是当前组件的实例对象
    // 如果需要使用到配置对象的内容,需要通过this.$options找到配置对象
    // console.log('a',this.$options.a)
    /*
      nextTick
        在js中,nextTick是一个微任务,其实是通过.then实现的(浏览器中,只有一个微任务队列)
    */
    // setTimeout(()=>{
    //   console.log(1,'setTimeout');
    // },0)
    // Promise.resolve().then(()=>{
    //   console.log(2,'then1');
    // })
    // this.$nextTick(()=>{
    //   console.log(3,'nextTick1');
    // })
    // Promise.resolve().then(()=>{
    //   console.log(4,'then2');
    // })
    // this.$nextTick(()=>{
    //   console.log(5,'nextTick2');
    // })
    // console.log(6,"主线程代码")
  },
};
</script>

<style></style>
