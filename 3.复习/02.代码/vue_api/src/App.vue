<template>
  <div id="app">
    <HelloWorld :fn="setName" />
    <button v-if="isShow" @click="toEdit">添加</button>
    <!-- <input ref="input666" v-else type="text" /> -->
    <!-- <div>{{doubleNum}}</div>
    <div>{{doubleNum}}</div>
    <div>{{doubleNum}}</div>
    <div>{{doubleNum}}</div>
    <div>{{doubleNum}}</div> -->
    <h1>{{obj.name}}</h1>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
// console.log('HelloWorld',HelloWorld)
export default {
  name: "App",
  data() {
    // 响应式:当属性值被修改的时候,页面要展示最新结果
    /*
      面试题:如何让一个数据不是响应式的?
      解决:
        1.不将数据放到data中
        2.如果必须放在data中
          -属性名以"_"或者"$"开头都不会被进行数据代理(但是页面上想要使用该属性就必须使用$data._属性名)
          -使用Object.freeze冻结某个对象,使得该对象所有属性都变成只读属性,从而失去响应式的特点
    
    */
    return {
      num:1,
      isShow: true,
      // obj:Object.freeze({
      //   name:"xiaoming"
      // }),
      // _obj:{
      //   name:"xiaoming"
      // }
      obj:{
        name:"xiaoming"
      }
    };
  },
  components: {
    HelloWorld,
  },
  methods: {
    toEdit() {
      // console.log(this.obj)

      //如果某个对象使用了Object.freeze实现冻结.想要解除冻结的方法
      // 使用...根据旧的对象生成一个全新的对象
      // this.obj={
      //   ...this.obj
      // }
      // this.obj.name = "laowang"
      // this.obj={
      //   ...this.obj,
      //   name:"laowang"
      // }

      // Vue.delete(this.obj,"name");
      // delete this.obj.name;
      // // setTimeout(()=>{
      // this.obj.name="laowang"
      // },1000)

      this.obj.name= 'laowang '
    },
    resetData(){
      Object.assign(this.$data,this.$options.data())
    },
    setName(name){
      this.obj.name = name;
    }
  },
  mounted() {
  },
  computed:{
    // 使用场景:如果你想使用一个数据,可是你手头没有,但是你可以通过data或者props计算得到,那么就是用computed
    // 计算属性虽然是个方法,但是使用起来和普通的data数据相同
    // 计算属性会监视函数体中使用到的响应式属性,如果响应式属性发生变化就会重新计算,如果没有发生变化就会复用之前的计算结果(有缓存)
    doubleNum(){
      console.log('doubleNum')
      return this.num*2;
    }
  },
  watch:{
    // obj(){
    //   console.log('obj change')
    // }
    obj:{
      handler(){
        console.log('obj change')
      },
      deep:true
    }
  }
};
</script>

<style></style>
