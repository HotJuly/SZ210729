<template>
  <div class="hello">
    <h1>
      Hello组件:{{obj2.name}}
    </h1>
    <button @click="changeName">changeName</button>
  </div>
</template>

<script>
import {ref} from 'vue';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(){
    
    // const obj = {
    //   name:"小明"
    // }

    // const obj2 = ref(obj);

    // const changeName = ()=>{
    //   obj2.value.name += "1";
    // }
  }
}

</script>

<script setup>
  const obj = {
    name:"小明"
  }

  const obj2 = ref(obj);

  const changeName = ()=>{
    obj2.value.name += "1";
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
