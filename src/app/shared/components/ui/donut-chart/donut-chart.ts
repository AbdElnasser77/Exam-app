import { Component, AfterViewInit, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-donut-chart',
  imports: [],
  templateUrl: './donut-chart.html',
  styleUrl: './donut-chart.scss',

})
export class DonutChart implements AfterViewInit {

  @Input() correct?: number = 0;
  @Input() incorrect?: number = 0;

 ngAfterViewInit() {
    new Chart('chart', {
      type: 'doughnut',
      data: {
        labels: ['Wrong', 'Correct'],
        datasets: [{
          data: [this.incorrect, this.correct],
          backgroundColor: ['#ef4444', '#22c55e'],
          borderWidth: 0
        }]
      },
      options: {
        cutout: '70%',
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

}
