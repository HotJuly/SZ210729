<template>
  <div id="app">
    <ul>
      <li v-for="item in arr" :key="item.name">
        {{ item.name }}-{{ item.age }}
      </li>
    </ul>
    <button @click="changeArr">修改</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      arr: [
        {
          name: "小明1",
          age: 23,
        },
        {
          name: "小明2",
          age: 24,
        },
        {
          name: "小明3",
          age: 25,
        },
      ],
    };
  },
  methods: {
    changeArr() {
      // this.arr[1] = {
      //   name: "小明4",
      //   age: 44,
      // };

      // this.arr.splice(1,1,{
      //   name: "小明4",
      //   age: 44,
      // })

      // console.log(this.arr)

      this.arr[0].name="小明666"
    },
  },
  // beforeCreate(){
  //   // 此处可以看到当前组件实例对象this,但是无法看到$data,arr等属性,$el也没有值
  //   console.log('beforeCreate',this,this.$data,this.arr,this.$el)
  // },
  // created(){
  //   // 此处可以看到当前组件实例对象this$data,arr等属性,$el也没有值
  //   console.log('created',this,this.$data,this.arr,this.$el)
  // },
  // beforeMount(){
  //   // 此处可以看到当前组件实例对象this$data,arr等属性,$el也没有值
  //   console.log('beforeMount',this,this.$data,this.arr,this.$el)
  // },
  // mounted(){
  //   // 此处可以看到当前组件实例对象this$data,arr,$el
  //   console.log('mounted',this,this.$data,this.arr,this.$el)
  // }
  // beforeMount(){
  //   console.log('beforeMount',this.$vnode,this._vnode)
  // },
  // mounted(){
  //   console.log('mounted',this.$vnode,this._vnode)
  // }
  beforeCreate(){
    console.log('beforeCreate',this.$options)
  },
  created(){
    console.log('created',this.$options)
  },
};
</script>

<style></style>
