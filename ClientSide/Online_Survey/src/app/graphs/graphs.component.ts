// graphs.component.ts

import { Component } from '@angular/core';
import { Color,ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css'],
})
export class GraphsComponent {
  view: [number, number] = [700, 400];
  surveyData = [
    {
      name: 'Company 1',
      series: [
        { name: '2022-01-01', value: 5 },
        { name: '2022-01-02', value: 8 },
        { name: '2022-01-03', value: 6 },
        { name: '2022-01-04', value: 9 },
        { name: '2022-01-05', value: 7 },
        { name: '2022-01-06', value: 10 },
        { name: '2022-01-07', value: 8 },
        // Add more data points as needed
      ],
    },
    {
      name: 'Company 2',
      series: [
        { name: '2022-01-01', value: 7 },
        { name: '2022-01-02', value: 10 },
        { name: '2022-01-03', value: 8 },
        { name: '2022-01-04', value: 11 },
        { name: '2022-01-05', value: 9 },
        { name: '2022-01-06', value: 12 },
        { name: '2022-01-07', value: 10 },
        // Add more data points as needed
      ],
    },
    {
      name: 'Company 3',
      series: [
        { name: '2022-01-01', value: 3 },
        { name: '2022-01-02', value: 6 },
        { name: '2022-01-03', value: 4 },
        { name: '2022-01-04', value: 7 },
        { name: '2022-01-05', value: 5 },
        { name: '2022-01-06', value: 8 },
        { name: '2022-01-07', value: 6 },
        // Add more data points as needed
      ],
    },
    {
      name: 'Company 4',
      series: [
        { name: '2022-01-01', value: 9 },
        { name: '2022-01-02', value: 12 },
        { name: '2022-01-03', value: 10 },
        { name: '2022-01-04', value: 13 },
        { name: '2022-01-05', value: 11 },
        { name: '2022-01-06', value: 14 },
        { name: '2022-01-07', value: 12 },
        // Add more data points as needed
      ],
    },
    {
      name: 'Company 5',
      series: [
        { name: '2022-01-01', value: 4 },
        { name: '2022-01-02', value: 7 },
        { name: '2022-01-03', value: 5 },
        { name: '2022-01-04', value: 8 },
        { name: '2022-01-05', value: 6 },
        { name: '2022-01-06', value: 9 },
        { name: '2022-01-07', value: 7 },
        // Add more data points as needed
      ],
    },
    // Add more companies with 7 dates each as needed
  ];
  
  colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal, // Use the appropriate enum value
    domain: ['#5AA454', '#E44D25', '#297AB1', '#FFD700']
  };
  gradient = false;
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  xAxisLabel = 'Date';
  yAxisLabel = 'Number of Surveys By Companys';
  showXAxisLabel = true;
  showYAxisLabel = true;

  onSelect(event: any): void {
    console.log(event);
  }
}
