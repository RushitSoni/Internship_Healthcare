// graphs.component.ts

import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

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
        { name: '2022-02-07', value: 22 },
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
        { name: '2022-02-07', value: 22 },
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
        { name: '2022-02-07', value: 22 },
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
        { name: '2022-02-07', value: 22 },
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
      ],
    },
  ];

  colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal, 
    domain: ['#5AA454', '#E44D25', '#297AB1', '#FFD700'],
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

  surveyDataByMonth: any[] = []; 

  ngOnInit(): void {
    this.groupDataByMonth(); // Call the method to populate surveyDataByMonth
  }

  private groupDataByMonth(): void {
    const groupedData: { [key: string]: { [key: string]: number } } = {}; // Type annotation for groupedData
    // Iterate over survey data to group by month and calculate totals
    this.surveyData.forEach((companyData) => {
      companyData.series.forEach((entry) => {
        const month = entry.name.substring(0, 7); // Extract year-month from date
        if (!groupedData[month]) {
          groupedData[month] = {};
        }
        if (!groupedData[month][companyData.name]) {
          groupedData[month][companyData.name] = 0;
        }
        groupedData[month][companyData.name] += entry.value;
      });
    });

    // Transform grouped data into format suitable for ngx-charts
    this.surveyDataByMonth = Object.keys(groupedData).map((month) => {
      const monthData = groupedData[month] as { [key: string]: number }; // Type annotation for monthData
      const series = Object.keys(monthData).map((companyName) => {
        return { name: companyName, value: monthData[companyName] };
      });
      return { name: month, series };
    });
  }
}
