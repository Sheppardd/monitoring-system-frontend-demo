<template>

  <div class="background bg-blue pa-3 pt-2">

    <!-- In order to show popups, this have to be present -->
    <modals-container/>

    <!-- Header -->
    <div>
      <h2 class="px-2">Stations</h2>
    </div>  

    <v-container>
      <v-layout row wrap>
        <v-flex class="px-2">
          <div class="box box-green">

            <div class="box-header">
              <v-layout row wrap>
                <v-flex>
                  <h3>Stations' Association</h3>
                </v-flex>

                <div class="send-right float-left">
                  <div class="pa-2">
                    <draggable class="trash" :class="{'expand': expandOpen}" id="trash" :list="this.draggableStations" 
                                group="stations" ghost-class="ghost-trash" @change="onRemoveStation" :move="onMove">

                      <v-btn :class="{'hide': expandOpen}" depressed x-small dark class="c-busy">
                        <i class="fa fa-trash-o fa-lg"></i>
                      </v-btn>
                    </draggable>
                  </div>
                  
                  <div class="pa-2">
                    <v-btn x-small depressed dark class="bg-buttons" @click='onAddStation()'>
                      <i class="fa fa-plus fa-lg"></i>
                    </v-btn>
                  </div>

                </div>

              </v-layout>
            </div>

            <div class="box-body">
              <v-layout row wrap class="px-6 py-3">

                <!-- Idle stations box -->
                <v-flex md6 sm12 xs12 class="pa-2">
                  <h4>Idle Stations</h4>
                  <draggable class="dbox free-zone" :list="this.draggableStations" group="stations" ghost-class="ghost" @change="onChange" :move="onMove">
                    <!-- Each Raspberry -->
                    <div v-for="s in this.draggableStations" :key="s.id" class="float-left">
                      <div class="raspberry ma-2">
                        <div class="raspberry-label">
                          <span>{{s.id}}</span>
                        </div>
                      </div>
                    </div>
                  </draggable>
                </v-flex>
                

                <!-- Area boxes -->
                <v-flex md6 sm12 xs12 class="pa-2" v-for="area in this.areas" :key="area.id">
                  <h4>{{area.id}}</h4>
                  <draggable class="dbox bg-stations-zone" :list="area.stations" group="stations" ghost-class="ghost"  @change="onChange" :move="onMove">
                    <!-- Each Raspberry -->
                      <div v-for="a in area.stations" :key="a.id" class="float-left">
                        <div class="raspberry ma-2">
                          <div class="raspberry-label">
                          <span>{{a.id}}</span>
                        </div>
                        </div>
                      </div>
                  </draggable>
                </v-flex>

              </v-layout>

            </div>

          </div>
        </v-flex>
      </v-layout>
    </v-container> 
    
  </div>

</template>

<script lang="ts">

import Vue from 'vue';
import draggable from "vuedraggable";

import AddStation from '../components/AddStation.vue'
import EventBus from '../aux/EventBus'
import {Station} from '../model/Station'

export default Vue.extend({

  name: 'Stations',
  props: ['areas', 'stations', 'draggableStations'],
  
  components: {draggable},

  data: function()
  {
    return {

      expandOpen: false,
      station: '-',
      newIndex: -1,
    }
  },

  methods:
  {
    onAddStation()
    {
      this.$modal.show(AddStation);
    },

    // eslint-disable-next-line
    async onRemoveStation(evt: any)
    {
      if(evt.added)
      {
        await this.$confirm("Are you sure? This action cannot be undone")
        .then(() => 
        {
          this.$alert("This action is not available on this demo");
        })
        .catch(() => {console.log('Cancelling...')})

        this.expandOpen = false;
      }
    },

    // eslint-disable-next-line
    onChange(evt: any) 
    {
      if(evt.added)
      {
        EventBus.$emit('update-station', { station: this.station, newIndex: this.newIndex});
      }
    },
    // eslint-disable-next-line
    onMove(evt: any)
    {
      /* Element is being dragged to trash zone */
      if(evt.to.id == 'trash')
      {
        this.expandOpen = true;
      }
      /* Element is being moved to some of the area/free zones */
      else if(evt.relatedContext)
      { 
        if(this.expandOpen) this.expandOpen = false;

        this.station = evt.draggedContext.element;
        this.newIndex = this.findAreaByStationsObj(evt.relatedContext.list);
      }
    },

    findAreaByStationsObj(stationList: Station[])
    {
      // eslint-disable-next-line
      return this.areas.findIndex( (value: any) => {
        return value.stations == stationList
      });
    },
  },
  
  
})
</script>

<style src="../styles/tabs.css" scoped>

</style>