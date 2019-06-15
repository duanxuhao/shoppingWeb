<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Contact v-bind:number="number" v-on:incre="increment" v-on:decre="decrement"></Contact>
    <p>parent:{{number}}</p>
  </div>
</template>

<script>
import Contact from "./Contact"
export default {
  name: 'HelloWorld',
  data () {
    return {
      number:10,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    Contact
  },
  methods:{
    increment(){
      this.number++;
    },
    decrement(){
      this.number--;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
</style>
