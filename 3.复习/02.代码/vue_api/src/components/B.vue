<template>
  <div class="hello">
    B
  </div>
</template>

<script>
// 该文件暴露的是一个配置对象,不是实例对象
export default {
  name: "B",
  data() {
    return {
    };
  },
  mounted(){
    console.log('B mounted');
  },
  destroyed() {
    console.log('B destroyed');
  },
  activated() {
    console.log('B activated');
  },
  deactivated() {
    console.log('B deactivated');
  },
};
</script>

<style scoped></style>
