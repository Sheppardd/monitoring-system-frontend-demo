<template>

  <div class="background bg-blue pa-3 pt-2">

      <!-- Header -->
      <div class="px-2"> 
        <h2>Dashboard</h2>
      </div>  

      <!-- Content -->
      <v-container>
        <!-- Charts section -->
        <v-layout row wrap>

          <v-flex lg6 md12 sm12 class="px-2 pb-2">
            <div class="box box-blue">
              <div class="box-header">
                <h3>Zones State</h3>
              </div>
              <div class="box-body box-limit-1">
                <div id="pieChart"/>
              </div>
            </div>
          </v-flex>

          <v-flex lg6 md12 sm12>
            <v-layout row class="my-row">
              <v-flex md4 sm4 class="pa-2">
                <div class="info-box">
                  <span class="info-box-icon c-free">
                    <v-icon large>mdi-cart-outline</v-icon>
                  </span>  
                  <div class="info-box-content">
                    <span >Idle</span>
                    <span class="info-box-number">{{this.trolleys.idle}}</span>
                  </div>    
                </div> 
              </v-flex>
              <v-flex md4 sm4 class="pa-2">
                <div class="info-box">
                  <span class="info-box-icon c-busy">
                    <v-icon large>mdi-cart-outline</v-icon>
                  </span>  
                  <div class="info-box-content">
                    <span>Busy</span>
                    <span class="info-box-number">{{this.trolleys.busy}}</span>
                  </div>    
                </div>
              </v-flex>
              <v-flex md4 sm4 class="pa-2">
                <div class="info-box">
                  <span class="info-box-icon c-total">
                    <v-icon large>mdi-cart-outline</v-icon>
                  </span>  
                  <div class="info-box-content">
                    <span>Total</span>
                    <span class="info-box-number">{{this.trolleys.total}}</span>
                  </div>    
                </div>
              </v-flex>
            </v-layout>

            <v-layout row wrap class="my-row">

                <v-flex md6 sm6 xs12 class="pa-2">
                  <div class="box box-alerts">
                    <div class="box-header">
                        <v-layout row class="my-row">
                          <v-flex>
                            <h3>Alerts</h3>
                          </v-flex>
                          <v-flex class="send-right px-2 pt-1">
                            <v-btn x-small depressed class='bg-buttons my-2 ml-3' dark  @click='clearAlerts()'>
                              <span>Clear</span>
                            </v-btn>
                          </v-flex>
                        </v-layout>                        
                    </div>
                    <div class="box-body scroll box-limit-2">
                      
                        <div v-for="alert in this.alerts" :key="alert.zone + alert.date">

                          <v-card class='alert-cards ma-4' color="#8ee8ac">
                            <v-list-item three-line>
                              <v-list-item-content>
                                <v-list-item-title>
                                  {{alert.header}}
                                  <v-icon small class="send-right" @click='removeAlert(alert)'>mdi-close</v-icon>
                                </v-list-item-title>
                                <v-list-item-subtitle>{{alert.content}} ({{alert.formatedDate}})</v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-card>

                        </div>
                    </div>
                  </div>
                </v-flex>

                <v-flex md6 sm6 xs12 class="pa-2">
                  <div class="box box-orange">
                    <div class="box-header">
                      <h3>Date Filter</h3>
                    </div> 

                    <div class="box-body">
                      
                      <div class="date-picker px-5 pt-5">
                          <v-menu  :close-on-content-click="true" transition="scale-transition" offset-y max-width="290px" min-width="150px">
                            <template v-slot:activator="{on}">
                              <v-layout row wrap class="my-row">
                                <v-flex lg2>
                                  <!--i class="fa fa-calendar fa-2x pt-2"></i>-->
                                </v-flex>
                                <v-flex lg10>
                                  <v-text-field v-model="dateIni" label='Click to set date' hint="Start date" persistent-hint readonly v-on="on" />
                                </v-flex>
                              </v-layout>
                            </template>
                            <v-date-picker v-model="dateIni" no-title/>
                          </v-menu>

                          <v-menu  :close-on-content-click="true" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                            <template v-slot:activator="{on}">
                              <v-layout row wrap class="my-row">
                                <v-flex lg2 class="my-2"> 
                                  <!--<i class="fa fa-calendar fa-2x pt-4"></i>-->
                                </v-flex>
                                <v-flex lg10 class="my-2">
                                  <v-text-field v-model="dateFin" label='Click to set date' hint="End date" persistent-hint readonly v-on="on" />
                                </v-flex>
                              </v-layout>
                            </template>
                            <v-date-picker v-model="dateFin" no-title/>
                          </v-menu>
                        </div>

                        <div class="center-text pa-5">
                          <v-btn small @click='manualRefresh()'><h4>Refresh</h4></v-btn>
                        </div>
                        
                      
                    </div>   
                  </div> 
                </v-flex>

              </v-layout>
          </v-flex>

        </v-layout>

        <!-- Time related charts -->
        <v-layout row wrap>
          <v-flex lg4 md12 sm12 class="pa-2">
            <div class="box box-light-orange">
            
              <div class="box-header">
                <h3>Time of use</h3>
              </div>

              <div class="box-body table-responsive no-padding box-limit-1 scroll">
              <table class="hoverTable">
                  <tbody>
                    <tr>
                      <th>MAC</th>
                      <th>Time</th>
                    </tr>

                    <tr v-for="trolleys in this.totalUsage" :key="trolleys.mac">
                      <td>{{trolleys.id}}</td>
                      <td>{{trolleys.time}}</td>
                    </tr>
                  </tbody>
              </table>
              </div>
            </div>

          </v-flex>
          <v-flex lg8 m12 sm12 class="pa-2">
            <div class="box box-light-orange">
              
              <div class="box-header">
                <v-layout row wrap>
                  <v-flex>
                    <h3>Rush Hours</h3>
                  </v-flex>
                  <v-flex class="send-right pa-2">
                    <v-menu>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn x-small depressed dark class="ma-2 mt-1" color="primary" v-bind="attrs" v-on="on ">
                          {{selectedArea}}
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item v-for="area in this.areas" :key="area.id" @click="updateSelectedArea(area.id)">
                          <v-list-item-title>{{ area.id }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-flex>
                </v-layout>

              </div>

              <div class="box-body">

                <v-layout row wrap>
                  <v-flex>
                    <div id="rushHoursChart" />
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

import Plotly from 'plotly.js';
import Vue from 'vue';

import moment from 'moment';
moment().format();

import {FillChartData} from '../aux/FillChartData';
import EventBus from '../aux/EventBus'

/* Types */
type ChartType = "pie" | "bar";
type Usage = {id: string; mac: string; time: string};
type Alert = {header: string; content: string; date: string};

export default Vue.extend({

  name: 'Dashboard',
  props: ['trolleys', 'areas', 'alerts'],

  data: function()
  {
    return {

      /* Date picker */
      dateIni: '',
      dateFin: '',
      totalUsage: [] as Usage[],
      rushHours: [{x: [], y: [], type: 'scatter'}],
      selectedArea: 'Select area'
    }
  },

  watch:
  {
    trolleys:
    {
     deep: true,
     handler()
     {
       this.loadZoneCharts();
     }
    },
  },

  methods:
  {
    fillChartData(type: ChartType)
    {
      let fc: FillChartData;
      
      switch(type)
      {
        case 'pie':
        {
          fc = new FillChartData();
          return fc.fillZonesPieChart(this.areas);
        }
        case 'bar':
        {
          fc = new FillChartData();
          return fc.fillZonesBarChart(this.areas, this.trolleys);
        }
      }
    },

    drawChart(chartId: string, chartData: Plotly.Data[], chartTitle: string)
    {
      const chartLayout = {title: chartTitle, xaxis: {'tickformat': ',d'}};

      Plotly.newPlot(chartId, chartData, chartLayout, {responsive: true, displaylogo:false});
    },

    loadZoneCharts()
    {
      this.drawChart('pieChart', this.fillChartData('pie'), ''); 
      //this.drawChart('barChart', this.fillChartData('bar'), 'Diagrama de Barras');
    },

    removeAlert(alert: Alert)
    {
      EventBus.$emit('remove-alert', alert);
    },

    clearAlerts()
    {
      EventBus.$emit('clear-alerts');
    },

    initDefaultDates()
    {
      const lastweek = moment();
      lastweek.subtract(7, 'days');
      this.dateIni = lastweek.format().substr(0, 10);

      this.dateFin = new Date().toISOString().substr(0, 10);
    },

    parseBack(date: string)
    {
      const fecha = moment(date);

      fecha.hours(23);
      fecha.minutes(59);
      fecha.seconds(59);
      fecha.milliseconds(59);        

      return fecha.valueOf();
    },

    drawTimeOfUseChart()
    {

      this.totalUsage = [];
      
        for(let i=0; i<20; i++)
        {
          const hours = Math.floor((Math.random() * 23) + 0);
          const mins = Math.floor((Math.random() * 59) + 0);
          const formattedDate = hours + ' h ' + mins + ' min';
          
          this.totalUsage.push(
            {
              id: this.trolleys.trolley[i].id,
              mac: this.trolleys.trolley[i].mac,
              time: formattedDate
            });
        }
    },

    drawRushHoursChart()
    {
      const chartData: Plotly.Data[] = [{x: [] as number[], y: [] as number[]}];
      chartData[0].type = 'scatter';

      for( let i = 0; i < 24; i++)
      {
        if(chartData[0].y != undefined)
          chartData[0].y[i] = Math.floor((Math.random() * 50) + 0);
        if(chartData[0].x != undefined)
          chartData[0].x[i] = i;
      }   

      const chartLayout = {title: '', yaxis: {'tickformat': ',d'}};
      Plotly.newPlot('rushHoursChart', chartData, chartLayout, {responsive: true, displaylogo:false});
    },

    updateSelectedArea(areaID: string)
    {
      if(areaID != undefined && areaID != null)
      {
        if(this.areas.length > 0)
        {
          // eslint-disable-next-line
          const index = this.areas.findIndex( (a: any) => {return a.id == areaID} );

          if(index != -1)
          {
            this.selectedArea = this.areas[index].id;
            this.refresh();

          }
        }
      }
    },

    refresh()
    { 
      this.drawTimeOfUseChart();
      this.drawRushHoursChart();
    },

    manualRefresh()
    {
      this.$alert("This action is not available on this demo");
    }

  },

  mounted()
  {
    this.loadZoneCharts();
    this.initDefaultDates();

    this.drawTimeOfUseChart();
    this.drawRushHoursChart();

    if(this.areas.length > 0)
    {
      this.updateSelectedArea(this.areas[0].id);
    }
  },
  
})
</script>


<style src="../styles/tabs.css" scoped>

</style>