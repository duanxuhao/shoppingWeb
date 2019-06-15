<template>
    <div>
        <button @click="increment">+</button>
        <button v-on:click="decrement">-</button>
        <p><span>{{number}}</span></p>
    </div>
</template>
<style>

</style>
<script>
export default {
    props:["number"],
    data(){
        return{
            number:0
        }    
    },
   methods:{
       increment(){
           this.$emit("incre");
        //    this.number++;
       },
       decrement(){
           this.$emit("decre");
        //    this.number--;
       }
    }

}
</script>
