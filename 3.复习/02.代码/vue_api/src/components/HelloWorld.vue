<template>
  <div class="hello">
    <!-- {{ a123 }} -->

    <button @click="changeMsg">修改</button>
    <!-- <el-image
      ref="img123"
      style="width: 100px; height: 100px"
      :src="url"
      :preview-src-list="srcList"
    >
    </el-image> -->

    <h1>{{obj.age}}</h1>
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
      obj:{
        age:18
      }
    };
  },
  props: ["a123", "msg666","a"],
  model: {
    prop: "msg666",
    event: "input667788",
  },
  methods: {
    changeMsg() {
      // this.value+="1"
      // this.$emit("input667788", 333333);
      // console.log(this.$refs.img123)
      // this.$refs.img123.clickHandler();

      // this.$emit("update:a123",999)
      // this.$bus.$emit('getMsg123',"我是子组件传递的数据")

      // console.log(1)
      // this.$destroy();
      // console.log(2)

      // this.obj.age=19
      // console.log(this.obj.age)
    },
    testChild() {
      // console.log("testChild");
    },
  },
  mounted() {
      this.$destroy();
    // this.$parent相当于是父组件代码中的this
    // console.log(this.$parent.msg)
    // this.$parent.testApi();
    // console.log(this.$root.msg1)
    // console.log(this.$attrs)
    // console.log(this.$listeners)
    // this.obj.age=18;
    // console.log(this.obj)
    // this.$forceUpdate();
  },
};
</script>

<style scoped></style>
