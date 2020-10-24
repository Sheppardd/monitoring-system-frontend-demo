<template>
  
  <div class="background">

    <v-layout row wrap class="my-row">
      <v-flex md2 v-for="e in this.list" :key="e.id" class="px-5 py-2">
        <span>{{e.id}}</span>
      </v-flex>
    </v-layout>
    
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