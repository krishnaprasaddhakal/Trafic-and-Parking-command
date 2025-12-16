import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType, Chart, registerables } from 'chart.js';
import { DataService } from '../../services/data.service';
import { StatsCardComponent } from '../dashboard/components/stats-card/stats-card.component';
import { DateRangeComponent } from '../violation/components/date-range/date-range.component';
Chart.register(...registerables);

@Component({
  selector: 'app-analytics-page',
  standalone: true,
  imports: [NgFor, TopbarComponent, BaseChartDirective, StatsCardComponent, DateRangeComponent],
  templateUrl: './analytics.page.html',
  styleUrl: './analytics.page.scss',
})
export class AnalyticsPage {
  subtitle = 'High-level metrics to support policy and infrastructure planning';
  kpis: { icon: string; label: string; value: string; change: string }[] = [];

  donutData: ChartConfiguration<'doughnut'>['data'] = { labels: [], datasets: [{ data: [], backgroundColor: ['#8b5cf6', '#38bdf8', '#1ea1ff'] }] };
  donutOptions: ChartConfiguration<'doughnut'>['options'] = {
    plugins: {
      legend: { display: false }
    },
    cutout: '70%'
  };
  donutType: ChartType = 'doughnut';
  donutTotal = '150k';

  barData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  barOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true, labels: { color: '#9aa0b6' } },
      tooltip: { enabled: true }
    },
    scales: {
      x: { stacked: true, ticks: { color: '#9aa0b6' }, grid: { color: 'rgba(36,48,74,.3)' } },
      y: { stacked: true, ticks: { color: '#9aa0b6' }, grid: { color: 'rgba(36,48,74,.3)' } }
    }
  };
  barType: ChartType = 'bar';
  stacked = true;
  range = { start: '2024-01-01', end: '2024-12-31' };

  exportData() {
    const blob = new Blob([JSON.stringify({ donut: this.donutData.datasets[0].data, bars: this.barData.datasets }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics-mock.json';
    a.click();
    URL.revokeObjectURL(url);
  }
  constructor(private data: DataService) {
    this.data.getAnalyticsKpis().subscribe(r => this.kpis = r);
    this.data.getOccupancy().subscribe(o => {
      this.donutTotal = o.total;
      this.donutData = { labels: o.labels, datasets: [{ data: o.values, backgroundColor: ['#8b5cf6', '#38bdf8', '#1ea1ff'] }] };
    });
    this.data.getMonthlyViolations().subscribe(v => {
      this.barData = {
        labels: v.labels,
        datasets: v.datasets.map(d => ({ label: d.label, data: d.data, backgroundColor: d.color }))
      };
    });
  }

  onDateRangeChange(r: {start: string, end: string}) {
    this.range = r;
  }
  toggleStacking() {
    this.stacked = !this.stacked;
    this.barOptions = {
      responsive: true,
      plugins: {
        legend: { display: true, labels: { color: '#9aa0b6' } },
        tooltip: { enabled: true }
      },
      scales: {
        x: { stacked: this.stacked, ticks: { color: '#9aa0b6' }, grid: { color: 'rgba(36,48,74,.3)' } },
        y: { stacked: this.stacked, ticks: { color: '#9aa0b6' }, grid: { color: 'rgba(36,48,74,.3)' } }
      }
    } as ChartConfiguration<'bar'>['options'];
  }
}
