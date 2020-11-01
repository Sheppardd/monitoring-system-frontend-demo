<template>
    <v-app>
        <v-navigation-drawer :clipped="false" enable-resize-watcher app dark :mobile-break-point='720'>

          <v-list-item two-line @click='onClickMenu({path:"/dashboard"})'>
            <v-list-item-avatar >
              <img src="../assets/logoTFG.svg">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Monitoring System</v-list-item-title>
              <v-list-item-subtitle>With BLE technology</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
            <v-list-item v-for="item in items" :key="item.title" link @click='onClickMenu(item)'>
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            
            <v-list-item-content>
                
                  <span>{{ item.title }}</span>
                
            </v-list-item-content>
            </v-list-item>
        </v-list>

        </v-navigation-drawer>

    <v-content>
        <router-view  v-bind:trolleys="trolleys" 
                      v-bind:areas="areas" 
                      v-bind:stations="stations" 
                      v-bind:draggableStations="this.draggableStations"
                      v-bind:alerts="alerts"/>
    </v-content>    
    
    </v-app>
</template>

<script lang="ts">

import Vue from 'vue';

import moment from 'moment';

import {Trolleys} from '../model/Trolleys'
import {Area} from '../model/Area'
import {Station} from '../model/Station'

import EventBus from '../aux/EventBus'

/* Types */
type Alert = {zone: string; header: string; content: string; formatedDate: string; date: number};

export default Vue.extend({

  name: 'Sidebar',

  data () {
    return {
    
      items:
      [ 
        //{ path: '/home', title: 'Home', icon: 'mdi-home' },  
        { path: '/dashboard', title: 'Dashboard', icon: 'mdi-chart-line' },
        { path: '/trolleys', title: 'Trolleys', icon: 'mdi-cart' },
        { path: '/areas', title: 'Areas', icon: 'mdi-border-all' },
        { path: '/stations', title: 'Stations', icon: 'mdi-wifi' },
      ],

      trolleys: {total: 0, busy: 0, idle: 0, trolley: []} as Trolleys,
      areas: [] as Area[],
      stations: [] as Station[],
      draggableStations: [] as Station[],
      alerts: [] as Alert[],
      alertThreshold: 5 /* Mins */
    }
  },

  watch:
  {
    areas:
    {
      deep: true,
      handler()
      {
        this.createAlerts();
      }
    },
  },

  methods:
  {
    // eslint-disable-next-line
    onClickMenu(item: any)
    {
      if(this.$router.currentRoute.path != item.path)
      {
        this.$router.push(item.path);
      }
    },
   
    loadStaticData()
    {
      /* Trolleys */
      for(let i=0; i<100; i++)
      {
        this.trolleys.trolley.push(
          {
            id: 'Trolley ' + i,
            mac: this.randomMac(),
            createdAt: this.randomDate(new Date(2020,0,1), new Date()),
            currentZone: '-',
            lastZone: 'Area ' + Math.floor((Math.random() * 5) + 0),
            battery: Math.floor((Math.random() * 100)),
          });
      }

      /* Areas */
      for(let i=0; i<5; i++)
      {
        this.areas.push(
          {
            id: 'Area ' + i,
            createdAt: this.randomDate(new Date(2020,0,1), new Date()),
            trolleys: [],
            stations: []
          });
      }

      this.randomTrolleysAssign();

      /* Stations */
      for(let i=0; i<5; i++)
      {
        this.stations.push(
          {
            id: 'Station ' + i,
            zoneID: '-'
          }
        )
        this.draggableStations.push(this.stations[i]);
      }
    },

    randomMac()
    {
      return "XX:XX:XX:XX:XX:XX".replace(/X/g, function() {
        return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))
      });
    },

    randomTrolleysAssign()
    {
      let randIndex;

      for(let i=0; i<this.trolleys.trolley.length; i++)
      {
        randIndex = Math.floor((Math.random() * 6) + 0);

        if(randIndex == 5)
        {
          this.trolleys.busy++;
          continue;
        }

        this.areas[randIndex].trolleys.push(this.trolleys.trolley[i]);
        this.trolleys.trolley[i].currentZone = 'Area ' + randIndex;
        this.trolleys.idle++;
      }

      this.trolleys.total = 100;
    },

    randomDate(start: Date, end: Date)
    {
      return this.formatDateMoment(moment(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))));
    },

    // eslint-disable-next-line
    formatDateMoment(date: any)
    {
      return date.format("DD/MM/YYYY HH:mm");
    },

    createAlerts()
    {
      let randIndex;

      for(let i=0; i<3; i++)
      {
        randIndex = Math.floor((Math.random() * 5) + 0);
        this.alerts.unshift(
          {
            zone: this.areas[randIndex].id,
            header: 'Alert ' + this.areas[randIndex].id,
            content: 'Zone has no trolleys',
            formatedDate: moment().format("DD/MM/YYYY HH:mm"),
            date: Date.now()
          });
      }
    },

    removeAlert(alert: Alert)
    {
      const index = this.alerts.findIndex(a => a == alert);

      if(index != -1)
      {
        this.alerts.splice(index, 1);
      }
    },

    clearAlerts()
    {
      this.alerts.splice(0);
    },

    subscribe()
    {
      const rmAlert = this.removeAlert;
      const clearAlerts = this.clearAlerts;

      EventBus.$on('remove-alert', function(alert: Alert)
      {
        rmAlert(alert);
      });
       
      EventBus.$on('clear-alerts', function()
      {
        clearAlerts();
      });
    },

    unsubscribe()
    { 
      EventBus.$off();
      this.$off();
    }
  },

  created()
  {
    this.loadStaticData();
    this.subscribe();
  },

  beforeDestroy()
  {
    this.unsubscribe();
  }
  
})
</script>