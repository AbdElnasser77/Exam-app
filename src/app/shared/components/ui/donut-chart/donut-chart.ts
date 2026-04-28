import { isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, Input, ViewChild, ElementRef, OnChanges, SimpleChanges, inject, PLATFORM_ID } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  templateUrl: './donut-chart.html',
  styleUrl: './donut-chart.scss',
})
export class DonutChart implements AfterViewInit, OnChanges {

  @Input() correct: number = 0;
  @Input() incorrect: number = 0;

  @ViewChild('chartCanvas') canvas!: ElementRef<HTMLCanvasElement>;

  private platformID = inject(PLATFORM_ID);
  chart?: Chart;
  viewInitialized = false;

  ngAfterViewInit() {
    this.viewInitialized = true;
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.viewInitialized) {
      this.renderChart();
    }
  }

  renderChart() {
    if(!isPlatformBrowser(this.platformID)) return;
    if (!this.canvas) return;

    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
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