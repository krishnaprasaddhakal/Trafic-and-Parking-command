import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export type Stat = { label: string; value: string; trend?: string };
export type CameraItem = { title: string; code: string; status: string; img: string };
export type ViolationRow = { date: string; camera: string; type: string; plate: string; vehicle: string; duration: string };
export type AnalyticsData = { donut: number[]; bars: number[] };
export type KpiMetric = { icon: string; label: string; value: string; change: string };
export type OccupancyData = { total: string; labels: string[]; values: number[] };
export type MonthlyViolations = { labels: string[]; datasets: { label: string; data: number[]; color: string }[] };

@Injectable({ providedIn: 'root' })
export class DataService {
  getDashboardStats(): Observable<Stat[]> {
    return of([
      { label: 'Total Active Camera', value: '1,479', trend: '+28.4%' },
      { label: 'Current day violation', value: '187', trend: '-12.6%' },
      { label: 'Total Vehicle Registered', value: '458,809', trend: '+31.7%' },
      { label: 'Total Violation', value: '56,990', trend: '+13.2%' },
    ]);
  }

  getCameras(): Observable<CameraItem[]> {
    const items = Array.from({ length: 8 }).map((_, i) => ({
      title: 'City Bus Parking',
      code: `CAM_D${i + 1}`,
      status: i % 5 === 0 ? 'Maintenance' : i % 3 === 0 ? 'Inactive' : 'Active',
      img: 'https://images.unsplash.com/photo-1483721310020-03333e577078?q=60&fit=crop&w=640&h=360',
    }));
    return of(items);
  }

  getViolations(): Observable<ViolationRow[]> {
    return of([
      { date: 'Jan 30, 2024', camera: 'CAM_D2', type: 'Overstayed', plate: '-', vehicle: 'Light Vehicle', duration: '1min' },
      { date: 'Jan 27, 2024', camera: 'CAM_Throm_v3', type: 'Over Speeding', plate: '-', vehicle: 'Two Wheeler', duration: '—' },
      { date: 'Jan 24, 2024', camera: 'CAM_Nhway 12w', type: 'Overstayed', plate: '-', vehicle: 'Light Vehicle', duration: '1 hr' },
      { date: 'Jan 21, 2024', camera: 'CAM_1234', type: 'Double Parking', plate: '-', vehicle: 'Two Wheeler', duration: '—' },
    ]);
  }

  getAnalytics(): Observable<AnalyticsData> {
    return of({
      donut: [30, 50, 20],
      bars: [60, 90, 40, 70, 30, 80, 100, 20, 50, 65, 70, 85],
    });
  }

  getAnalyticsKpis(): Observable<KpiMetric[]> {
    return of([
      { icon: 'warning', label: 'Current day violation', value: '187', change: '-12.6%' },
      { icon: 'directions_car', label: 'Total Vehicle Registered', value: '458,809', change: '+31.7%' },
      { icon: 'insights', label: 'Total Violation', value: '56,990', change: '+13.3%' }
    ]);
  }

  getOccupancy(): Observable<OccupancyData> {
    return of({
      total: '150k',
      labels: ['Morning', 'Afternoon', 'Night'],
      values: [30, 50, 20]
    });
  }

  getMonthlyViolations(): Observable<MonthlyViolations> {
    return of({
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [
        { label: 'Overspeed', data: [8, 12, 5, 9, 4, 11, 14, 3, 7, 9, 10, 12].map(v => v * 4000), color: '#8b5cf6' },
        { label: 'Double Parking', data: [6, 10, 4, 8, 3, 7, 9, 2, 6, 8, 7, 9].map(v => v * 3000), color: '#1ea1ff' },
        { label: 'Overstayed', data: [10, 15, 6, 12, 5, 13, 18, 4, 8, 10, 12, 14].map(v => v * 5000), color: '#38bdf8' }
      ]
    });
  }
}

