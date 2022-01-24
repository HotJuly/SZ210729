<template>
  <div class="hello">
    {{ a123 }}

    <button @click="changeMsg">修改</button>

    <!-- v-show是通过css来控制元素的显示隐藏
    v-if是通过控制js是否解析元素来控制显示隐藏
    keep-alive是通过将组件实例对象保留起来,当有需要使用的时候,再拿来使用,来控制元素的显示隐藏 -->
    <!-- <keep-alive :max="2">
      <A v-if="isShow"></A>
      <B v-else></B>
    </keep-alive> -->
    <!-- <component :is="showComponent" msg="123"></component> -->

    <slot></slot>
    <slot name="B"></slot>
    <slot name="C" msg="footer"></slot>

  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      isShow:true,
      // showComponent:A
    };
  },
  props: ["a123"],
  // components:{
  //   A,
  //   B
  // },
  methods:{
    changeMsg(){
      this.isShow=!this.isShow
      // this.showComponent=B;
    }
  }
};
</script>

<style scoped></style>
