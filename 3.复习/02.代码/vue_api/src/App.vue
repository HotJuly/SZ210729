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
};
</script>

<style></style>
