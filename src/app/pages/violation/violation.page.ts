import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { ViolationsService } from '../../services/violations.service';
import { Violation } from '../../mock-data/violations.mock';
import { ViolationFilterBarComponent } from './components/violation-filter-bar/violation-filter-bar.component';
import { ViolationTabsComponent, ViolationTab } from './components/violation-tabs/violation-tabs.component';
import { ViolationTableComponent } from './components/violation-table/violation-table.component';
import { ViolationRowComponent } from './components/violation-row/violation-row.component';
import { EvidenceModalComponent } from './components/evidence-modal/evidence-modal.component';

type Row = {
  date: string;
  camera: string;
  type: string;
  plate: string;
  vehicle: string;
  duration: string;
};

@Component({
  selector: 'app-violation-page',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, MatIconModule, TopbarComponent, ViolationFilterBarComponent, ViolationTabsComponent, ViolationTableComponent, EvidenceModalComponent, ViolationRowComponent],
  templateUrl: './violation.page.html',
  styleUrl: './violation.page.scss',
})
export class ViolationPage {
  headerTitle = 'Live Traffic & Parking Cameras';
  headerSubtitle = 'Real-time view of parking occupancy, illegal parking, and camera feeds.';
  sectionTitle = 'Violation';
  sectionSubtitle = 'List of detected illegal parking and related events.';
  view: 'grid' | 'list' = 'grid';
  month = 'Jan 2024';
  startDate = '';
  endDate = '';
  typeFilter = 'All';
  search = '';
  items: Violation[] = [];
  previewSrc = '';
  previewOpen = false;
  listPageSize = 10;
  listPage = 0;
  constructor(private service: ViolationsService) {
    this.service.list().subscribe((r) => (this.items = r));
  }
  get filtered() {
    const q = this.search.toLowerCase().trim();
    let arr = this.items;
    if (this.typeFilter !== 'All') {
      arr = arr.filter((i) => i.type === this.typeFilter);
    }
    if (this.startDate && this.endDate) {
      const s = new Date(this.startDate).getTime();
      const e = new Date(this.endDate).getTime();
      arr = arr.filter((i) => {
        const d = new Date(i.date).getTime();
        return !isNaN(d) && d >= s && d <= e;
      });
    }
    return !q ? arr : arr.filter((i) => i.plateNumber.toLowerCase().includes(q) || i.camera.toLowerCase().includes(q));
  }
  get total() { return this.filtered.length; }
  get paged() {
    const start = this.listPage * this.listPageSize;
    const end = start + this.listPageSize;
    return this.filtered.slice(start, end);
  }
  onPageSizeChange(v: string) {
    const n = Number(v);
    this.listPageSize = Number.isFinite(n) && n > 0 ? n : 10;
    this.listPage = 0;
  }
  prevPage() {
    this.listPage = Math.max(0, this.listPage - 1);
  }
  nextPage() {
    const maxPage = Math.max(0, Math.ceil(this.total / this.listPageSize) - 1);
    this.listPage = Math.min(maxPage, this.listPage + 1);
  }
  pageStartText() {
    return this.listPage * this.listPageSize + 1;
  }
  pageEndText() {
    const end = (this.listPage + 1) * this.listPageSize;
    return end > this.total ? this.total : end;
  }
  tabs: ViolationTab[] = [
    { key: 'All', label: 'All', count: 27 },
    { key: 'Overstayed', label: 'Overstayed', count: 4 },
    { key: 'Over Speeding', label: 'Over Speeding', count: 4 },
    { key: 'Double Parking', label: 'Double Parking', count: 7 },
  ];
  get filterCount() {
    let c = 0;
    if (this.typeFilter !== 'All') c++;
    if (this.search.trim()) c++;
    if (this.startDate && this.endDate) c++;
    return c;
  }
  onViewChange(v: 'grid' | 'list') { this.view = v; }
  onSearchChange(v: string) { this.search = v; }
  onClearAll() { this.typeFilter = 'All'; this.search = ''; }
  onMonthChange(v: string) { this.month = v; }
  onTypeChange(v: string) { this.typeFilter = v; }
  onEvidenceClick(e: string) { this.previewSrc = e; this.previewOpen = true; }
  onDateRangeChange(r: {start: string, end: string}) { this.startDate = r.start; this.endDate = r.end; }
  onClosePreview() { this.previewOpen = false; this.previewSrc = ''; }
}
