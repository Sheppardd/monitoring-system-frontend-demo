<template>

    <div class="background bg-blue pa-3 pt-2">

      <!-- In order to show popups, this have to be present -->
      <modals-container/>

      <!-- Header -->
      <div>
        <h2 class="px-2">Trolleys</h2>
      </div>  

      <!-- Content -->
      <v-container>
        <v-layout row wrap>
          <v-flex class="px-2">
            <div class="box box-carros">
              
              <div class="box-header">
                <v-layout row wrap>
                  <v-flex>
                    <h3>Registered Trolleys</h3>
                  </v-flex>
                  <v-flex class="send-right pa-2">
                    <v-btn x-small depressed dark class="bg-buttons" @click='onAddTrolley()'>
                      <i class="fa fa-plus fa-lg"></i>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </div>

              <div class="box-body table-responsive no-padding">
                <table class="hoverTable">
                    <tbody>
                      <tr>
                        <th>ID</th>
                        <th>MAC</th>
                        <th>Creation Date</th>
                        <th>Current Zone</th>
                        <th>Last Visited</th>
                        <th>Battery</th>
                      </tr>

                      <tr v-for="trolleys in this.trolleys.trolley" :key="trolleys.mac">
                        <td>{{trolleys.id}}
                        <td>{{trolleys.mac}}</td>
                        <td>{{trolleys.createdAt}}</td>
                        <td>{{trolleys.currentZone}}</td>
                        <td>{{trolleys.lastZone}}</td>
                        <td>
                          <div class="battery center-div">
                            <div v-if="trolleys.battery > 70" class="battery-level b-green" :style="{height:trolleys.battery + '%'}"/>
                            <div v-if="trolleys.battery < 70 && trolleys.battery >= 20 " class="battery-level b-yellow" :style="{height:trolleys.battery + '%'}"/>
                            <div v-if="trolleys.battery < 20" class="battery-level b-red" :style="{height:trolleys.battery + '%'}"/>
                            <div v-if="trolleys.battery == -1">-</div>
                          </div>
                        </td>
                        <td>
                          <v-btn class="ma-2 c-busy" dark outlined x-small fab @click='onDeleteTrolley(trolleys.mac)'>
                            <i class="fa fa-trash fa-2x"></i>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                </table>
              </div>
            </div> 
          </v-flex>
        </v-layout>
      </v-container>

    </div>    
</template>


<script lang="ts">

import Vue from 'vue';

import EventBus from '../aux/EventBus'
import AddTrolley from '../components/AddTrolley.vue'

export default Vue.extend({

  name: 'Trolleys',
  props: ['trolleys'],

  
  data: function()
  {
    return {
      

    }
  },

  methods:
  {
    onAddTrolley()
    {
      this.$modal.show(AddTrolley);
    },

    async onDeleteTrolley(mac: string)
    {
      await this.$confirm("Are you sure? This action cannot be undone")
      .then(() => 
      {
        EventBus.$emit('remove-trolley', mac);
      })
      .catch(() => {console.log('Cancelling...')})
    },
  }
})
</script>

<style src="../styles/tabs.css" scoped>

</style>