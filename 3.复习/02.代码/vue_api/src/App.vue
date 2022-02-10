<template>
  <div id="app">
    App
    <!-- <h1>姓名:{{obj.name}}</h1>
    <h1>年龄:{{obj.age}}</h1> -->
    <ul>
      <li v-for="item in arr" :key="item">{{item}}</li>
    </ul>
    <button @click="clickHandler">公开</button>
  </div>
</template>

<script>import Vue from "vue";

export default {
  name: "App",
  data(){
    return {
      obj:{
        name:"小明"
      },
      arr:[1,2,3,4]
    }
  },
  methods:{
    clickHandler(){

      // 如此添加属性,添加的属性不会是一个响应式属性,页面不会展示最新效果
      // this.obj.age = 18
      // this.$set(this.obj,"age",18)


//    Vue2中给一个响应式对象添加或者删除属性,不会导致页面的重新渲染(没有响应式效果)
      // delete this.obj.name
      // this.$delete(this.obj,"name")
      // console.log('clickHandler',this.obj);


//    Vue2中,没有将数组的下标进行数据劫持,也就是说没有响应式的效果
// Vue2不会劫持数组的下标,因为尤大大认为数组的下标劫持很浪费性能,而且使用次数很少
      // this.arr[1] = 7;
      this.arr.splice(1,1,7)
    }
  }

};
</script>

<style></style>
