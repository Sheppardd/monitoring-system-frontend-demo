<template>
  
  <div class="background">

    <div class="row">
      <div class="center-div pt-4">
        <h2 class="hd-gray">Introduce the ID of the new trolley</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-6 center-div">
        <v-text-field v-model="id" label="ID" :counter='10' required/>
      </div>
    </div>

    <div class="row">
      <div class="col-6 center-div">
        <v-text-field v-model="mac" label="MAC" :counter='17' required/>
      </div>
    </div>

    <div class='row'>
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

      id: null,
      mac: null
    }
    
  },

  methods:
  {
    createTrolley()
    {
      const regex = /^[0-9a-f]{1,2}([.:-])(?:[0-9a-f]{1,2}\1){4}[0-9a-f]{1,2}$/;

      if(regex.test(this.mac) && this.id && this.id.length < 10)
      {
        this.$alert("This action is not available on this demo"); 
      }
      else
      {
        this.$alert("Formato mac incorrecto");
      }

      this.$emit('close');
    }
  }
}
</script>



<style src="../styles/tabs.css" scoped>

</style>