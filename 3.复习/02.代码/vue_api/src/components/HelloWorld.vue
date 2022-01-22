<template>
  <div class="hello">
    {{ msg666 }}

    <button @click="changeMsg">修改</button>
    <el-image
      ref="img123"
      style="width: 100px; height: 100px"
      :src="url"
      :preview-src-list="srcList"
    >
    </el-image>
  </div>
</template>

<script>
// 该文件暴露的是一个配置对象,不是实例对象
export default {
  name: "HelloWorld",
  data() {
    return {
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ],
    };
  },
  props: ["value", "msg666","a"],
  model: {
    prop: "msg666",
    event: "input667788",
  },
  methods: {
    changeMsg() {
      // this.value+="1"
      // this.$emit("input667788", 333333);
      // console.log(this.$refs.img123)
      this.$refs.img123.clickHandler();
    },
    testChild() {
      console.log("testChild");
    },
  },
  mounted() {
    // this.$parent相当于是父组件代码中的this
    // console.log(this.$parent.msg)
    // this.$parent.testApi();
    // console.log(this.$root.msg1)
    // console.log(this.$attrs)
    console.log(this.$listeners)
  },
};
</script>

<style scoped></style>
