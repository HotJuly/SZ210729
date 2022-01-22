<template>
  <div class="hello">
    {{msg666}}

    <button @click="changeMsg">修改</button>
  </div>
</template>

<script>
// 该文件暴露的是一个配置对象,不是实例对象
export default {
  name: 'HelloWorld',
  props:["value","msg666"],
  model:{
    prop:"msg666",
    event:"input667788"
  },
  methods:{
    changeMsg(){
      // this.value+="1"
      this.$emit('input667788',333333)
    }
  }
}
</script>

<style scoped>
</style>
