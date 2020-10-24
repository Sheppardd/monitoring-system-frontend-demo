<template>
  
  <div class="background">

    <div class="row">
      <div class="center-div pt-4">
        <h2 class="hd-gray">Introduce the ID of the new area</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-6 center-div">
        <v-text-field v-model="id" label="zone ID" :counter='10' required/>
      </div>
    </div>

    <div class='row top-margin-10'>
      <div class='center-div'>
        <v-btn class="mr-4" @click="$emit('close')">Cancel</v-btn>
        <v-btn  @click="createTrolley()">Create</v-btn>
      </div>
    </div>
    

  </div>

</template>

<script>

export default {

  name: 'AddTrolley',

  data () {
    return {

      id: null
    }
    
  },

  methods:
  {
    createTrolley()
    {
      if(this.id && this.id.length <= 10)
      {
        this.$alert("This action is not available on this demo");  
      }
      else
      {
        this.$alert("Invalid ID format");
      }
      
      this.$emit('close');
    }
  }
}
</script>



<style src="../styles/tabs.css" scoped>

</style>