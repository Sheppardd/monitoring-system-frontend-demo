<template>
  
  <div class="background">

    <div class='row'>
      <div class="col-2" v-for="e in this.list" :key="e.id">
        <span>{{e.id}}</span>
      </div>
    </div>
    
  </div>

</template>

<script>


export default {

  name: 'ExpandedList',
  props: ['list'],

  data () {
    return {

    }
    
  },
}
</script>



<style src="../styles/tabs.css" scoped>

</style>