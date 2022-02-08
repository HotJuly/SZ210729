<template>
  <div class="hello">
    A
  </div>
</template>

<script>
// 该文件暴露的是一个配置对象,不是实例对象
export default {
  name: "A",
  data() {
    return {
    };
  },
  mounted(){
    // 绑定生命周期钩子函数
    console.log('A mounted');
  },
  destroyed() {
    console.log('A destroyed');
  },
  activated() {
    console.log('A activated');
  },
  deactivated() {
    console.log('A deactivated');
  },
};
</script>

<style scoped></style>
