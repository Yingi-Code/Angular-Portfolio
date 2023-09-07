import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
export class ChartsComponent {
  //[ ngSwitch tag]
  viewMode = 'defaultTab';

  // productCategoriesData: ChartData = {
  //   labels: ['Category - 1', 'Category - 2', 'Category - 3', 'Category - 4'],
  //   datasets: [120, 150, 180, 90]
  // };

  productCategoriesData: ChartData = {
    labels: ['Men', 'Wonem', 'Electronics', 'Jewellary'],
    datasets: [{
      label: 'Categories',
      data: [1000, 1200, 1050, 2000],
      tension: 0.5
    }],
  };

  salesData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [ { label: 'Mobiles', data: [900, 800, 1050, 700, 400], tension: 0.5 },
                { label: 'Laptop', data: [200, 100, 400, 50, 90], tension: 0.5 },
                { label: 'AC', data: [500, 400, 350, 450, 650], tension: 0.5 },
                { label: 'Headset', data: [900, 500, 1020, 950, 800], tension: 0.5 }, 
              ],
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Sales Data',
      },
    },
  };

}
