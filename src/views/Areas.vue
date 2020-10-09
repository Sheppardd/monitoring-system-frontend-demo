<template>

    <div class="background bg-blue pa-3 pt-2">

      <!-- In order to show popups, this have to be present -->
      <modals-container/>

      <!-- Header -->
      <div>
        <h2 class="px-2">Areas</h2>
      </div>  

      <v-container>
        <v-layout row wrap>
          <v-flex class="px-2">
            <div class="box box-areas">
          
              <div class="box-header">
                <v-layout row wrap>
                  <v-flex>
                    <h3 class="box-title">Registered Areas</h3>
                  </v-flex>
                  <v-flex class="send-right pa-2">
                    <v-btn x-small depressed dark class="bg-buttons" @click='onAddArea()'>
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
                        <th>Creation Date</th>
                        <th>Trolleys</th>
                        <th>Zone Stations</th>
                      </tr>

                        <tr v-for="area in this.areas" :key="area.zoneID">
                          <td>{{area.id}}</td>
                          <td>{{area.createdAt}}</td>

                          <!-- Trolleys in zone -->
                          <td v-if="area.trolleys.length >= 1">
                            <div @click="showList(area.trolleys)" class="clickable-cell">
                              <div v-if="area.trolleys.length == 1" class="box-title">
                                {{area.trolleys[0].id}}
                              </div>
                              <div v-if="area.trolleys.length >= 2" class="box-title">
                                <label>{{area.trolleys[0].id}}, ...</label>
                              </div>
                            </div>
                          </td>
                          <td  v-if="area.trolleys.length <= 0">-</td>

                          <!-- Stations in zone -->
                          <td v-if="area.stations.length >= 1">
                            <div @click="showList(area.stations)" class="clickable-cell">
                              <div v-if="area.stations.length == 1" class="box-title">
                                {{area.stations[0].id}}
                              </div>
                              <div v-if="area.stations.length >= 2" class="box-title">
                                <label>{{area.stations[0].id}}, ...</label>
                              </div>
                            </div>
                          </td>
                          <td  v-if="area.stations.length <= 0">-</td>
                          <td>
                            <v-btn class="ma-2 c-busy" dark outlined x-small fab @click='onDeleteArea(area.id)'>
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
import AddArea from '../components/AddArea.vue'
import ExpandedList from '../components/ExpandedList.vue';

export default Vue.extend({

  name: 'areas',
  props: ['areas'],

  
  data: function()
  {
    return {
      

    }
  },

  methods:
  {
    onAddArea()
    {
      this.$modal.show(AddArea);
    },

    async onDeleteArea(id: string)
    {
      await this.$confirm("Are you sure? This action cannot be undone")
      .then(() => 
      {
        EventBus.$emit('remove-area', id);
      })
      .catch(() => {console.log('Cancelling...')})
    },

    // eslint-disable-next-line
    showList(list: any)
    {
      this.$modal.show(ExpandedList, {list: list});
    }
  }, 
})
</script>


<style src="../styles/tabs.css" scoped>

</style>