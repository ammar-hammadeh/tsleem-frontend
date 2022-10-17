<template>
  <div>
    tanplate  test : 
    <h1>{{sara}}</h1>
  </div>
</template>
<script>
export default {
  name: "test",
  props:['name'],
   data() {
    return {
      sara : ''
    }
   },
   methods: {
     
   },
    created(){
     console.log('created title in')
   },
   mounted(){
     console.log('title in')
     this.sara= this.name
   }
}
</script>