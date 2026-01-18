import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import Highcharts from 'highcharts';

@Component({
  selector: 'DashboardComp',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './DashboardComp.html',
  styleUrl: './DashboardComp.scss'
})
export class DashboardComp {

  title = 'DashboardComp';

  // Reference to Highcharts object
  Highcharts: typeof Highcharts = Highcharts;

  // Options for the Highcharts chart
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Monthly Sales Data',
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    yAxis: {
      title: {
        text: 'Sales (in Units)',
      },
    },
    series: [
      {
        name: 'Sales',
        type: 'line',
        data: [150, 200, 250, 300, 350, 400],
      },
    ],
  };

  // Pie Chart options
  pieChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Browser Market Share',
    },
    series: [
      {
        name: 'Share',
        type: 'pie',
        data: [
          { name: 'Chrome', y: 65.0 },
          { name: 'Firefox', y: 20.8 },
          { name: 'IE', y: 7.1 },
          { name: 'Safari', y: 5.5 },
          { name: 'Edge', y: 1.6 },
        ],
      },
    ],
  };

  areaChartOptions: Highcharts.Options = {
    chart: {
      type: 'area',
    },
    title: {
      text: 'Yearly Revenue Growth',
    },
    xAxis: {
      categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
    },
    yAxis: {
      title: {
        text: 'Revenue (in Million USD)',
      },
    },
    series: [
      {
        name: 'Revenue',
        type: 'area',
        data: [3, 4, 3, 5, 6, 7],
      },
      {
        name: 'Profit',
        type: 'area',
        data: [1, 2, 1, 2.5, 3, 4],
      },
    ],
  };

  // Column Chart options
  columnChartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Monthly Sales for 2023',
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yAxis: {
      title: {
        text: 'Sales (in Units)',
      },
    },
    series: [
      {
        name: 'Sales',
        type: 'column',
        data: [150, 200, 250, 220, 300, 350, 330, 370, 380, 420, 450, 480],
      },
    ],
  };

}
