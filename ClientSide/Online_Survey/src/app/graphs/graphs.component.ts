// graphs.component.ts

import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { SurveyTable } from '../shared/Models/Survey';
import { WorkspaceService } from '../workspace/workspace.service';
import { User } from '../shared/Models/user';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css'],
})
export class GraphsComponent implements OnInit{
  view: [number, number] = [700, 400];

  surveyData: any[] = [];
  surveys!:SurveyTable[]
  users!:User[]
  userData: any[] = [];
  monthlyCounts: { [month: string]: number } = {};
  monthlyUserCounts: { [month: string]: number } = {};

  constructor(private workspaceService:WorkspaceService){}


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
  xAxisLabel = 'Month';
  yAxisLabel = 'Number of Surveys';
  showXAxisLabel = true;
  showYAxisLabel = true;
  yAxisLabel1 = 'Number of Users';
  xAxisLabel1 = 'Month';
  yAxisTickFormatting = this.formatYAxisTicks.bind(this);
  yScaleMin: number = 0; // Start point on the graph
yScaleMax: number = 5; // Adjust this value based on your data

// Specify the interval between ticks on the y-axis
yAxisTicks: number[] = [0, 10, 20, 30, 40, 50];

  onSelect(event: any): void {
    console.log(event);
  }

  ngOnInit(): void {

    this.workspaceService.getAllSurveys().subscribe((res)=>{
      this.surveys=res
      console.log(this.surveys[0].dateCreated)
      this.calculateMonthlyCounts()
      this.generateSurveyData()
    },
    (err)=>{
      console.log("Error Fetching Surveyes.")
    })

    this.workspaceService.getAllUsers().subscribe((res)=>{
      this.users=res
      console.log(this.users[0].dateCreated)
      this.calculateMonthlyUserCounts();
      this.generateUserData();
     
    },
    (err)=>{
      console.log("Error Fetching Users.")
    })
    // this.groupDataByMonth(); // Call the method to populate surveyDataByMonth
  }
  // surveyData = [
  //   {
  //     name: 'Company 1',
  //     series: [
  //       { name: 'Jan', value:Number(this.monthlyCounts['Mar']) },
  //       { name: 'Feb', value: 8 },
  //       { name: 'March', value: 6 },
  //       { name: 'April', value: 9 },
  //       { name: 'May', value: 7 },
  //       { name: 'June', value: 10 },
  //       { name: 'July', value: 8 },
  //       { name: 'Aug', value: 22 },
  //       { name: 'Sept', value: 7 },
  //       { name: 'Oct', value: 10 },
  //       { name: 'Nov', value: 8 },
  //       { name: 'Dec', value: 22 },
  //     ],
  //   },
  
  // ];

  
generateSurveyData(): void {
  const surveySeries = Object.keys(this.monthlyCounts).map(month => ({
    name: month,
    value: this.monthlyCounts[month]
  }));

  this.surveyData = [
    {
      name: 'Surveys',
      series: surveySeries
    }
  ];
}
generateUserData(): void {
  const userSeries = Object.keys(this.monthlyUserCounts).map((month) => ({
    name: month,
    value: this.monthlyUserCounts[month],
  }));

  this.userData = [
    {
      name: 'Users',
      series: userSeries,
    },
  ];
}


  
  calculateMonthlyCounts(): void {
    this.surveys.forEach(survey => {
      const month = new Date(survey.dateCreated).toLocaleString('default', { month: 'short' });
      this.monthlyCounts[month] = (this.monthlyCounts[month] || 0) + 1;
    });

    console.log(this.monthlyCounts)
  }
  calculateMonthlyUserCounts(): void {
    this.users.forEach((user) => {
      const month = new Date(user.dateCreated).toLocaleString('default', { month: 'short' });
      this.monthlyUserCounts[month] = (this.monthlyUserCounts[month] || 0) + 1;
    });
  }




  formatYAxisTicks(value: any): string {
    return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }


































  // surveyDataByMonth: any[] = []; 

  

  // private groupDataByMonth(): void {
  //   const groupedData: { [key: string]: { [key: string]: number } } = {}; // Type annotation for groupedData
  //   // Iterate over survey data to group by month and calculate totals
  //   this.surveyData.forEach((companyData) => {
  //     companyData.series.forEach((entry) => {
  //       const month = entry.name.substring(0, 7); // Extract year-month from date
  //       if (!groupedData[month]) {
  //         groupedData[month] = {};
  //       }
  //       if (!groupedData[month][companyData.name]) {
  //         groupedData[month][companyData.name] = 0;
  //       }
  //       groupedData[month][companyData.name] += entry.value;
  //     });
  //   });

  //   // Transform grouped data into format suitable for ngx-charts
  //   this.surveyDataByMonth = Object.keys(groupedData).map((month) => {
  //     const monthData = groupedData[month] as { [key: string]: number }; // Type annotation for monthData
  //     const series = Object.keys(monthData).map((companyName) => {
  //       return { name: companyName, value: monthData[companyName] };
  //     });
  //     return { name: month, series };
  //   });
  // }
}
