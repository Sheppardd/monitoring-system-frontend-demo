<template>
  <v-app id="app"> 
    <router-view/>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
  
  created()
  {
    this.$router.push('/home');
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap');


</style>
