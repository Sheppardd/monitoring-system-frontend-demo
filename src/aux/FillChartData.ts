import Plotly from 'plotly.js';
import {Trolleys} from '../model/Trolleys'
import {Area} from '../model/Area'

export class FillChartData
{
  public fillZonesPieChart(areas: Area[])
  {
    const chartData: Plotly.Data[] = [{values: [] as number[], labels: [] as string[]}];

    chartData[0].type = 'pie';

    for( let i=0; i<areas.length; i++)
    {
      chartData[0].values?.push(areas[i].trolleys.length);
      chartData[0].labels?.push(areas[i].id);
    }

    return chartData;
  }

  public fillZonesBarChart(areas: Area[], trolleys: Trolleys)
  {
    const chartData: Plotly.Data[] = [{x: [] as number[], y: [] as string[]}];

    chartData[0].type = 'bar';
    chartData[0].orientation = 'h';

    if(chartData[0].x && chartData[0].y)
    {
      chartData[0].x[0] = trolleys.total;
      chartData[0].y[0] = 'Libres';
    }
    
    for( let i=0; i<areas.length; i++)
    {
      if(chartData[0].x && chartData[0].y)
      {
        chartData[0].x[i+1] = areas[i].trolleys.length;
        chartData[0].y[i+1] = areas[i].id;
      }
    }

    return chartData;

  }
}